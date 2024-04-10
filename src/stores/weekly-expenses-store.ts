import type { IWeeklyExpensesStore, IWeeklyExpenses } from './types/expenses-store'
import { defineStore } from 'pinia'

export const useWeeklyExpenses = defineStore('weeklyExpensesStore', {
  state: (): IWeeklyExpensesStore => ({
    list: []
  }),
  getters: {
    getExpensebyId(state) {
      return (expenseId: string) => state.list.find((expense) => expense.id === expenseId)
    }
  },
  actions: {
    addEntry(item: IWeeklyExpenses) {
      this.list.push(item)
    }
  }
})
