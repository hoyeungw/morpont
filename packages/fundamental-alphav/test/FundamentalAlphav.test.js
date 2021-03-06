import { BALANCES, CASHFLOWS, INCOMES } from '@glossa/enum-fin'
import { DecoTable, says }              from '@spare/logger'
import { isNumeric }                    from '@typen/num-strict'
import APIKEY                           from '../../../local/alphav.apikey.json'
import { FundamentalAlphav }            from '../src/FundamentalAlphav'

export class FundamentalTest {
  static async test() {
    FundamentalAlphav.login(APIKEY)
    const SYMBOL = 'AMZN'
    const decoTable = DecoTable({ direct: 2, read: x => isNumeric(x) ? Number(x).toFixed(0) : x })
    await FundamentalAlphav
      .timeseries({ symbol: SYMBOL, report: BALANCES })
      .then(table => table|>decoTable|>says[BALANCES].br(SYMBOL))
    await FundamentalAlphav
      .timeseries({ symbol: SYMBOL, report: INCOMES })
      .then(table => table|>decoTable|>says[INCOMES].br(SYMBOL))
    await FundamentalAlphav
      .timeseries({ symbol: SYMBOL, report: CASHFLOWS })
      .then(table => table|>decoTable|>says[CASHFLOWS].br(SYMBOL))
  }
}

FundamentalTest.test().then()
