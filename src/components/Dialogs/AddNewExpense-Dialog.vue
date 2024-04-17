<template>
  <Dialog
    modal
    closable
    v-model:visible="displayDialog"
    @hide="closeDialog"
    header="Add new expense"
    :style="{ width: '30rem' }"
    :pt="{
      root: { class: 'border-none bg-white p-0 h-25rem' },
      header: { class: 'pl-4 pr-2 py-2 surface-200 text-900' },
      content: { class: 'p-0' },
      mask: {
        style: 'backdrop-filter: blur(1px)'
      }
    }"
  >
    <div class="bg-white px-3 w-full dialog-content">
      <div class="expense-category w-full mt-3 mb-1">
        <p class="pt-2 pb-1 my-0 font-medium">Expense category:</p>
        <Dropdown
          v-model="expenseCategory"
          :options="options"
          optionLabel="label"
          placeholder="Select category"
          class="w-full"
          :pt="{
            wrapper: { class: 'max-h-25rem' }
          }"
        >
          <template #option="slotProps">
            <div class="flex align-items-center justify-content-between w-full">
              <div>{{ slotProps.option.label }}</div>
              <ExpenseCategoryIcon :icon="slotProps.option.icon" />
            </div>
          </template>
        </Dropdown>
      </div>

      <div class="expense-amount mb-1">
        <p class="pt-2 pb-1 my-0 font-medium">Expense amount:</p>
        <InputNumber v-model="expenseAmount" inputId="minmaxfraction" class="w-full" />
      </div>

      <div class="expense-date">
        <p class="pt-2 pb-1 my-0 font-medium">Expense date:</p>
        <Calendar
          v-model="expenseDate"
          class="w-full"
          :manualInput="false"
          :minDate="minDate"
          :maxDate="maxDate"
        />
      </div>

      <div class="w-full center mt-6 pb-2">
        <Button
          raised
          label="Add new expense"
          class="font-medium px-3 py-1 bg-teal-200 text-900 border-transparent create-btn"
          severity="info"
          @click="handleAddNewExpense"
        />
      </div>
    </div>
  </Dialog>
  <Toast />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { ToastColor } from '@/utils/globalTypes'
import { ref, onMounted } from 'vue'
import { options } from '@/components/Dialogs/expenses-categories'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import { useWeeklyExpenses } from '@/stores/weekly-expenses-store'
import { useExpensesListStore } from '@/stores/expenses-list-store'
import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import ExpenseCategoryIcon from '@/components/ExpenseCategoryIcon.vue'

const emit = defineEmits(['close-dialog', 'displayToast'])

const weeklyExpensesStore = useWeeklyExpenses()
const expensesListStore = useExpensesListStore()
const toast = useToast()
const route = useRoute()

const displayDialog: Ref<boolean> = ref(true)
const expenseAmount: Ref<number | null> = ref(null)
const expenseDate: Ref<string> = ref('')
const expenseCategory = ref(null)
const minDate = ref()
const maxDate = ref()

onMounted(() => {
  const expenseId = route.params.id
  const expenseItemData = weeklyExpensesStore.getExpensebyId(expenseId as string)

  minDate.value = new Date(expenseItemData?.startDate ?? '')
  maxDate.value = new Date(expenseItemData?.endDate ?? '')
})

const displayToast = (toastColor: ToastColor, message: string) => {
  toast.add({ severity: toastColor, detail: message, life: 3000 })
}

const handleAddNewExpense = () => {
  if (!expenseCategory.value) {
    displayToast('error', 'Please select the category')
    return
  }

  if (!expenseAmount.value || expenseAmount.value === 0) {
    displayToast('error', 'Please provide the amount')
    return
  }

  if (!expenseDate.value || expenseDate.value === '') {
    displayToast('error', 'Please select the date')
    return
  }

  const payload = {
    id: uuid(),
    weeklyExpenseId: route.params.id.toString(),
    amount: expenseAmount.value.toLocaleString('ro-RO'),
    category: expenseCategory.value,
    date: expenseDate.value
  }

  console.log('payload', payload)

  //expensesListStore.addNewExpense(payload)
}

function closeDialog() {
  emit('close-dialog')
}
</script>

<style scoped></style>
