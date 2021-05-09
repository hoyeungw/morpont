import { makeReplaceable } from '@spare/translator'
import { MUTABLE }         from '@analys/enum-mutabilities'
import { Table }           from '@analys/table'
import { exchanges }       from '@glossa/abbr-exchange'
import { DATE, SYMBOL }    from '@glossa/enum-fin'
import { within }          from '@valjoux/dashed-date'
import { iso }             from '@vect/vector-init'
import { NaiveCsv }        from 'naivecsv'

const dict = exchanges |> makeReplaceable

/**
 * @param {String} csv
 * @param {string} title
 * @param {string} symbol
 * @param {string} start
 * @param {string} end
 * @returns {Table}
 */
export const csvToTable = (
  csv,
  { title, symbol, start, end }
) => {
  const table = csv |> NaiveCsv.toTable |> Table.from
  table
    .mapHead(x => x.replace(dict), MUTABLE)
    // .mutate(x => Math.round(x), { exclusive: [ SYMBOL, DATE ] })
    .find({ date: date => within(date, start, end) })
    .unshiftColumn(SYMBOL, iso(table.ht, symbol))
  table.title = title
  return table
}

// if passed in json, the data would be like:
// {'Meta Data':{},'(Monthly|Weekly) Time Series ((Daily|5min))]':Object<string,Object<string,string>>}
