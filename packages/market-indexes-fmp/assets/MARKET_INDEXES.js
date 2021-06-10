import { Table }                from '@analys/table'
import { MARKET_INDEXES_TABLE } from './MARKET_INDEXES_TABLE'

export const MARKET_INDEXES = lookupTable.call(MARKET_INDEXES_TABLE, 'label', 'symbol')
