import { tableToSamples }       from '@analys/convert'
import { Table }                from '@analys/table'
import { esvar, greyNow }       from '@flua/utils'
import { Vinylize }             from '@flua/vinylize'
import { decoFlat, logger, Xr } from '@spare/logger'
import { camelToSnake }         from '@spare/phrasing'
import { Verse }                from '@spare/verse'
import gulp                     from 'gulp'
import APIKEY                   from '../../../local/fmp.apikey.json'
import { MARKET_INDEXES_TABLE } from '../assets'
import { MarketIndexes }        from '../src/MarketIndexes'

const DEST = 'packages/market-indexes-fmp/resources'

MarketIndexes.login(APIKEY)

export const saveIndicator = async function ({ id }) {
  try {
    const filename = camelToSnake(id, '_').toUpperCase()
    console.log(id, filename)
    const table = Table.from(await MarketIndexes.prices({ indicator: id, }))
    await Vinylize(filename + '.js')
      .p(esvar(filename))
      .p(Verse.table(table))
      .asyncPipe(gulp.dest(DEST))
    return table
  } catch (e) {
    console.error(e)
    return null
  }
}

export const saveMarketIndexesFmp = async () => {
  for (let sample of tableToSamples(MARKET_INDEXES_TABLE)) {
    const table = await saveIndicator(sample)
    table
      ? ( Xr(greyNow()).p('done')['saved'](sample |> decoFlat).count(table.rows.length) )
      : ( Xr(greyNow()).p('nullish')['delete'](sample |> decoFlat) )
        |> logger
  }
}
