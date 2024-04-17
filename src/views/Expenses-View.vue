<template>
  <div class="expenses-view bg-teal-100 w-full py-3 px-1">
    <section class="total-expenses w-full">
      <p class="m-0 text-900 text-5xl font-semibold text-center">4.520,00 RON</p>
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
import { ref } from 'vue'
import Button from 'primevue/button'
import ExpensesList from '@/components/ExpensesList.vue'
import AddNewExpensesDialog from '@/components/Dialogs/AddNewExpense-Dialog.vue'

const openDialog: Ref<boolean> = ref(false)
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
  background-color: rgb(210, 210, 210) !important;
  border: none;
}
</style>
