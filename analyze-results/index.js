const fs = require("fs");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
 
function parseJson(path){
    const rawData = fs.readFileSync(path);
    return JSON.parse(rawData);
}

function writeToJson(data){
    const jsonString = JSON.stringify(data)

    fs.writeFile('../data/result_analyzes.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

const results = parseJson('../data/results.json')
const series_data = parseJson('../data/series_data.json')

function fix2houses(value){
    return Number(value.toFixed(2))
}

readline.question('Digite o ano a ser comparado:', yearToCompare => {
    console.log(`Ano escolhido: ${yearToCompare}`);

    readline.close();

    const newData = results.map(item => {
        const stock = series_data.find(stock => stock.code == item.codigo)
    
        const date = Object.keys(stock.data).find(date => date.slice(0,7) === yearToCompare + '-12')
      
        const priceOnYear = Number(stock.data[date]["4. close"])
     
        const valorDeRetorno = priceOnYear - item.custoInvestimento
        const rentabilidade = valorDeRetorno/item.custoInvestimento
    
        return {
            codigo: item.codigo,
            investimento: fix2houses(item.investimento),
            rentabilidade: fix2houses(rentabilidade),
            lucro: fix2houses(item.investimento * (rentabilidade+1)),
            custoInvestimento: fix2houses(item.custoInvestimento),
            valorDeRetorno: fix2houses(valorDeRetorno),
            ultimoValor: priceOnYear
        }
    })
    
    const lucroTotal =  newData.reduce((previous, current) => current.valorDeRetorno + previous, 0)
    const montanteTotalInvestido = newData.reduce((previous, current) => current.investimento + previous, 0)
    
    const json = {
        lucroTotal: fix2houses(lucroTotal),
        montanteTotalInvestido: fix2houses(montanteTotalInvestido),
        rentabilidadeTotal: fix2houses(((lucroTotal+montanteTotalInvestido) - montanteTotalInvestido) * 100 / montanteTotalInvestido),
        data: newData
    }
    
    writeToJson(json)
});

