import { LEFT }                                           from '@analys/enum-join-modes'
import { Table }                                          from '@analys/table'
import { logger }                                         from '@spare/logger'
import { Verse }                                          from '@spare/verse'
import { MARKET_INDEXES_TABLE, MARKET_INDEXES_TABLE_RAW } from '../assets'

const joinedTable = Table
  .from(MARKET_INDEXES_TABLE)
  .join(MARKET_INDEXES_TABLE_RAW, [ 'symbol' ], LEFT)
  .select([
    'id',
    'symbol',
    [ 'name', 'des' ],
    [ 'stockExchange', 'exchange' ],
    'city',
    'region',
    [ 'currency', 'curr' ]
  ])

joinedTable |> Verse.table |> logger