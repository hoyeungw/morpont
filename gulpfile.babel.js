import gulp                             from 'gulp'
import { saveFundamentalAbbreviations } from '@morpont/fundamental-alphav/gulp'
import { saveMarketIndexesFmp }         from '@morpont/market-indexes-fmp/gulp'

export {
  saveFundamentalAbbreviations,
  saveMarketIndexesFmp,
}

export default gulp.series(
  saveFundamentalAbbreviations,
  saveMarketIndexesFmp,
)
