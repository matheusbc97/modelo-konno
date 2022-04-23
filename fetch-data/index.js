const axios = require("axios");
const fs = require('fs')

const codigosAcoes = [
    'MSFT',
    'AAPL',
    'AMZN',
    'BRK.B',
    'JNJ', // 5
    'JPM',
    'GOOG',
    'FB',
    'GOOGL',
    'XOM', // 10
    'PFE',
    'UNH',
    'VZ',
    'V', 
    'PG', //15
    'BAC',
    'INTC',
    'CVX',
    'T',
    'MRK', // 20 
    'WFC',
    'CSCO',
    'HD',
    'KO',
    'MA', //25
    'BA',
    'DIS',
    'PEP',
    'CMCSA',
    'ABBV', // 30
    'MCD', 
    'WMT',
    'C',
    'ABT',
    'AMGN', //35
    'DWDP',
    'MDT',
    'NFLX',
    'ORCL', 
    'MMM', //40
    'ADBE',
    'LLY',
    'AVGO',
    'CRM',
    'PM', //45
    'IBM',
    'UNP', 
    'PYPL',
    'HON',
    'NKE', //50
    'MO',
    'TXN',
    'TMO',
    'ACN',
    'COST', //55
    'UTX',
    'LIN',
    'BMY',
    'CVS',
    'NEE', //60
    'NVDA',
    'GILD', 
    'SBUX',
    'BKNG',
    'CAT', //65
    'LOW',
    'COP',
    'CI',
    'AMT',
    'USB', //70
    'QCOM',
    'ANTM',
    'UPS',
    'CME',
    'AXP', // 75
    'GE',
    'LMT',
    'DHR',
    'DUK',
    'BIIB', //80*/
    'BDX',
    'CB',
    'MDLZ',
    'GS',
    'ADP', //85
    'TJX',
    'WBA',
    'ISRG',
    'PNC',
    'MS', //90
    'SPG',
    'CL',
    'INTU',
    'FOXA',
    'CHTR', //95
    'EOG',
    'CSX',
    'SCHW',
    'SLB',
    'BSX', //100
]

let n = 0
const stockSeries = []

function writeToJson(){
    const jsonString = JSON.stringify(stockSeries)

    fs.writeFile('../data/series_data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}


function getStockSeries(){
    const codigoAcao = codigosAcoes[n];

    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {symbol: codigoAcao, function: 'TIME_SERIES_MONTHLY', datatype: 'json'},
        headers: {
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
            'X-RapidAPI-Key': ALPHA_VINTAGE_API
        }
    };

    axios.request(options).then(function (response) {
        stockSeries.push({
            code: codigoAcao,
            data: response.data['Monthly Time Series']
        })

        n++

        if(n < codigosAcoes.length){
            if(n%5 === 0){
                console.log('5 açoes foram salvas ')
                setTimeout(()=> getStockSeries(), 120000) // A api so permite fazer 5 requests a cada 2 minutos
            } else {
                getStockSeries()
            }
        } else {
            writeToJson()
        }
    }).catch(function (error) {
        console.error(error);
    });
}

getStockSeries()

