import gulp from 'gulp'
import del from 'del'
import source from 'vinyl-source-stream'
import vinylBuffer from 'vinyl-buffer'
import size from 'gulp-size'
import tap from 'gulp-tap'
import mergeStream from 'merge-stream'
import { fname } from '../../utils/fname'

const DEST = 'dist/out'
const SRC_ALPHA = 'static/alpha.js'
const SRC_BETA = 'static/beta.js'
const LOAD_ALPHA = 'load-alpha'
const LOAD_BETA = 'load-beta'
const WRITE_BODY = 'write-body'
const CLEAN = 'clean'

const mem = {}

gulp.task(CLEAN, () => del([DEST]))
// task of loading the files' contents in mem
gulp.task(LOAD_ALPHA, () => gulp
  .src(SRC_ALPHA)  // read the lib files from the disk
  .pipe(tap(file => {
    mem[fname(file.path)] = file.contents.toString() // tap into the stream to get each file's data
  })))

// task of loading the files' contents in mem
gulp.task(LOAD_BETA, () => gulp
  .src(SRC_BETA)
  .pipe(tap(file => {
    mem[fname(file.path)] = file.contents.toString()
  })))

gulp.task(WRITE_BODY, async () => {
  const streamList = [] // we make an array to store all the stream promises
  for (const filename of Object.keys(mem)) {
    let stream = source('combined.js')
    stream.write(mem[filename]) // write the file contents to the stream
    await stream.end()
    // process.nextTick(() => stream.end()) // in the next process cycle, end the stream
    stream // transform the raw data into the stream, into a vinyl object/file
      .pipe(vinylBuffer())
      //.pipe(tap(function(file) { /* do something with the file contents here */ }))
      .pipe(size({ title: filename }))
      .pipe(gulp.dest(DEST, { append: true }))
    streamList.push(stream) // add the end of the stream, otherwise the task would finish before all the processing is done
  }
  return mergeStream(...streamList)
})

gulp.task('default',
  gulp.series(
    CLEAN,
    gulp.parallel(LOAD_ALPHA, LOAD_BETA), // load the files in parallel
    WRITE_BODY  // ready to write once all static are in mem
  )
)
