import { DecoTable, logger } from '@spare/logger'
import { isNumeric }         from '@typen/num-strict'
import { MONTHLY }           from '@valjoux/enum-period-types'
import { ExchangeAlphav }    from '../src/ExchangeAlphav'

export class ExchangeTest {
  static async testTimeseries() {
    await ExchangeAlphav
      .login('[apikey]')
      .timeseries({ symbol: 'AMZN', period: MONTHLY })
      .then(table =>
        table
          |> DecoTable({
          direct: 2,
          read: x => isNumeric(x) ? Number(x).toFixed(0) : x
        })
          |> logger)
  }
}

ExchangeTest.testTimeseries().then()
