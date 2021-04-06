import { waitSpin }        from '@flua/utils'
import { says }            from '@palett/says'
import { deca, DecoTable } from '@spare/logger'
import { Rename }          from '@vect/rename'

export const Insight = ({ filename, table, insight, delay = 1200 } = {}) => {
  return (async () => {
    if (!table) return void 0
    await table |> DecoTable({ top: 2, bottom: 1, fullAngle: true }) |> says['insight'].br(filename)
    await waitSpin(delay, says.roster('insight'))
    if (!insight) return void 0
    await insight(table) |> deca({ wa: 10 }) |> says['insight'].br(filename)
    await waitSpin(delay, says.roster('insight'))
  }) |> Rename('insight')
}
