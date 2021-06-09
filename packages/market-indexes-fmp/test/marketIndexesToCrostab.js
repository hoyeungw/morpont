import { samplesToTable }    from '@analys/convert'
import { decoTable, logger }  from '@spare/logger'
import { RAW_MARKET_INDEXES } from '../src/assets/RAW_MARKET_INDEXES'

const table = samplesToTable(RAW_MARKET_INDEXES)

table |> decoTable |> logger