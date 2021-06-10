import { lookupTable }          from '@analys/table-lookup'
import { MARKET_INDEXES_TABLE } from './MARKET_INDEXES_TABLE'

export const MARKET_INDEXES = lookupTable.call(MARKET_INDEXES_TABLE, 'id', 'symbol', true)

