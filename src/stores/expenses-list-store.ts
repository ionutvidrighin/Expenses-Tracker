import type { IExpenseListStore, IExpenseItem } from './types/expenses-store'
import { defineStore } from 'pinia'

export const useExpensesListStore = defineStore('expensesListStore', {
  state: (): IExpenseListStore => ({
    expenses: []
  }),
  getters: {
    getExpensebyId(state) {
      return state
    }
  },
  actions: {
    addNewExpense(expense: IExpenseItem) {
      this.expenses.push(expense)
    }
  }
})
