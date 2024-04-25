import type { IExpenseItem } from '@/stores/types/expenses-store'

export type ToastColor =
  | 'success'
  | 'info'
  | 'warn'
  | 'error'
  | 'secondary'
  | 'contrast'
  | undefined

export interface GroupedExpenseItem extends Record<string, any> {
  id: string
  date: string
  items: IExpenseItem[]
}
