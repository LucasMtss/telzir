## TelZir
    A aplicação foi feita utilizando HTML, CSS, Javascript e React.js apenas.
    A mesma tem como finalidade informar o custo de uma ligação com e sem os planos Fale Mais, bem como o valor que o cliente vai economizar com o plano. O calculo é feito com base nas informações inseridas pelo usuário nos campos demarcados, como DDD de origem, DDD de destino, duração da chamada e o plano que o cliente possui.

## Validação dos valores nos inputs
    O cálculo da tarifa segundo os DDDs de origem e destino tem como base a tabela, retirada do PDF do desafio
    
    Origem      Destino     $/min
     011          016        1.90
     016          011        2.90
     011          017        1.70
     017          011        2.70
     011          018        0.90
     018          011        1.90 

    Segundo a tabela, se o DDD de origem for 011, o DDD de destino pode ser 016, 017 e 018.
    Se o DDD de origem for 016, 017 ou 018, o DDD de destino só poderá ser 011

    Os planos ofertados para os clientes são: Fale Mais 30, Fale Mais 60 e Fale Mais 120.

## Testes com valores esperados
    O site por sí só já não permite ao usuário inserir tipos incorretos de dados nos inputs.

    Alguns testes podem ser feitos utilizando os valores indicados e a resposta deverá ser a mesma presente na tabela:

    Origem      Destino      Plano      Tempo      Com Fale Mais      Sem Fale Mais      Economia
      011         016     FaleMais 30     20          R$ 0,00             R$ 38,00       R$ 38,00
      011         017     FaleMais 60     80          R$ 37,40            R$ 136,00      R$ 98,60
      018         011     FaleMais 120    220         R$ 167,20           R$ 380,00      R$ 212,80
      011         016     FaleMais 30     30          R$ 0,00             R$ 57,00       R$ 57,00 
      016         011     FaleMais 120    0           R$ 0,00             R$ 0,00        R$ 0,00
      018         011   Não tenho plano   37          R$ 51,30            R$ 51,30       R$ 0,00
