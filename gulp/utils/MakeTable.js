import gulp from 'gulp'
import { Rename } from '@vect/rename'
import { esvar } from '@flua/utils'
import { Verse } from '@spare/verse'
import { vinylize } from '@flua/vinylize'
import { says } from '@palett/says'

export const MakeTable = ({ table, dest, filename }) => (async () => {
  vinylize(filename + '.js',
    esvar(filename),
    Verse.table(table)
  ).pipe(gulp.dest(dest))
}) |> Rename('make table ' + says.roster(filename))
