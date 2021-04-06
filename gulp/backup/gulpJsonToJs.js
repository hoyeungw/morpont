import through from 'through2' // through2 is a thin wrapper around node transform streams
import { dashedToCamel } from '@spare/string'
import { fname } from '@repsi/fin-c12n-shenwan/utils/fname'

const FN_REG = /^[\w$]+$/

// Plugin level function(dealing with files)
// Creating a stream through which each file will pass
const gulpJsonToJs = function (args) {
  return through.obj((file, enc, next) => {
    const name = args?.name?.length && FN_REG.test(args.name) ? args.name : null
    if (file.isNull()) return next(null, file) // return empty file
    prepFileBody(file, name)
    return next(null, file)
  })
}

const prepFileBody = (file, name) => {
  const fn = fname(file.path) |> dashedToCamel
  const prefix = Buffer.from(`export const ${name || fn} =`)
  const suffix = Buffer.from(';')
  if (file.isBuffer())
    file.contents = Buffer.concat([prefix, file.contents, suffix])
  file.path = `${file.base}/${fn}.js`
  return file
}

export default gulpJsonToJs // Exporting the plugin main function

// new Buffer(number) // Deprecated
// Buffer.alloc(number) // New

// new Buffer(string) // Deprecated
// Buffer.from(string) // New
