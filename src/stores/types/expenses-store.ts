export interface IWeeklyExpenses {
  id: string
  title: string
  icon: string
  expensesCount: number
  expensesAmount: string
  stringDate: string
  startDate: Date
  endDate: Date
}

export interface IWeeklyExpensesStore {
  list: IWeeklyExpenses[]
}

export interface IExpenseItem {
  id: string
  weeklyExpenseId: string
  name: string
  amount: string
  category: {
    icon: string
    value: string
    label: string
  }
  date: string
}

export interface IExpenseListStore {
  expenses: IExpenseItem[]
}
