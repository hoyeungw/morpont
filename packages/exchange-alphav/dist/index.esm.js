import { Acq } from '@acq/acq';
import { TABLE } from '@analys/enum-tabular-types';
import { within, shiftMonth } from '@valjoux/dashed-date';
import { MONTHLY, INTRADAY, DAILY, WEEKLY } from '@valjoux/enum-period-types';
import { date } from '@valjoux/timestamp';
import { makeReplaceable } from '@spare/translator';
import { MUTABLE } from '@analys/enum-mutabilities';
import { Table } from '@analys/table';
import { exchanges } from '@glossa/abbr-exchange';
import { SYMBOL } from '@glossa/enum-fin';
import { iso } from '@vect/vector-init';
import { NaiveCsv } from 'naivecsv';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const BASE = 'https://www.alphavantage.co/query';

var _exchanges;
const dict = (_exchanges = exchanges, makeReplaceable(_exchanges));
/**
 * @param {String} csv
 * @param {string} title
 * @param {string} symbol
 * @param {string} start
 * @param {string} end
 * @returns {Table}
 */

const csvToTable = (csv, {
  title,
  symbol,
  start,
  end
}) => {
  var _ref, _csv;

  const table = (_ref = (_csv = csv, NaiveCsv.toTable(_csv)), Table.from(_ref));
  table.mapHead(x => x.replace(dict), MUTABLE).find({
    date: date => within(date, start, end)
  }).unshiftColumn(SYMBOL, iso(table.ht, symbol));
  table.title = title;
  return table;
}; // if passed in json, the data would be like:
// {'Meta Data':{},'(Monthly|Weekly) Time Series ((Daily|5min))]':Object<string,Object<string,string>>}

const TODAY = date();
class ExchangeAlphav {
  static login(key) {
    ExchangeAlphav.apikey = key;
    return ExchangeAlphav;
  }

  static async timeseries({
    symbol = 'AAPL',
    start = shiftMonth(TODAY, -12),
    end = TODAY,
    period = MONTHLY,
    format = TABLE
  } = {}) {
    return await Acq.tabular({
      title: 'timeseries',
      url: BASE,
      params: {
        'symbol': symbol,
        'function': _periodToAlphavantageFunction(period),
        'apikey': ExchangeAlphav.apikey,
        'datatype': 'csv'
      },
      prep: csvToTable,
      args: {
        title: 'timeseries',
        symbol,
        start,
        end
      },
      from: TABLE,
      to: format
    });
  }

}

_defineProperty(ExchangeAlphav, "apikey", void 0);

const _periodToAlphavantageFunction = period => {
  if (period === INTRADAY) {
    return 'TIME_SERIES_INTRADAY';
  }

  if (period === DAILY) {
    return 'TIME_SERIES_DAILY';
  }

  if (period === WEEKLY) {
    return 'TIME_SERIES_WEEKLY';
  }

  if (period === MONTHLY) {
    return 'TIME_SERIES_MONTHLY';
  }

  return 'TIME_SERIES_MONTHLY';
};

export { ExchangeAlphav };
