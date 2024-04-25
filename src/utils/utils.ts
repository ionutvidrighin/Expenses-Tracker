import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import type { IExpenseItem } from '@/stores/types/expenses-store'
import type { GroupedExpenseItem } from '@/utils/globalTypes'

dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(isoWeek)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export async function extractIconsSrc(icons: any) {
  if (Array.isArray(icons)) {
    const iconsSrc: any = await Promise.all(icons)
    return iconsSrc
  } else {
    return await Promise.resolve(icons)
  }
}

export const formatDate = (date1: Date, date2: Date) => {
  const date_1 = dayjs(date1).get('date')
  const date_2 = dayjs(date2).get('date')
  let month: string | number = dayjs(date2).get('month')

  month = months[month]
  const year = dayjs(date2).get('year')

  return `${date_1} - ${date_2} ${month} ${year}`
}

export const formatDateRO = (date: string) => {
  const weekDay = weekDays[dayjs(date).day()]
  const monthDate = dayjs(date).get('date')
  const month = months[dayjs(date).get('month')]
  const year = dayjs(date).get('year')

  const isToday = dayjs(date).isToday()
  const isYesterday = dayjs(date).isYesterday()

  if (isToday) {
    return `Today, ${monthDate} ${month} ${year}`
  }

  if (isYesterday) {
    return `Yesterday, ${monthDate} ${month} ${year}`
  }

  return `${weekDay}, ${monthDate} ${month} ${year}`
}

interface GroupListReturnType {
  leftList: GroupedExpenseItem[]
  rightList: GroupedExpenseItem[]
}

export const groupListByDate = (data: IExpenseItem[]): GroupListReturnType => {
  // sort the entire list first -> more recent date being first in the list
  data = data.sort((a, b) => new Date(b.dateString).valueOf() - new Date(a.dateString).valueOf())

  const grouped: any = {}

  data.forEach((item: IExpenseItem) => {
    const date = new Date(item.dateString)
    const stringDate = date.toISOString()

    if (!grouped[stringDate]) {
      grouped[stringDate] = { id: item.id, date: formatDateRO(stringDate), items: [] }
    }
    grouped[stringDate].items.push(item)
  })

  // convert back to array
  const groupedList = Object.values(grouped)
  const half = Math.ceil(groupedList.length / 2)

  // cut the array in half
  const left = groupedList.slice(0, half)
  const right = groupedList.slice(half)

  return {
    leftList: left as GroupedExpenseItem[],
    rightList: right as GroupedExpenseItem[]
  }
}
