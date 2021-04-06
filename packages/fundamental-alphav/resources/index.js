import { CrosTab }                                  from '@analys/crostab'
import { DB, LITE }                                 from '@glossa/enum-data-scopes'
import { BALANCES, CASHFLOWS, INCOMES, VALUATIONS } from '@glossa/enum-fin'
import { balancesDb }                               from './balances.db'
import { balancesLite }                             from './balances.lite'
import { cashflowsDb }                              from './cashflows.db'
import { cashflowsLite }                            from './cashflows.lite'
import { incomesDb }                                from './incomes.db'
import { incomesLite }                              from './incomes.lite'

export const FieldsCrostab = CrosTab.from({
  side: [ BALANCES, INCOMES, CASHFLOWS, VALUATIONS ],
  head: [ DB, LITE ],
  rows: [
    [ balancesDb, balancesLite ],
    [ incomesDb, incomesLite ],
    [ cashflowsDb, cashflowsLite ],
  ]
})
