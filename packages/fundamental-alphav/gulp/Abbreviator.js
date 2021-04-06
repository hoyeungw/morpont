import { Acq }                                    from '@acq/acq'
import { SAMPLES, TABLE }                         from '@analys/enum-tabular-types'
import { esvar }                                  from '@flua/utils'
import { Vinylize }                               from '@flua/vinylize'
import { DictCollection }                         from '@glossa/abbr-fin'
import { BALANCES }                               from '@glossa/enum-fin'
import { Rename }                                 from '@ject/rename'
import { BASE }                                   from '@morpont/exchange-alphav/src/assets/base'
import { COLF }                                   from '@spare/enum-chars'
import { DecoEntries, says }                      from '@spare/logger'
import { camelToSnake, capitalize, snakeToCamel } from '@spare/phrasing'
import { Translator }                             from '@spare/translator'
import { Verse }                                  from '@spare/verse'
import { merges }                                 from '@vect/vector-merge'
import gulp                                       from 'gulp'
import APIKEY                                     from '../../../local/apikey.json'
import { _reportToAlphavantageFunction }          from '../src/FundamentalAlphav'
import { LocalDictCollection }                    from './LocalDictCollection'

const DEST = 'packages/fundamental-alphav/resources'


export class FundDev {
  static apikey
  static login(key) { return (FundDev.apikey = key), FundDev }
  static async reports({
                         symbol = 'TSLA',
                         report = BALANCES
                       } = {}) {
    return await Acq
      .tabular({
        title: 'annualReports',
        url: BASE,
        params: {
          'symbol': symbol,
          'function': _reportToAlphavantageFunction(report),
          'apikey': FundDev.apikey
        },
        prep: ({ annualReports }) => annualReports,
        from: SAMPLES,
        to: TABLE
      })
  }
}

FundDev.login(APIKEY)

export const Abbreviator = (report) => {
  return (
    async () => {
      // fetch table from alphavantage
      const table = await FundDev.reports({ report })

      // define translator
      const translator = Translator.build(merges(LocalDictCollection['grammatic'], LocalDictCollection[report], DictCollection[report]))

      // generate entries ready to save in resources
      const entries = table.head.map(x => [ x, translator.parse(camelToSnake(x, ' '), snakeToCamel) ])
      entries.unshift([ 'symbol', 'symbol' ])

      // log result
      entries |> DecoEntries({ delim: COLF }) |> says[report].br(entries.length)

      // save
      await Vinylize(report + '.db.js')
        .p(esvar(report+'Db'))
        .p(Verse.entries(entries,))//{ delim: COLF }
        .pipe(gulp.dest(DEST))
    }
  ) |> Rename("fundamentalAbbreviator" + capitalize(report))
}