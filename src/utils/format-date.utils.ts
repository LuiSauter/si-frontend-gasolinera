export function FormatDateMMMD(dateString: string): string { // date to '15 feb'
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-us', { month: 'short' })} ${date.getDate()}`
}

export function calculateElapsedTime(createdAt: string): string { // date to 'hace 2 horas'
  const currentDate: Date = new Date()
  const creationDate: Date = new Date(createdAt)

  const timeDifference: number = currentDate.getTime() - creationDate.getTime()

  const millisecondsInSecond: number = 1000
  const millisecondsInMinute: number = millisecondsInSecond * 60
  const millisecondsInHour: number = millisecondsInMinute * 60
  const millisecondsInDay: number = millisecondsInHour * 24
  const millisecondsInMonth: number = millisecondsInDay * 30 // 30 days in a month
  const millisecondsInYear: number = millisecondsInDay * 365 // 365 days in a year

  const elapsedMinutes: number = Math.floor(timeDifference / millisecondsInMinute)
  const elapsedHours: number = Math.floor(timeDifference / millisecondsInHour)
  const elapsedDays: number = Math.floor(timeDifference / millisecondsInDay)
  const elapsedMonths: number = Math.floor(timeDifference / millisecondsInMonth)
  const elapsedYears: number = Math.floor(timeDifference / millisecondsInYear)

  if (elapsedYears > 0) {
    return `${elapsedYears} ${elapsedYears === 1 ? 'año' : 'años'}`
  } else if (elapsedMonths > 0) {
    return `${elapsedMonths} ${elapsedMonths === 1 ? 'mes' : 'meses'}`
  } else if (elapsedDays > 0) {
    return `${elapsedDays} ${elapsedDays === 1 ? 'dia' : 'dias'}`
  } else if (elapsedHours > 0) {
    return `${elapsedHours} ${elapsedHours === 1 ? 'hora' : 'horas'}`
  } else {
    return `${elapsedMinutes} ${elapsedMinutes === 1 ? 'minuto' : 'minutos'}`
  }
}
