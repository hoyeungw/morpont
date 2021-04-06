import { renameBooks }               from './gulp/tasks/gulpfile.renameBooks'
import { saveWorldbankCliResources } from '@morpont/fundamental-alphav/gulp'
import gulp                          from 'gulp'


export {
  renameBooks,
  saveWorldbankCliResources,
}

export default gulp.series(
  renameBooks,
  saveWorldbankCliResources,
)
