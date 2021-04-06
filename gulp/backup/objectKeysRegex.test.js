import { logger, says, xr } from '@spare/logger'

const innocents = [
  'foo',
  '_bar',
  '$kha',
  '12',
  '___',
]

const guilties = [
  'a+b',
  'a-b',
  'a&b'
]

const reg = /^[\w$]+$/
const reg2 = /^[a-z0-9A-Z_$]+$/

const regPick = reg
xr().p('regex to be tested').regex(regPick.toString()) |> says['attorney']
'' |> logger

'below should be passed' |> says['attorney']
for (let key of innocents) {
  regPick.test(key) |> says[key]
}

'' |> logger
'below should be overruled' |> says['attorney']
for (let key of guilties) {
  regPick.test(key) |> says[key]
}
