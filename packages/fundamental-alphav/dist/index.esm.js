import { Acq } from '@acq/acq';
import { samplesToTable } from '@analys/convert';
import { TABLE } from '@analys/enum-tabular-types';
import { DB, LITE } from '@glossa/enum-data-scopes';
import { BALANCES, INCOMES, CASHFLOWS, SYMBOL, DATE } from '@glossa/enum-fin';
import { shiftYear, within } from '@valjoux/dashed-date';
import { date } from '@valjoux/timestamp';
import { iso } from '@vect/vector-init';
import { CrosTab } from '@analys/crostab';

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

const balancesDb = [['symbol', 'symbol'], ['fiscalDateEnding', 'date'], ['reportedCurrency', 'curr'], ['totalAssets', 'ast'], ['totalCurrentAssets', 'cAst'], ['cashAndCashEquivalentsAtCarryingValue', 'cce'], ['cashAndShortTermInvestments', 'cashStIv'], ['inventory', 'invt'], ['currentNetReceivables', 'cNetRecv'], ['totalNonCurrentAssets', 'ncAst'], ['propertyPlantEquipment', 'ppe'], ['accumulatedDepreciationAmortizationPPE', 'accumDeprAmoPpe'], ['intangibleAssets', 'intgAst'], ['intangibleAssetsExcludingGoodwill', 'intgAstExlGdw'], ['goodwill', 'gdw'], ['investments', 'iv'], ['longTermInvestments', 'ltIv'], ['shortTermInvestments', 'stIv'], ['otherCurrentAssets', 'oCAst'], ['otherNonCurrrentAssets', 'oNcAst'], ['totalLiabilities', 'liab'], ['totalCurrentLiabilities', 'cLiab'], ['currentAccountsPayable', 'cAccPyb'], ['deferredRevenue', 'defRev'], ['currentDebt', 'cDebt'], ['shortTermDebt', 'stDebt'], ['totalNonCurrentLiabilities', 'ncLiab'], ['capitalLeaseObligations', 'capLeasOb'], ['longTermDebt', 'ltDebt'], ['currentLongTermDebt', 'cLtDebt'], ['longTermDebtNoncurrent', 'ltDebtNc'], ['shortLongTermDebtTotal', 'sLtDebt'], ['otherCurrentLiabilities', 'oCLiab'], ['otherNonCurrentLiabilities', 'oNcLiab'], ['totalShareholderEquity', 'eqt'], ['treasuryStock', 'trSto'], ['retainedEarnings', 'retE'], ['commonStock', 'cmSto'], ['commonStockSharesOutstanding', 'cmStoSo']];

const balancesLite = [['symbol', 'symbol'], //
['fiscalDateEnding', 'date'], //
['reportedCurrency', 'curr'], //
['totalAssets', 'ast'], //
['totalCurrentAssets', 'cAst'], //
['cashAndCashEquivalentsAtCarryingValue', 'cce'], //
['inventory', 'invt'], //
['propertyPlantEquipment', 'ppe'], //
['intangibleAssets', 'intgAst'], //
['goodwill', 'gdw'], //
['totalLiabilities', 'liab'], //
['totalCurrentLiabilities', 'cLiab'], //
['totalNonCurrentLiabilities', 'ncLiab'], //
['totalShareholderEquity', 'eqt'], //
['retainedEarnings', 'retE'], //
['commonStock', 'cmSto'] //
];

const cashflowsDb = [['symbol', 'symbol'], ['fiscalDateEnding', 'date'], ['reportedCurrency', 'curr'], ['operatingCashflow', 'opCf'], ['paymentsForOperatingActivities', 'pmForOpAct'], ['proceedsFromOperatingActivities', 'procFrOpAct'], ['changeInOperatingLiabilities', 'chInOpLiab'], ['changeInOperatingAssets', 'chInOpAst'], ['depreciationDepletionAndAmortization', 'deprDplAmo'], ['capitalExpenditures', 'capExpd'], ['changeInReceivables', 'chInRecv'], ['changeInInventory', 'chInInvt'], ['profitLoss', 'pftLoss'], ['cashflowFromInvestment', 'cfFrIv'], ['cashflowFromFinancing', 'cfFrFin'], ['proceedsFromRepaymentsOfShortTermDebt', 'procFrRepmOfStDebt'], ['paymentsForRepurchaseOfCommonStock', 'pmForRpOfCSto'], ['paymentsForRepurchaseOfEquity', 'pmForRpOfEqt'], ['paymentsForRepurchaseOfPreferredStock', 'pmForRpOfPrefSto'], ['dividendPayout', 'divPyo'], ['dividendPayoutCommonStock', 'divPyoCSto'], ['dividendPayoutPreferredStock', 'divPyoPrefSto'], ['proceedsFromIssuanceOfCommonStock', 'procFrIsuOfCSto'], ['proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet', 'procFrIsuOfLtDebtCapSecNet'], ['proceedsFromIssuanceOfPreferredStock', 'procFrIsuOfPrefSto'], ['proceedsFromRepurchaseOfEquity', 'procFrRpOfEqt'], ['proceedsFromSaleOfTreasuryStock', 'procFrSaleOfTrSto'], ['changeInCashAndCashEquivalents', 'chInCce'], ['changeInExchangeRate', 'chInExRate'], ['netIncome', 'netInc']];

