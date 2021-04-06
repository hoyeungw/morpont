import { Acq }                                        from '@acq/acq'
import { samplesToTable }                             from '@analys/convert'
import { TABLE }                                      from '@analys/enum-tabular-types'
import { LITE }                                       from '@glossa/enum-data-scopes'
import { BALANCES, CASHFLOWS, DATE, INCOMES, SYMBOL } from '@glossa/enum-fin'
import { BASE }                                       from '@morpont/exchange-alphav/src/assets/base'
import { shiftYear, within }                          from '@valjoux/dashed-date'
import { date }                                       from '@valjoux/timestamp'
import { iso }                                        from '@vect/vector-init'
import { FieldsCrostab }                              from '../resources'

const TODAY = date()
const MILLION = 1E+6
export class FundamentalAlphav {
  static apikey
  static login(key) { return (FundamentalAlphav.apikey = key), FundamentalAlphav }
  static async timeseries({
                            symbol = 'AAPL',
                            start = shiftYear(TODAY, -3),
                            end = TODAY,
                            report = BALANCES,
                            format = TABLE,
                            scope = LITE,
                          } = {}) {
    return await Acq.tabular({
        title: 'annualReports',
        url: BASE,
        params: {
          'symbol': symbol,
          'function': _reportToAlphavantageFunction(report),
          'apikey': FundamentalAlphav.apikey
        },
        prep: ({ quarterlyReports }, { symbol, start, end }) => {
          const table = samplesToTable(quarterlyReports, FieldsCrostab.cell(report, scope))
          table
            .find({ date: date => within(date, start, end) })
            .mutate(x => x / MILLION, { exclusive: [ SYMBOL, DATE, 'curr' ] })
            .unshiftColumn(SYMBOL, iso(table.ht, symbol))
            .setTitle(symbol)
          return table
        },
        args: { symbol, start, end, },
        from: TABLE,
        to: format
      }
    )
  }
}

export const _reportToAlphavantageFunction = report => {
  if (report === INCOMES) { return 'INCOME_STATEMENT' }
  if (report === BALANCES) { return 'BALANCE_SHEET' }
  if (report === CASHFLOWS) { return 'CASH_FLOW' }
  return 'BALANCE_SHEET'
}