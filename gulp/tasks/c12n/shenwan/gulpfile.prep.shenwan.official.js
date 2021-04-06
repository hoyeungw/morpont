import gulp from 'gulp'
import { FinInsight } from '@glossa/fin-insight'
import { AssignTable } from '@flua/gulp-init'
import { Clean } from '@flua/clean'
import { Table } from '@analys/table'
import { TableChips, TableLookup } from '@flua/table-gulp'
import { CHS, CODE, EST, SECTOR } from '@glossa/enum-fin'
import { Insight } from '../../../functions/Insight'
import { OBJECTIFY } from '../../../functions/readValue'

const BASE = 'packages/c12n/c12n-fin-shenwan'
const RAW = 'SectorsOfficial.json'
const SRC = BASE + '/static'
const DEST = BASE + '/static/sectorsOfficial'

const table = new Table()

export const buildShenwanOfficial = gulp.series(
  Clean(DEST),
  AssignTable({ target: table, src: SRC, filename: RAW }),
  Insight({ filename: RAW, table: table, insight: FinInsight.sectorInsight }),
  gulp.series(
    TableLookup({ table, key: CODE, field: CHS, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: SECTOR, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: EST, dest: DEST, config: OBJECTIFY.std }),
    TableChips({ table, key: SECTOR, field: CODE, dest: DEST, config: OBJECTIFY.std }),
  )
)

