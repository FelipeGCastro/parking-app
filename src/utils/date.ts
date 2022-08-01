import { format, formatDistanceToNowStrict, fromUnixTime } from 'date-fns'
import localeBr from 'date-fns/locale/pt-BR'

export const formatDistanceLocal = (date: string) => {
  const formatDistanceLocale = {
    lessThanXSeconds: '<1m',
    xSeconds: '<1m',
    halfAMinute: '<1m',
    // lessThanXSeconds: '{{count}}s',
    // xSeconds: '{{count}}s',
    // halfAMinute: '30s',
    lessThanXMinutes: '{{count}}m',
    xMinutes: '{{count}}m',
    aboutXHours: '{{count}}h',
    xHours: '{{count}}h',
    xDays: '{{count}}d',
    aboutXWeeks: '{{count}}w',
    xWeeks: '{{count}}w',
    aboutXMonths: '{{count}}m',
    xMonths: '{{count}}m',
    aboutXYears: '{{count}}y',
    xYears: '{{count}}y',
    overXYears: '{{count}}y',
    almostXYears: '{{count}}y',
  }

  function formatDistance(token, count, options) {
    options = options || {}

    const result = formatDistanceLocale[token].replace('{{count}}', count)

    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'in ' + result
      } else {
        return result + ' ago'
      }
    }

    return result
  }
  return formatDistanceToNowStrict(new Date(date), {
    locale: {
      ...localeBr,
      formatDistance,
    },
  })
}

export const formatTimestamp = (timestamp: number) => {
  return format(fromUnixTime(timestamp), 'dd LLL yyyy')
}
