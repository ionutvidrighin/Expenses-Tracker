<template>
  <Dialog
    modal
    closable
    v-model:visible="displayDialog"
    @hide="closeDialog"
    header="Add new expense"
    :style="{ width: '30rem' }"
    :pt="{
      root: { class: 'border-none bg-white p-0 h-30rem' },
      header: { class: 'pl-4 pr-2 py-2 surface-200 text-900' },
      content: { class: 'p-0' },
      mask: {
        style: 'backdrop-filter: blur(1px)'
      }
    }"
  >
    <div class="bg-white px-3 w-full dialog-content">
      <div class="expense-name">
        <p class="pt-2 pb-1 my-0 font-medium">Expense name:</p>
        <InputText type="text" v-model="expenseName" class="w-full" />
      </div>

      <div class="expense-category w-full">
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
    </div>
  </Dialog>
  <Toast />
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { options } from '@/components/Dialogs/expenses-categories'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import ExpenseCategoryIcon from '@/components/ExpenseCategoryIcon.vue'

const emit = defineEmits(['close-dialog', 'displayToast'])

const displayDialog: Ref<boolean> = ref(true)
const expenseName: Ref<string> = ref('')
const expenseCategory: Ref<string> = ref('')

function closeDialog() {
  emit('close-dialog')
}
</script>

<style scoped></style>
