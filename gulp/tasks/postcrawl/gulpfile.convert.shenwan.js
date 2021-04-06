import { MUTABLE }                         from '@analys/enum-mutabilities'
import { Table }                           from '@analys/table'
import { htmlToTable }                     from '@glossa/c12n-fin-shenwan/utils/htmlToTable'
import { CHS, END, SECTOR, START, SYMBOL } from '@glossa/enum-fin'
import { says }                            from '@palett/says'
import { DecoTable }                       from '@spare/logger'
import { Rename }                          from '@vect/rename'
import { promises }                        from 'fs'
import gulp                                from 'gulp'

const SRC = 'static'
const RAW = 'table.html'
const table = new Table()
const mem = {}

const AssignHtml = ({ target, src, filename }) => {
  return (async () => {
    const html = await promises.readFile(src + '/' + filename)
    target.html = html
    html.length |> says['html']
  }) |> Rename('assign html')
}

const HtmlToTable = () => {
  return (async () => {
    const table = Table
      .from(htmlToTable(mem.html))
      .select([
        ['行业名称', SECTOR],
        ['股票代码', SYMBOL],
        ['股票名称', CHS],
        ['起始日期', START],
        ['结束日期', END]
      ], MUTABLE)
      .mutateColumn(START, x => new Date(x))
    table |> DecoTable({ top: 16, bottom: 8, fullAngle: true }) |> says['table']
  }) |> Rename('html to table')
}

export const convertShenwan = gulp.series(
  AssignHtml({ target: mem, src: SRC, filename: RAW }),
  HtmlToTable()
)
