import { Acq }                                  from '@acq/acq'
import { samplesToTable }                       from '@analys/convert'
import { MUTABLE }                              from '@analys/enum-mutabilities'
import { TABLE }                                from '@analys/enum-tabular-types'
import { DictCollection }                       from '@glossa/abbr-fin'
import { BALANCES, CASHFLOWS, INCOMES, SYMBOL } from '@glossa/enum-fin'
import { BASE }                                 from '@morpont/exchange-alphav/src/assets/base'
import { decoVector, logger }                   from '@spare/logger'
import { camelToSnake, snakeToCamel }           from '@spare/phrasing'
import { Translator }                           from '@spare/translator'
import { shiftMonth, within }                   from '@valjoux/dashed-date'
import { date }                                 from '@valjoux/timestamp'
import { iso }                                  from '@vect/vector-init'
import { merges }                               from '@vect/vector-merge'

const TODAY = date()

export class FundamentalAlphav {
  static apikey
  static login(key) { return (FundamentalAlphav.apikey = key), FundamentalAlphav }
  static async timeseries({
                            symbol = 'AAPL',
                            start = shiftMonth(TODAY, -12),
                            end = TODAY,
                            report = BALANCES,
                            format = TABLE
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
          const table = quarterlyReports |> samplesToTable
          table.head.map(x => camelToSnake(x, ' ')) |> decoVector |> logger
          const translator = Translator.build(merges(AbbrAlphav['grammatic'], AbbrAlphav[report], DictCollection[report]))
          table
            .mapHead(x => translator.parse(camelToSnake(x, ' '), snakeToCamel), MUTABLE)
            .find({ date: date => within(date, start, end) })
            .unshiftColumn(SYMBOL, iso(table.ht, symbol))
            .setTitle(symbol)
          table.head |> decoVector |> logger
          return table
        },
        args: { symbol, start, end, },
        from: TABLE,
        to: format
      }
    )
  }
}

const AbbrAlphav = {
  grammatic: [
    [ /total/gi, '' ],
    [ /reported/gi, '' ],
    [ /currency/gi, 'curr' ],
    [ /fiscal date ending/gi, 'date' ],
  ],
  balances: [
    [ /accounts/gi, 'acc' ],
    [ /currr?ent/gi, 'c' ],
    [ /noncurrent/gi, 'nc' ],
    [ /retained/gi, 'ret' ],
    [ /earnings/gi, 'e' ],
    [ /short/gi, 's' ],
    [ /long/gi, 'l' ],
    [ /stock/gi, 'sto' ],
    [ /treasury/gi, 'tr' ],
    [ /common/gi, 'cm' ],
    [ /accumulated/gi, 'accum' ],
    [ /lease/gi, 'leas' ],
    [ /obligations?/gi, 'ob' ],
    [ /at carrying value/gi, '' ],
    [ /property plant equipment/, 'ppe' ],
    [ /shares outstanding/g, 'so' ]
  ],
  incomes: [
    [ /selling/gi, 's' ],
    [ /general/gi, 'g' ],
    [ /administrative/gi, 'a' ],
    [ /research/gi, 'r' ],
    [ /development/gi, 'd' ],
    [ /continuing/gi, 'c' ],
    [ /operations?/gi, 'op' ],
    [ /costof/gi, 'cost of' ],
    [ /services/gi, 's' ],
    [ /goods/gi, 'g' ]
  ],
  cashflows: [
    [ /cashflow/gi, 'cf' ],
    [ /proceeds/gi, 'proc' ],
    [ /repurchase/gi, 'rp' ],
    [ /activities/gi, 'act' ],
    [ /payout/gi, 'pyo' ],
    [ /issuance/gi, 'isu' ],
    [ /securities/gi, 'sec' ],
    [ /common/gi, 'c' ],
    [ /stock/gi, 'sto' ],
    [ /depletion/gi, 'dpl' ],
    [ /treasury/gi, 'tr' ],
  ],
}
export const _reportToAlphavantageFunction = report => {
  if (report === INCOMES) { return 'INCOME_STATEMENT' }
  if (report === BALANCES) { return 'BALANCE_SHEET' }
  if (report === CASHFLOWS) { return 'CASH_FLOW' }
  return 'TIME_SERIES_MONTHLY'
}