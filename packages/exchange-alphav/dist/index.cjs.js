'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var acq = require('@acq/acq');
var enumTabularTypes = require('@analys/enum-tabular-types');
var dashedDate = require('@valjoux/dashed-date');
var enumPeriodTypes = require('@valjoux/enum-period-types');
var timestamp = require('@valjoux/timestamp');
var translator = require('@spare/translator');
var enumMutabilities = require('@analys/enum-mutabilities');
var table = require('@analys/table');
var abbrExchange = require('@glossa/abbr-exchange');
var enumFin = require('@glossa/enum-fin');
var vectorInit = require('@vect/vector-init');
var naivecsv = require('naivecsv');

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
const dict = (_exchanges = abbrExchange.exchanges, translator.makeReplaceable(_exchanges));
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

  const table$1 = (_ref = (_csv = csv, naivecsv.NaiveCsv.toTable(_csv)), table.Table.from(_ref));
  table$1.mapHead(x => x.replace(dict), enumMutabilities.MUTABLE).find({
    date: date => dashedDate.within(date, start, end)
  }).unshiftColumn(enumFin.SYMBOL, vectorInit.iso(table$1.ht, symbol));
  table$1.title = title;
  return table$1;
}; // if passed in json, the data would be like:
// {'Meta Data':{},'(Monthly|Weekly) Time Series ((Daily|5min))]':Object<string,Object<string,string>>}

const TODAY = timestamp.date();
class ExchangeAlphav {
  static login(key) {
    ExchangeAlphav.apikey = key;
    return ExchangeAlphav;
  }

  static async timeseries({
    symbol = 'AAPL',
    start = dashedDate.shiftMonth(TODAY, -12),
    end = TODAY,
    period = enumPeriodTypes.MONTHLY,
    format = enumTabularTypes.TABLE
  } = {}) {
    return await acq.Acq.tabular({
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
      from: enumTabularTypes.TABLE,
      to: format
    });
  }

}

_defineProperty(ExchangeAlphav, "apikey", void 0);

const _periodToAlphavantageFunction = period => {
  if (period === enumPeriodTypes.INTRADAY) {
    return 'TIME_SERIES_INTRADAY';
  }

  if (period === enumPeriodTypes.DAILY) {
    return 'TIME_SERIES_DAILY';
  }

  if (period === enumPeriodTypes.WEEKLY) {
    return 'TIME_SERIES_WEEKLY';
  }

  if (period === enumPeriodTypes.MONTHLY) {
    return 'TIME_SERIES_MONTHLY';
  }

  return 'TIME_SERIES_MONTHLY';
};

const FIELD = ['symbol', 'date', 'o', 'hi', 'lo', 'e', 'vol'];

exports.ExchangeAlphav = ExchangeAlphav;
exports.FIELD = FIELD;
