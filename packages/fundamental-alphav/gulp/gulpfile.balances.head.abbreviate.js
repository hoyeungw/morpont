import { Acq }                           from '@acq/acq'
import { SAMPLES, TABLE }                from '@analys/enum-tabular-types'
import { esvar }                         from '@flua/utils'
import { Vinylize }                      from '@flua/vinylize'
import { BALANCES }                      from '@glossa/enum-fin'
import { BASE }                          from '@morpont/exchange-alphav/src/assets/base'
import { says }                          from '@spare/logger'
import { Verse }                         from '@spare/verse'
import gulp                              from 'gulp'
import { _reportToAlphavantageFunction } from '../src/FundamentalAlphav'

const DEST = 'packages/fundamental-alphav/resources'
const FILENAME = BALANCES

export class FundDev {
  static apikey
  static login(key) { return (FundDev.apikey = key), FundDev }
  static async reports({
                         symbol = 'AAPL',
                         report = BALANCES,
                         format = TABLE
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

export const saveCountryList = async () => {
  // const samples = Object.entries(CountryIsos)
  //   .map(
  //     ([ name, id ]) => ({ name: name.replace(/_/g, SP), value: id })
  //   )
  const table=FundDev.login().params
  samples.length |> says['countryList.length']
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.vector(samples))
    .pipe(gulp.dest(DEST))
}