import { BALANCES }          from '@glossa/enum-fin'
import { DecoTable, logger } from '@spare/logger'
import { isNumeric }         from '@typen/num-strict'
import { FundamentalAlphav } from '../src/FundamentalAlphav'

export class FundamentalTest {
  static async test() {
    await FundamentalAlphav
      .login('DA0GB1RTQ5343QDB')
      .timeseries({ symbol: 'AMZN', report: BALANCES })
      .then(table =>
        table
          |> DecoTable({
          direct: 2,
          read: x => isNumeric(x) ? Number(x).toFixed(0) : x
        })
          |> logger)
  }
}

FundamentalTest.test().then()
