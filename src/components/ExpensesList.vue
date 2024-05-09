<template>
  <div class="expenses-list-wrapper flex w-full mt-5 text-900">
    <section class="w-6 p-1" v-if="listOne">
      <div class="expense-item mx-1" v-for="expense in listOne" :key="expense.id">
        <div class="expenses-date font-semibold my-2">{{ expense.date }}</div>

        <ExpenseItem
          v-for="item in expense.items"
          :key="item.id"
          :id="expense.id"
          :icon="item.category.icon"
          :label="item.category.label"
          :amount="item.amount"
        />
      </div>
    </section>

    <section class="w-6 p-1" v-if="listTwo">
      <div class="expense-item" v-for="expense in listTwo" :key="expense.id">
        <div class="expenses-date font-semibold my-2">{{ expense.date }}</div>

        <ExpenseItem
          v-for="item in expense.items"
          :key="item.id"
          :id="expense.id"
          :icon="item.category.icon"
          :label="item.category.label"
          :amount="item.amount"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GroupedExpenseItem } from '@/utils/globalTypes'
import { ref, watch, onMounted, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { groupListByDate } from '@/utils/utils'
import { useExpensesListStore } from '@/stores/expenses-list-store'
import ExpenseItem from './ExpenseEntry/ExpenseItem.vue'

const expensesListStore = useExpensesListStore()
const { expenses } = storeToRefs(expensesListStore)

const listOne: Ref<GroupedExpenseItem[] | null> = ref(null)
const listTwo: Ref<GroupedExpenseItem[] | null> = ref(null)

const sortExpensesList = () => {
  const sortedList = groupListByDate(expenses.value)
  listOne.value = sortedList.leftList
  listTwo.value = sortedList.rightList
}

onMounted(() => {
  sortExpensesList()
})

watch(
  () => expensesListStore.expenses.length,
  () => {
    sortExpensesList()
  }
)
</script>

<style scoped lang="scss">
.expenses-list-wrapper {
  height: calc(100% - 150px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.single-expense-item {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
