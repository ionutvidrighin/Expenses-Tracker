export interface IWeeklyExpenses {
  id: string
  title: string
  icon: string
  expensesCount: number
  expensesAmount: string
  date: string
}

export interface IWeeklyExpensesStore {
  list: IWeeklyExpenses[]
}
