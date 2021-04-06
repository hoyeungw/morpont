export const options = {
  timeseries: {
    intraday: 'TIME_SERIES_INTRADAY',
    daily: 'TIME_SERIES_DAILY',
    weekly: 'TIME_SERIES_WEEKLY',
    monthly: 'TIME_SERIES_MONTHLY'
  },
  endpoint: {
    quoteEndpoint: 'GLOBAL_QUOTE',
    searchEndpoint: 'SYMBOL_SEARCH'
  },
  technical: {
    type: {
      macd: 'MACD'
    },
    series_type: {
      o: 'open',
      h: 'high',
      l: 'low',
      e: 'end',
    },
    interval: {
      m01: '1min',
      m05: '5min',
      m15: '15min',
      m30: '30min',
      h: '60min',
      d: 'daily',
      w: 'weekly',
      m: 'monthly',
    }
  },
  sector: {
    sector: 'SECTOR'
  }
}
