import gulp                             from 'gulp'
import { saveFundamentalAbbreviations } from '@morpont/fundamental-alphav/gulp'


export {
  saveFundamentalAbbreviations,
}

export default gulp.series(
  saveFundamentalAbbreviations,
)
