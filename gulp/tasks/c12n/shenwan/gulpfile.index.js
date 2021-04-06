import gulp from 'gulp'
import { buildShenwanTush } from './gulpfile.prep.shenwan.tush'
import { buildShenwanOfficial } from './gulpfile.prep.shenwan.official'

export const buildShenwan = gulp.series(
  buildShenwanTush,
  buildShenwanOfficial
)
