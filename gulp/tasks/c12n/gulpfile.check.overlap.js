import gulp from 'gulp'
import { says } from '@palett/says'
import { DynamicImport } from '@flua/dynamic-import'
import { CrosTab } from '@analys/crostab'
import { difference, intersect, union } from '@vect/vector-algebra'
import { decoCrostab } from '@spare/logger'
import { CODE_ENG, CODE_SECTOR, CODE_SECTORS } from '../../constants/projections'
import { HS300, SHENWAN, SINA, TUSH } from '../../constants/sources'

const mem = {}
const SWINDEX = 'SwIndex'
const checkOverlapTask = async () => {
  const ticks = [SHENWAN, SWINDEX, SINA, TUSH, HS300]
  const
    shenwan = Object.keys(mem[CODE_SECTORS]),
    swindex = Object.keys(mem[CODE_SECTOR + SHENWAN]),
    sina = Object.keys(mem[CODE_SECTORS + SINA]),
    tush = Object.keys(mem[CODE_SECTOR]),
    hs300 = Object.keys(mem[CODE_ENG])
  const c8n = [shenwan, swindex, sina, tush, hs300]
  new CrosTab(ticks, ticks, c8n.map(a => c8n.map(b => union(a, b).length)))
    |> decoCrostab
    |> says['union']
  new CrosTab(ticks, ticks, c8n.map(a => c8n.map(b => intersect(a, b).length)))
    |> decoCrostab
    |> says['intersect']
  new CrosTab(ticks, ticks, c8n.map(a => c8n.map(b => difference(a, b).length)))
    |> decoCrostab
    |> says['difference']
}

export const checkOverlap = gulp.series(
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-shenwan', prop: CODE_SECTORS }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-shenwan', prop: CODE_SECTOR, name: CODE_SECTOR + SHENWAN }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-sina', prop: CODE_SECTORS, name: CODE_SECTORS + SINA }),
  DynamicImport({ target: mem, src: '@glossa/c12n-fin-tush', prop: CODE_SECTOR }),
  DynamicImport({ target: mem, src: '@glossa/index-fin-hs300', prop: CODE_ENG }),
  checkOverlapTask
)
