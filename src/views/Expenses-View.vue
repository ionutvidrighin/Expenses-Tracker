<template>
  <div class="expenses-view bg-teal-100 w-full py-3 px-1">
    <section class="total-expenses w-full">
      <p class="m-0 text-900 text-5xl font-semibold text-center">{{ totalAmount }} RON</p>
    </section>

    <div class="under-line w-full h-1rem center">
      <div class="bg-blue-500"></div>
    </div>

    <section class="add-new-expense w-full mt-4 center">
      <Button
        raised
        label="Add new expense"
        severity="contrast"
        class="w-5 h-2rem text-900 font-semibold"
        icon="pi pi-plus"
        @click="openDialog = true"
      />
    </section>

    <ExpensesList />

    <AddNewExpensesDialog v-if="openDialog" @close-dialog="openDialog = false" />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch, onMounted } from 'vue'
import { useExpensesListStore } from '@/stores/expenses-list-store'
import Button from 'primevue/button'
import ExpensesList from '@/components/ExpensesList.vue'
import AddNewExpensesDialog from '@/components/Dialogs/AddNewExpense-Dialog.vue'

const expensesListStore = useExpensesListStore()

const openDialog: Ref<boolean> = ref(false)
const totalAmount: Ref<string> = ref('')

const calculateAllExpenses = () => {
  const amounts: number[] = []
  expensesListStore.expenses.forEach((element) => {
    amounts.push(element.amount)
  })

  const total = amounts.reduce((a, b) => a + b, 0)
  totalAmount.value = total.toString()
}

onMounted(() => {
  calculateAllExpenses()
})

watch(
  () => expensesListStore.expenses.length,
  () => {
    calculateAllExpenses()
  }
)
</script>

<style scoped lang="scss">
.expenses-view {
  border-radius: 0 10px 10px 0;
  height: 100%;

  .under-line {
    div {
      width: 100px;
      height: 4px;
      border-radius: 5px;
    }
  }
}

:deep(.p-button) {
  background-color: #cae0e0 !important;
  border: none;
}
</style>
