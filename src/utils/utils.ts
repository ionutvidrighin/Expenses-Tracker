import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

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

export async function extractIconsSrc(icons: any) {
  if (Array.isArray(icons)) {
    const iconsSrc: any = await Promise.all(icons)
    return iconsSrc
  } else {
    return await Promise.resolve(icons)
  }
}

export const formatDate = (date1: Date, date2: Date) => {
  console.log(dayjs(date1).get('date'))
  const date_1 = dayjs(date1).get('date')
  const date_2 = dayjs(date2).get('date')
  let month: string | number = dayjs(date2).get('month')

  month = months[month]
  const year = dayjs(date2).get('year')

  return `${date_1} - ${date_2} ${month} ${year}`
}
