const fmp = require('financialmodelingprep')('fe647ef26d2700f2e11b53a996860481')

// Simple Examples

// API route: /quote/AAPL
fmp.stock('aapl').quote().then(response => console.log(response));
//API route: /quote/AAPL,MSFT
fmp.stock(['AAPL', 'MSFT']).quote().then(response => console.log(response));

// API route: /stock/sectors-performance
fmp.market.sector_performance().then(response => console.log(response));

// API route: /quote/USDEUR
fmp.forex('USD', 'EUR').rate().then(response => console.log(response));