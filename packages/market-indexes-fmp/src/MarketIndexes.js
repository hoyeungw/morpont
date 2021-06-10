import { Acq }                                                from '@acq/acq'
import { SAMPLES, TABLE }                                     from '@analys/enum-tabular-types'
import { samplesFilter }                                      from '@analys/samples-filter'
import { dashToYmd, dateToYmd }                               from '@valjoux/convert'
import { shiftDay, within }                                   from '@valjoux/date-shift'
import { BASE_FMP, FIELDS_FULL, FIELDS_LITE, MARKET_INDEXES } from '../assets'


const TODAY = new Date() |> dateToYmd
const BEFORE = shiftDay(TODAY.slice(), -14)

export class MarketIndexes {
  static apikey
  static login(key) {
    MarketIndexes.apikey = key
    return MarketIndexes
  }
  static async prices({
                        indicator = 'shanghai',
                        start = BEFORE,
                        end = TODAY,
                        format = TABLE,
                        easy = true
                      } = {}) {
    return await Acq.tabular({
      title: indicator,
      url: `${ BASE_FMP }/historical-price-full/${ MARKET_INDEXES[indicator] }`,
      params: { apikey: MarketIndexes.apikey },
      prep: ({ historical }) => samplesFilter.call(
        historical, { field: 'date', filter: d => within(d |> dashToYmd, start, end) }
      ),
      fields: easy ? FIELDS_LITE : FIELDS_FULL,
      from: SAMPLES,
      to: format,
      spin: false
    })
  }

}

