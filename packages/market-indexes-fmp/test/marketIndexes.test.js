import { samplesToTable }              from '@analys/convert'
import { LEFT }                        from '@analys/enum-join-modes'
import { Table }                       from '@analys/table'
import { deco, logger, ros, says, xr } from '@spare/logger'
import { Verse }                       from '@spare/verse'
import { MARKET_INDEXES_TABLE }        from '../assets/MARKET_INDEXES_TABLE'

const joinedTable = Table
  .from(MARKET_INDEXES_TABLE)
  .join(MARKET_INDEXES_TABLE_RAW |> samplesToTable, [ 'symbol' ], LEFT)
  .select([
    'label',
    'symbol',
    [ 'name', 'des' ],
    [ 'stockExchange', 'exchange' ],
    'city',
    'region',
    [ 'currency', 'curr' ]
  ])

joinedTable |> Verse.table |> logger