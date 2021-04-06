import { BALANCES, CASHFLOWS, INCOMES } from '@glossa/enum-fin'
import gulp            from 'gulp'
import { Abbreviator } from './Abbreviator'

export const saveFundamentalAbbreviations = gulp.series(
  Abbreviator(BALANCES),
  Abbreviator(INCOMES),
  Abbreviator(CASHFLOWS),
)