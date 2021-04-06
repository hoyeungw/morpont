import { MUTABLE }                                        from '@analys/enum-mutabilities'
import { esvar }                                          from '@flua/utils'
import { Vinylize }                                       from '@flua/vinylize'
import { DictCollection as AbbrevDictCollection }         from '@glossa/abbr-fin'
import { DB, LITE, RATIO, RAW }                           from '@glossa/enum-data-scopes'
import { BALANCES, BASICS, CASHFLOWS, CHS, ENG, INCOMES } from '@glossa/enum-fin'
import { TYPE }                                           from '@glossa/enum-general-fields'
import { DictCollection as EnglishDictCollection }        from '@glossa/i18n-fin-ntes'
import { AbbrevCriteria }                                 from '@glossa/table-fin-ntes/static/AbbrevCriteria'
import { TableCollection }                                from '@glossa/table-fin-ntes/static/TableCollection'
import { says }                                           from '@palett/says'
import { decoString, decoTable }                          from '@spare/logger'
import { snakeToCamel }                                   from '@spare/phrasing'
import { Verse }                                          from '@spare/verse'
import { Rename }                                         from '@vect/rename'
import gulp                                               from 'gulp'
import { ABBR }                                           from '../../constants/abbr.fields'

const DEST = 'packages/table/table-fin-ntes/resources'
const mem = {}

const ImportTable = (report) => {
  return (async () => {
    mem[report] = await TableCollection[report]
  }) |> Rename('load table ' + says.roster(report))
}

const TranslateEnglish = (report) => {
  return (async () => {
    const table = await mem[report], dict = await EnglishDictCollection[report]
    const translates = table.column(CHS).map(x => x.replace(dict))
    table.pushColumn(ENG, translates)
  }) |> Rename('translate english ' + says.roster(report))
}

const TranslateAbbrev = (report) => {
  return (async () => {
    const table = await mem[report], dict = await AbbrevDictCollection[report]
    const translates = table.column(ENG).map(x => x.replace(dict, x => snakeToCamel(x.trim().toLowerCase())))
    table.pushColumn(ABBR, translates)
    const lengthCriterion = AbbrevCriteria[report]
    table.mutateColumn(DB, (x, i) => translates[i].length > lengthCriterion ? NaN : x)
  }) |> Rename('translate abbreviation ' + says.roster(report))
}

const LogTable = (report) => {
  return (async () => {
    const table = await mem[report]
    table.select([TYPE, RAW, DB, LITE, RATIO, ABBR, ENG, CHS], MUTABLE)
    table|> decoTable |> says[report]
  }) |> Rename('log table ' + says.roster(report))
}

const SaveTable = (report) => {
  return (async () => {
    const table = await mem[report]
    Vinylize(report + '.js')
      .p(esvar(report))
      .p(Verse.table(table))
      .pipe(gulp.dest(DEST))
  }) |> Rename(`save table ${says.roster(report)} to ${decoString(DEST, { delim: '/' })}`)
}

export const buildFinNtesTable = gulp.series(
  ImportTable(BALANCES),
  ImportTable(INCOMES),
  ImportTable(CASHFLOWS),
  ImportTable(BASICS),
  gulp.parallel(
    TranslateEnglish(BALANCES),
    TranslateEnglish(INCOMES),
    TranslateEnglish(CASHFLOWS),
    TranslateEnglish(BASICS),
  ),
  gulp.parallel(
    TranslateAbbrev(BALANCES),
    TranslateAbbrev(INCOMES),
    TranslateAbbrev(CASHFLOWS),
    TranslateAbbrev(BASICS),
  ),
  gulp.parallel(
    LogTable(BALANCES),
    LogTable(INCOMES),
    LogTable(CASHFLOWS),
    LogTable(BASICS),
  ),
  gulp.parallel(
    SaveTable(BALANCES),
    SaveTable(INCOMES),
    SaveTable(CASHFLOWS),
    SaveTable(BASICS),
  )
)

