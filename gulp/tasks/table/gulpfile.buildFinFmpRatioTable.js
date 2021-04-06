import { esvar }                                                               from '@flua/utils'
import { Vinylize }                                                            from '@flua/vinylize'
import { DictCollection }                                                      from '@glossa/abbr-fin'
import { ratios }                                                              from '@glossa/abbr-fin-ratios'
import { RATIO }                                                               from '@glossa/enum-data-scopes'
import { BALANCES, CASHFLOWS, ENG, GENERALS, INCOMES }                         from '@glossa/enum-fin'
import { CASHFLOW, LIABILITY, LIQUIDITY, OPERATION, PROFITABILITY, VALUATION } from '@glossa/enum-fin-ratios'
import { TableCollection }                                                     from '@glossa/table-fin-fmp-ratios/static/TableCollection'
import { says }                                                                from '@palett/says'
import { decoEntries, decoTable, delogger, logger }                            from '@spare/logger'
import { camelToSnake, snakeToCamel }                                          from '@spare/phrasing'
import { makeReplaceable }                                                     from '@spare/translator'
import { Verse }                                                               from '@spare/verse'
import { Rename }                                                              from '@vect/rename'
import { merge }                                                               from '@vect/vector-merge'
import gulp                                                                    from 'gulp'
import { ABBR }                                                                from '../../constants/abbr.fields'

const DEST = 'packages/table/table-fin-fmp-ratio/resources'
const mem = {}
const LoadTable = (report) => {
  return (async () => {
    mem[report] = await TableCollection[report]
  }) |> Rename('load table ' + says.roster(report))
}

const capitalize = word => word[0].toUpperCase() + word.substring(1)

const EnglishToAbbrev = (report) => {
  return (async () => {
    /** @type {Table} */ const table = await mem[report]
    const dict = merge(
      ratios,
      DictCollection.build(GENERALS, BALANCES, INCOMES, CASHFLOWS)
    )|> makeReplaceable
    dict |> decoEntries |> says[report]
    const abbreviations = table
      .column(ENG)
      .map(x => {
          ({ x, processed: camelToSnake(capitalize(x), ' ') }) |> delogger
          return camelToSnake(capitalize(x), ' ')
            .replace(dict, snakeToCamel)
            .trim()
        }
      )
    table.insertColumn(ABBR, abbreviations, { field: RATIO, mutate: true })
  }) |> Rename('english to abbrev ' + says.roster(report))
}

const LogTable = (report) => {
  return (async () => {
    const table = await mem[report]
    table |> decoTable |> says[report]
    '' |> logger
  }) |> Rename('log table ' + says.roster(report))
}

const SaveTable = (report) => {
  return (async () => {
    const table = await mem[report]
    Vinylize(report + '.js')
      .p(esvar(report))
      .p(Verse.table(table))
      .pipe(gulp.dest(DEST))
  }) |> Rename('save table ' + says.roster(report))
}

export const buildFinFmpRatioTable = gulp.parallel(
  gulp.series(
    LoadTable(CASHFLOW),
    EnglishToAbbrev(CASHFLOW),
    LogTable(CASHFLOW),
    SaveTable(CASHFLOW),
  ),
  gulp.series(
    LoadTable(LIABILITY),
    EnglishToAbbrev(LIABILITY),
    LogTable(LIABILITY),
    SaveTable(LIABILITY),
  ),
  gulp.series(
    LoadTable(LIQUIDITY),
    EnglishToAbbrev(LIQUIDITY),
    LogTable(LIQUIDITY),
    SaveTable(LIQUIDITY),
  ),
  gulp.series(
    LoadTable(OPERATION),
    EnglishToAbbrev(OPERATION),
    LogTable(OPERATION),
    SaveTable(OPERATION),
  ),
  gulp.series(
    LoadTable(PROFITABILITY),
    EnglishToAbbrev(PROFITABILITY),
    LogTable(PROFITABILITY),
    SaveTable(PROFITABILITY),
  ),
  gulp.series(
    LoadTable(VALUATION),
    EnglishToAbbrev(VALUATION),
    LogTable(VALUATION),
    SaveTable(VALUATION),
  )
)
