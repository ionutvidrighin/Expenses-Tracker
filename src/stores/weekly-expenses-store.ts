import type { IWeeklyExpensesStore, IWeeklyExpenses } from './types/expenses-store'
import { defineStore } from 'pinia'

export const useWeeklyExpenses = defineStore('weeklyExpensesStore', {
  state: (): IWeeklyExpensesStore => ({
    list: []
  }),
  actions: {
    addEntry(item: IWeeklyExpenses) {
      this.list.push(item)
    }
  }
})
