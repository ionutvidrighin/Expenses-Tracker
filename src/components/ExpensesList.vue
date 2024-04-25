<template>
  <div class="expenses-list-wrapper flex w-full mt-5 text-900">
    <section class="w-6 p-1" v-if="listOne">
      <div class="expense-item mx-1" v-for="expense in listOne" :key="expense.id">
        <div class="expenses-date font-semibold my-2">{{ expense.date }}</div>

        <div
          class="single-expense-item my-2 w-full p-2 shadow-1 border-round-sm"
          v-for="item in expense.items"
          :key="item.id"
        >
          <div class="w-full flex justify-content-between align-items-center">
            <div>
              <ExpenseCategoryIcon :selectedIcon="item.category.icon" />
              <p class="m-0">{{ item.category.label }}</p>
            </div>

            <div>
              <p class="m-0 font-semibold">{{ item.amount }}</p>
              <p class="m-0">RON</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-6 p-1" v-if="listTwo">
      <div class="expense-item" v-for="expense in listTwo" :key="expense.id">
        <div class="expenses-date font-semibold my-2">{{ expense.date }}</div>

        <div
          class="single-expense-item my-2 w-full p-2 border-round-sm"
          v-for="item in expense.items"
          :key="item.id"
        >
          <div class="w-full flex justify-content-between align-items-center">
            <div>
              <ExpenseCategoryIcon :selectedIcon="item.category.icon" />
              <p class="m-0">{{ item.category.label }}</p>
            </div>

            <div>
              <p class="m-0 font-semibold">{{ item.amount }}</p>
              <p class="m-0">RON</p>
            </div>
          </div>
        </div>
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
import ExpenseCategoryIcon from './ExpensesEntryIcons/ExpenseCategoryIcon.vue'

const expensesListStore = useExpensesListStore()
const { expenses } = storeToRefs(expensesListStore)

const listOne: Ref<GroupedExpenseItem[] | null> = ref(null)
const listTwo: Ref<GroupedExpenseItem[] | null> = ref(null)

onMounted(() => {
  const sortedList = groupListByDate(expenses.value)
  listOne.value = sortedList.leftList
  listTwo.value = sortedList.rightList
})

watch(
  () => expensesListStore.expenses.length,
  () => {
    const sortedList = groupListByDate(expenses.value)
    listOne.value = sortedList.leftList
    listTwo.value = sortedList.rightList
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
