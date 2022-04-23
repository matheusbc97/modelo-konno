from Acao import Acao
import json

#acoes = [
#    Acao(codigo='MGLU3', valorInicial=6.48, valores=[7.04, 6.87]), 
#    Acao(codigo='BIDI11', valorInicial=21.48, valores=[21.76, 21.48])
#]

acoes = []

f = open ('../data/model_series_data.json', "r")
 
# Reading from file
data = json.loads(f.read())

for item in data:
    acoes.append(
        Acao(
            codigo=item['code'], 
            valorInicial=item['initialValue'], 
            valores=item['data']
        )
    )
