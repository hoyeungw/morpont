import { decoTable, logger } from '@spare/logger'
import { MarketIndexes }     from '../src/MarketIndexes'
import { dateToYmd }         from '@valjoux/convert'
import { shiftDay }          from '@valjoux/date-shift'
import APIKEY                from '../../../local/fmp.apikey.json'

const TODAY = new Date() |> dateToYmd
const BEFORE = shiftDay(TODAY.slice(), -60)

MarketIndexes.login(APIKEY)

MarketIndexes.prices({
  indicator: 'nasdaq',
  start: BEFORE,
  end: TODAY,
  easy: true
}).then(table => {
  table |> decoTable |> logger
})
