const fs = require("fs");

const yearToGetInfos = 2018

function writeToJson(data){
    const jsonString = JSON.stringify(data)

    fs.writeFile('../data/model_series_data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

function parseJson(path){
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
}

const data = parseJson('../data/series_data.json');

const months = ["01","02","03","04","05","06","07","08","09", "10", "11", "12"]

const newData = []

data.forEach(stock => {
    const stockValuesKeys = Object.keys(stock.data)

    const stockValuesFiltered = []
    let lastValue;
    let hasAnEmptyValue = false;

    months.forEach(month => {
        const date = stockValuesKeys.find(date => date.slice(0, 7) == yearToGetInfos+'-'+month)
        const stockData = stock.data[date]

        if(stockData){
            lastValue = stockData["4. close"]
            stockValuesFiltered.push(Number(stockData["4. close"]))
        } else {
            hasAnEmptyValue = true;
        }
    })

    if(hasAnEmptyValue){
        return;
    }

    const initialValueKey = stockValuesKeys.find(date => date.slice(0, 7) == (yearToGetInfos-1) + "-12" )

    if(!initialValueKey){
        return;
    }

    newData.push({
        code: stock.code,
        data: stockValuesFiltered,
        initialValue: Number(stock.data[initialValueKey]["4. close"])
    })
})

writeToJson(newData.slice(0, 80))