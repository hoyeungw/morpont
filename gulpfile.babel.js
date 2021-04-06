import { saveFundamentalAbbreviations } from '@morpont/fundamental-alphav/gulp'
import gulp                             from 'gulp'


export {
  saveFundamentalAbbreviations,
}

export default gulp.series(
  saveFundamentalAbbreviations,
)
