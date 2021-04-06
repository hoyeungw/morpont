import { TABLE }           from '@analys/enum-tabular-types'
import { Table }           from '@analys/table'
import { IndexHS300 }      from '@glossa/index-fin-hs300/src/IndexHS300'
import { DecoTable, says } from '@spare/logger'
import gulp                from 'gulp'
import size                from 'gulp-size'
import vinylBuffer         from 'vinyl-buffer'
import source              from 'vinyl-source-stream'

const BASE = 'packages/index/index-fin-hs300'
const RAW = 'IndexHS30.json'
const SRC = BASE + '/static'

export const fetch = async () => {
  const table = await IndexHS300
    .indexes({ format: TABLE })
    .then(table => {
        (table = Table.from(table)) |> DecoTable({ top: 3, bottom: 2 }) |> says['fetched table']
        // insightHS300(table) |> deco |> says['fetched table']
        return table
      }
    )
  const stream = source(RAW)
  stream.write(JSON.stringify(table)) // write the file contents value the stream
  await stream.end()
  return stream
    .pipe(vinylBuffer())
    .pipe(size({ title: RAW }))
    .pipe(gulp.dest(SRC))
}
