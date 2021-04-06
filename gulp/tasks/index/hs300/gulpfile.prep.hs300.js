import { Table }                                                   from '@analys/table'
import { distinct }                                                from '@aryth/distinct-vector'
import { Clean }                                                   from '@flua/clean'
import { DynamicImport }                                           from '@flua/dynamic-import'
import { AssignTable }                                             from '@flua/gulp-init'
import { TableChips, TableLookup }                                 from '@flua/table-gulp'
import { esvar }                                                   from '@flua/utils'
import { Vinylize }                                                from '@flua/vinylize'
import { AREA, CHS, CODE, CONCEPTS, ENG, SECTOR, SECTORS, WEIGHT } from '@glossa/enum-fin'
import { FinInsight }                                              from '@glossa/fin-insight'
import { cleanEng }                                                from '@glossa/index-fin-hs300/src/cleanEng'
import { deca, logger }                                            from '@spare/logger'
import { quote }                                                   from '@spare/quote'
import { Verse }                                                   from '@spare/verse'
import { mapper as mapperObject }                                  from '@vect/object-mapper'
import { Rename }                                                  from '@ject/rename'
import { intersect }                                               from '@vect/vector-algebra'
import gulp                                                        from 'gulp'
import {
  CODE_AREA,
  CODE_CONCEPTS,
  CODE_SECTOR,
  CODE_SECTORS,
  CONCEPT_CODES,
  SECTOR_CODES
}                                                                  from '../../../constants/projections'
import { TUSH }                                                    from '../../../constants/sources'
import { Insight }                                                 from '../../../functions/Insight'
import { OBJECTIFY }                                               from '../../../functions/readValue'
import { MakeTable }                                               from '../../../utils/MakeTable'

const BASE = 'packages/index/index-fin-hs300'
const RAW = 'IndexHS300.json'
const SRC = BASE + '/static'
const DEST = BASE + '/resources'

const table = new Table()
const mem = {}

const MergeTable = (table) => {
  return (async () => {
    mem |> deca({ hi: 1 }) |> logger
    const codes = table.column(CODE)
    for (let [ key, label ] of [
      [ CODE_SECTOR + TUSH, SECTOR + TUSH ],
      [ CODE_SECTOR, SECTOR ],
      [ CODE_SECTORS, SECTORS ],
      [ CODE_CONCEPTS, CONCEPTS ],
      [ CODE_AREA, AREA ],
    ]) {
      const dict = mem[key]
      table.pushColumn(label, codes.map(x => dict[x]))
    }
    table.mutateColumn(CODE, x => quote(x))
    table.mutateColumn(SECTORS, distinct)
    table.mutateColumn(CONCEPTS, distinct)
    table.mutateColumn(ENG, cleanEng)
  }) |> Rename('merge table')
}

const SectorToCodes = ({ label, table, suffix }) => {
  return (async () => {
    const filename = label + (suffix ?? '')
    const dict = mem[label]
    const codes = table.column(CODE)
    const o = mapperObject(dict, list => intersect(list, codes))
    Vinylize(filename + '.js')
      .p(esvar(filename))
      .p(Verse.object(o, OBJECTIFY.std))
      .pipe(gulp.dest(DEST))
  }) |> Rename('merge table')
}

export const buildHs300 = gulp.series(
  Clean(DEST),
  AssignTable({ target: table, src: SRC, filename: RAW }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-sina', prop: CONCEPT_CODES }),
  SectorToCodes({ label: CONCEPT_CODES, table }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-tush', prop: CODE_SECTOR, name: CODE_SECTOR + TUSH }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-shenwan', prop: CODE_SECTORS }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-shenwan', prop: CODE_SECTOR }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-sina', prop: CODE_CONCEPTS }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-tush', prop: CODE_AREA }),
  MergeTable(table),
  Insight({ filename: RAW, table: table, insight: FinInsight.hs300Insight }),
  MakeTable({ table, dest: DEST, filename: 'c12ns' }),
  gulp.parallel(
    TableLookup({ table, key: CODE, field: CHS, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: ENG, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: WEIGHT, dest: DEST, config: OBJECTIFY.loose }),
    TableLookup({ table, key: CODE, field: SECTORS, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: SECTOR, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: CONCEPTS, dest: DEST, config: OBJECTIFY.std }),
    TableLookup({ table, key: CODE, field: AREA, dest: DEST, config: OBJECTIFY.std }),
    TableChips({ table, key: SECTOR, field: CODE, dest: DEST, config: OBJECTIFY.std }),
    TableChips({
      table, key: SECTOR + TUSH, field: CODE, dest: DEST,
      filename: SECTOR_CODES + TUSH, config: OBJECTIFY.std
    }),
  ),
)
