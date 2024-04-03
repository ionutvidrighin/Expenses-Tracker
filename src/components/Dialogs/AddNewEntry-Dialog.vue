<template>
  <Dialog
    modal
    closable
    v-model:visible="displayDialog"
    @hide="closeDialog"
    header="New expenses entry"
    :style="{ width: '22rem', height: dialogHeight }"
    :pt="{
      root: { class: 'border-none bg-teal-100	p-0' },
      header: { class: 'pl-4 pr-2 py-2 bg-teal-200' },
      content: { class: 'p-0' },
      mask: {
        style: 'backdrop-filter: blur(1px)'
      }
    }"
  >
    <div class="bg-teal-100 px-3 w-full dialog-content">
      <div class="mb-4 w-full">
        <p class="pt-2 pb-1 my-0 font-medium">Entry title:</p>
        <InputText type="text" v-model="expensesEntryTitle" class="w-full" />
      </div>
      <div class="w-full h-5rem mb-2">
        <p class="mb-0 pb-1 font-medium">Select weekly range dates:</p>
        <Calendar
          v-model="expensesDates"
          selectionMode="range"
          :manualInput="false"
          class="w-full h-2rem"
          hideOnRangeSelection
        />
      </div>

      <!-- icons section -->
      <p class="pb-1 mb-0 font-medium">Select icon:</p>
      <div class="w-full flex align-items-center">
        <SelectedIcon :selectedIcon="selectedIconName" />
        <div class="select-icon-arrow ml-2 h-3rem w-2rem center border-round-xs">
          <i
            v-if="!iconsContainerOpen"
            class="pi pi-angle-down"
            @click="toggleSelectIcon(true)"
          ></i>
          <i v-else class="pi pi-angle-up" @click="toggleSelectIcon(false)"></i>
        </div>
      </div>

      <div v-if="iconsContainerOpen" class="icons-container w-full h-6rem mt-3 border-round-sm">
        <ExpensesIconsContainer @iconSelect="handleSelectedIcon" />
      </div>

      <div class="w-full center mt-4 pb-2">
        <Button
          raised
          label="Create"
          class="font-medium px-3 py-1 bg-teal-200 text-color border-transparent create-btn"
          severity="info"
          @click="handleCreateNewEntry"
        />
      </div>
    </div>
  </Dialog>
  <Toast />
</template>

<script setup lang="ts">
import type { IWeeklyExpenses } from '@/stores/types/expenses-store'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useWeeklyExpenses } from '@/stores/weekly-expenses-store'
import { formatDate } from '@/utils/utils'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import SelectedIcon from '@/components/ExpensesEntryIcons/Selected-Icon.vue'
import ExpensesIconsContainer from '@/components/ExpensesEntryIcons/Expenses-Icons-Container.vue'

type ToastColor = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined

const emit = defineEmits(['close-dialog', 'displayToast'])

const weeklyExpensesStore = useWeeklyExpenses()
const toast = useToast()

const displayDialog: Ref<boolean> = ref(true)

const dialogHeight: Ref<string> = ref('400px')
const expensesEntryTitle: Ref<string | null> = ref(null)
const expensesDates = ref()
const iconsContainerOpen: Ref<boolean> = ref(false)
const selectedIconName: Ref<string | undefined> = ref('')

const toggleSelectIcon = (state: boolean) => {
  if (state) {
    iconsContainerOpen.value = true
    dialogHeight.value = '500px'
  } else {
    iconsContainerOpen.value = false
    dialogHeight.value = '400px'
  }
}

const handleSelectedIcon = (icon: string) => {
  selectedIconName.value = icon
}

const displayToast = (toastColor: ToastColor, message: string) => {
  toast.add({ severity: toastColor, detail: message, life: 3000 })
}

const handleCreateNewEntry = async () => {
  if (!expensesEntryTitle.value || expensesEntryTitle.value === '') {
    displayToast('error', 'Please provide a title')
    return
  }

  if (expensesEntryTitle.value.length > 30) {
    displayToast('error', 'Title cannot be longer than 30 chars')
    return
  }

  if (expensesDates.value && expensesDates.value.length === 2) {
    const startDate = dayjs(expensesDates.value[0])
    const endDate = dayjs(expensesDates.value[1])

    const isMonday = dayjs(startDate).get('day') === 1
    const isSunday = dayjs(endDate).get('day') === 0

    if (!isMonday && !isSunday) {
      displayToast('error', 'Please select date range from Monday to Sunday')
      return
    }
  }

  if (selectedIconName.value === '') {
    displayToast('error', 'Please select an icon')
    return
  }

  const entryDate = formatDate(expensesDates.value[0], expensesDates.value[1])

  const payload: IWeeklyExpenses = {
    id: uuid(),
    title: expensesEntryTitle.value,
    icon: selectedIconName.value!,
    expensesCount: 0,
    expensesAmount: '',
    date: entryDate
  }

  const entryExists = weeklyExpensesStore.list.some((element) => element.date === entryDate)
  if (entryExists) {
    displayToast('error', 'You already have an entry for this period')
    return
  }

  weeklyExpensesStore.addEntry(payload)
  closeDialog()
}

function closeDialog() {
  emit('close-dialog')
}
</script>

<style scoped lang="scss">
:deep(.p-inputtext) {
  border: none;
  box-shadow: none;
  padding: 0.5rem 1rem;
}

.select-icon-arrow {
  cursor: pointer;
  background-color: white;
  height: 100%;
}

.icons-container {
  background-color: rgba(0, 0, 0, 0.1);
  user-select: none;
}

.create-btn:active {
  transform: translateY(2px);
}

.dialog-content {
  overflow-y: hidden;
}
</style>
