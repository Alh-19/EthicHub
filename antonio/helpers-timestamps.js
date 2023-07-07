export const getTimestampNow = () => {
  return Math.floor(Date.now() / 1000)
}

export const getTimestampToday = () => {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 1000
}

export const getTimestampFirstDayCurrentMonth = () => {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) / 1000
}

export const getTimestampFromDate = (date) => {
  return Math.floor(date / 1000) // date.valueOf() returns timestamp in ms
}

export const getDateFromTimestamp = (timestamp) => {
  return new Date(timestamp * 1000)
}

export const getDateFromTimestampForDisplay = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return `${mapperMonthShort[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`
}

export const getDateFromTimestampForDisplay2 = (timestamp) => {
  const date = new Date(timestamp * 1000)
  return `${date.getUTCDate()} ${mapperMonth[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

// yyyy-mm-dd
export const getDateFormatted = (date) => {
  return date.toISOString().split('T')[0]
}

// specific functions for element date picker component
export const getTimestampFromDatePicker = (date) => {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000
}

export const initMonthRange = () => {
  const startCurrentMonth = getDateFromTimestamp(getTimestampFirstDayCurrentMonth())
  const startPreviousMonth = substractMonths(startCurrentMonth, 1)
  return [getDateFormatted(startPreviousMonth), getDateFormatted(startCurrentMonth)]
}

export const initDateRange = () => {
  const today = getDateFromTimestamp(getTimestampToday())
  const yesterday = substractDays(today, 1)
  const dayBeforeYesterday = substractDays(today, 2)
  return [getDateFormatted(dayBeforeYesterday), getDateFormatted(yesterday)]
}

export function substractDays(date, days) {
  const dateCopy = new Date(date)
  dateCopy.setDate(dateCopy.getDate() - days)
  return dateCopy
}

export function substractMonths(date, months) {
  const dateCopy = new Date(date)
  dateCopy.setMonth(dateCopy.getMonth() - months)
  return dateCopy
}

// day ethix mint in eth: 1608595200 (Tue Dec 22 2020 00:00:00 GMT+0000)
export const getDayTimestampsSinceEthixMintEth = () => {
  const timestampStart = 1608595200 + 86400 - 1 // end of ethix mint day (Tue Dec 22 2020 23:59:59 GMT+0000)
  const timestampEnd = getTimestampToday() + 86400 - 1 // end of current day
  const numberOfPeriods = (timestampEnd - timestampStart) / 86400 - 1 // total days between ethix mint day (end) and current day (end) (-1 correction factor so we do not fetch the end of the current day where block wont be mined yet)
  const deltaPerPeriod = 86400 // increment by 1 day factor (in sec)
  const timestamps = []
  for (let i = 0; i <= numberOfPeriods; i++) {
    timestamps.push(timestampStart + i * deltaPerPeriod)
  }
  return timestamps
}

// day ethix mint in celo: 1655683200 (Mon Jun 20 2022 00:00:00 GMT+0000)
export const getDayTimestampsSinceEthixMintCelo = () => {
  const timestampStart = 1655683200 + 86400 - 1
  const timestampEnd = getTimestampToday() + 86400 - 1
  const numberOfPeriods = (timestampEnd - timestampStart) / 86400 - 1
  const deltaPerPeriod = 86400
  const timestamps = []
  for (let i = 0; i <= numberOfPeriods; i++) {
    timestamps.push(timestampStart + i * deltaPerPeriod)
  }
  return timestamps
}

// day first stake contract in eth: 1608595200 (Tue Dec 22 2020 00:00:00 GMT+0000) (same as ethix mint)
export const getDayTimestampsSinceFirstStakeContractEth = () => {
  const timestamps = getDayTimestampsSinceEthixMintEth()
  return timestamps
}

// day first stake contract in celo: 1657584000 (Tue Jul 12 2022 00:00:00 GMT+0000)
export const getDayTimestampsSinceFirstStakeContractCelo = () => {
  const timestampStart = 1657584000 + 86400 - 1
  const timestampEnd = getTimestampToday() + 86400 - 1
  const numberOfPeriods = (timestampEnd - timestampStart) / 86400 - 1
  const deltaPerPeriod = 86400
  const timestamps = []
  for (let i = 0; i <= numberOfPeriods; i++) {
    timestamps.push(timestampStart + i * deltaPerPeriod)
  }
  return timestamps
}

// not currently in use!
export const getTimestampsForSpecificPeriod = () => {
  const timestampStart = 1608595200 // Tue Dec 22 2020 00:00:00 GMT+0000
  const deltaPerPeriod = 86400 // every 24 hours (1 day in secs)
  const numberOfPeriods = 30 // for 30 days
  const timestamps = []
  for (let i = 0; i <= numberOfPeriods; i++) {
    timestamps.push(timestampStart + i * deltaPerPeriod)
  }
  return timestamps
}

export const mapperMonth = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const mapperMonthShort = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}
