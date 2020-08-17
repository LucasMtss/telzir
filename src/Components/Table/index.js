import React, { useState, useEffect } from 'react';

function Table(props) {

    const [tarifa, setTarifa] = useState(1)
    const [ligacao, setLigacao] = useState({})

    useEffect(() => {
        setTarifa(calculaValorTarifa(props.dddOrigem, props.dddDestino))
        setLigacao(calculaValorLigacao(props.minutos, tarifa, props.plano))

    }, []);

    function calculaValorTarifa(dddOrigem, dddDestino) {
        var valorTarifa
        switch (dddOrigem) {
            case '011':
                if (dddDestino === '016')
                    valorTarifa = 1.90
                else if (dddDestino === '017')
                    valorTarifa = 1.70
                else if (dddDestino === '018')
                    valorTarifa = 0.90
                break;
            case '016':
                valorTarifa = 2.90
                break;
            case '017':
                valorTarifa = 2.70
                break;
            case '018':
                valorTarifa = 1.90
                break;
            default:
                valorTarifa = 1
                break;
        }
        return valorTarifa
    }

    function calculaValorLigacao(minutos, tarifa, plano) {
        var valorLigacao = {
            comPlano: 0.00,
            semPlano: 0.00
        }
        minutos = parseInt(minutos)
        if (plano === 'nenhum') {
            valorLigacao.comPlano = minutos * tarifa
            valorLigacao.semPlano = minutos * tarifa
        }
        else {
            plano = parseInt(plano)
            valorLigacao.semPlano = minutos * tarifa
            if (minutos <= plano)
                valorLigacao.comPlano = 0.00
            else
                valorLigacao.comPlano = (minutos - plano) * tarifa
        }

        return valorLigacao
    }


    return (
        <>
            <div className='resultados'>
                <table>
                    <tr>
                        <th>Com Fale Mais</th>
                        <th>Sem Fale Mais</th>
                    </tr>
                    <tr>
                        <td>{ligacao.comPlano}</td>
                        <td>{ligacao.semPlano}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Table