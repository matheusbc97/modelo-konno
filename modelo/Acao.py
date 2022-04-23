class Acao:
    def __init__(self, codigo, valorInicial, valores):
        self.codigo = codigo

        rentabilidades = []

        for index in range(len(valores)):
            valorAnterior = 0
            valorCorrente = valores[index]

            if(index == 0):
                valorAnterior = valorInicial
            else:
                valorAnterior = valores[index - 1]

            rentabilidades.append((valorCorrente - valorAnterior)*100/valorAnterior)

        self.rentabilidades = rentabilidades
        self.rentabilidadeMedia = sum(rentabilidades) / len(rentabilidades)
        self.custoInvestimento = valores[len(valores)-1]