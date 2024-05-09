<template>
  <div class="single-expense-item my-2 w-full p-2 shadow-1 border-round-sm">
    <div class="w-full flex justify-content-between align-items-center">
      <div>
        <ExpenseCategoryIcon :selectedIcon="icon" />
        <p class="m-0">{{ label }}</p>
      </div>

      <div class="flex flex-column justify-content-between align-items-center">
        <p class="m-0 font-semibold">{{ amount }}</p>
        <p class="m-0">RON</p>
        <i class="pi pi-trash mt-3 cursor-pointer" @click="deleteExpenseItem"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useExpensesListStore } from '@/stores/expenses-list-store'
import ExpenseCategoryIcon from './ExpenseCategoryIcon.vue'

const props = defineProps({
  id: { type: String, default: '', required: true },
  icon: { type: String, default: '', required: true },
  label: { type: String, default: '', required: true },
  amount: { type: Number, required: true }
})

const expensesListStore = useExpensesListStore()

const deleteExpenseItem = () => {
  expensesListStore.deleteExpenseById(props.id)
}
</script>

<style scoped></style>