const cashflowsLite = [['symbol', 'symbol'], //
['fiscalDateEnding', 'date'], //
['reportedCurrency', 'curr'], //
['operatingCashflow', 'opCf'], //
['capitalExpenditures', 'capExpd'], //
['cashflowFromInvestment', 'cfFrIv'], //
['cashflowFromFinancing', 'cfFrFin'], //
['changeInCashAndCashEquivalents', 'chInCce'], //
['netIncome', 'netInc'] //
];

const incomesDb = [['symbol', 'symbol'], ['fiscalDateEnding', 'date'], ['reportedCurrency', 'curr'], ['grossProfit', 'gPft'], ['totalRevenue', 'rev'], ['costOfRevenue', 'cRev'], ['costofGoodsAndServicesSold', 'cGSv'], ['operatingIncome', 'opInc'], ['sellingGeneralAndAdministrative', 'sGA'], ['researchAndDevelopment', 'rD'], ['operatingExpenses', 'opExp'], ['investmentIncomeNet', 'ivIncNet'], ['netInterestIncome', 'netIntrInc'], ['interestIncome', 'intrInc'], ['interestExpense', 'intrExp'], ['nonInterestIncome', 'nintrInc'], ['otherNonOperatingIncome', 'oNopInc'], ['depreciation', 'depr'], ['depreciationAndAmortization', 'deprAmo'], ['incomeBeforeTax', 'incBeforeTx'], ['incomeTaxExpense', 'incTxExp'], ['interestAndDebtExpense', 'intrDebtExp'], ['netIncomeFromContinuingOperations', 'netIncFrCOp'], ['comprehensiveIncomeNetOfTax', 'comprIncNetOfTx'], ['ebit', 'ebit'], ['ebitda', 'ebitda'], ['netIncome', 'netInc']];

const incomesLite = [['symbol', 'symbol'], //
['fiscalDateEnding', 'date'], //
['reportedCurrency', 'curr'], //
['grossProfit', 'gPft'], //
['totalRevenue', 'rev'], //
['costOfRevenue', 'cRev'], //
['costofGoodsAndServicesSold', 'cGSv'], //
['operatingIncome', 'opInc'], //
['sellingGeneralAndAdministrative', 'sGA'], //
['researchAndDevelopment', 'rD'], //
['operatingExpenses', 'opExp'], //
['depreciation', 'depr'], //
['ebit', 'ebit'], //
['ebitda', 'ebitda'], //
['netIncome', 'netInc'] //
];

const FieldsCrostab = CrosTab.from({
  side: [BALANCES, INCOMES, CASHFLOWS],
  head: [DB, LITE],
  rows: [[balancesDb, balancesLite], [incomesDb, incomesLite], [cashflowsDb, cashflowsLite]]
});

const TODAY = date();
const MILLION = 1E+6;
class FundamentalAlphav {
  static login(key) {
    return FundamentalAlphav.apikey = key, FundamentalAlphav;
  }

  static async timeseries({
    symbol = 'AAPL',
    start = shiftYear(TODAY, -3),
    end = TODAY,
    report = BALANCES,
    format = TABLE,
    scope = LITE
  } = {}) {
    return await Acq.tabular({
      title: 'annualReports',
      url: BASE,
      params: {
        'symbol': symbol,
        'function': _reportToAlphavantageFunction(report),
        'apikey': FundamentalAlphav.apikey
      },
      prep: ({
        quarterlyReports
      }, {
        symbol,
        start,
        end
      }) => {
        const table = samplesToTable(quarterlyReports, FieldsCrostab.cell(report, scope));
        table.find({
          date: date => within(date, start, end)
        }).mutate(x => x / MILLION, {
          exclusive: [SYMBOL, DATE, 'curr']
        }).unshiftColumn(SYMBOL, iso(table.ht, symbol)).setTitle(symbol);
        return table;
      },
      args: {
        symbol,
        start,
        end
      },
      from: TABLE,
      to: format
    });
  }

}

_defineProperty(FundamentalAlphav, "apikey", void 0);

const _reportToAlphavantageFunction = report => {
  if (report === INCOMES) {
    return 'INCOME_STATEMENT';
  }

  if (report === BALANCES) {
    return 'BALANCE_SHEET';
  }

  if (report === CASHFLOWS) {
    return 'CASH_FLOW';
  }

  return 'BALANCE_SHEET';
};

export { FieldsCrostab, FundamentalAlphav };
