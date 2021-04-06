import { Acq }                              from '@acq/acq'
import { TABLE }                            from '@analys/enum-tabular-types'
import { shiftMonth }                       from '@valjoux/dashed-date'
import { DAILY, INTRADAY, MONTHLY, WEEKLY } from '@valjoux/enum-period-types'
import { date }                             from '@valjoux/timestamp'
import { BASE }                             from './assets/base'
import { csvToTable }                       from './csvToTable'

const TODAY = date()

export class ExchangeAlphav {
  static apikey
  static login(key) {
    ExchangeAlphav.apikey = key
    return ExchangeAlphav
  }
  static async timeseries({
                            symbol = 'AAPL',
                            start = shiftMonth(TODAY, -12),
                            end = TODAY,
                            period = MONTHLY,
                            format = TABLE
                          } = {}) {
    return await Acq.tabular({
        title: 'timeseries',
        url: BASE,
        params: {
          'symbol': symbol,
          'function': _periodToAlphavantageFunction(period),
          'apikey': ExchangeAlphav.apikey,
          'datatype': 'csv'
        },
        prep: csvToTable,
        args: { title: 'timeseries', symbol, start, end, },
        from: TABLE,
        to: format
      }
    )
  }
}

const _periodToAlphavantageFunction = period => {
  if (period === INTRADAY) { return 'TIME_SERIES_INTRADAY' }
  if (period === DAILY) { return 'TIME_SERIES_DAILY' }
  if (period === WEEKLY) { return 'TIME_SERIES_WEEKLY' }
  if (period === MONTHLY) { return 'TIME_SERIES_MONTHLY' }
  return 'TIME_SERIES_MONTHLY'
}