import gulp from 'gulp'
import { buildSina } from './gulpfile.prep.sina'
import { buildConcepts } from './gulpfile.prep.concepts'

export const buildSinaAndConcepts = gulp.series(
  buildSina,
  buildConcepts
)
