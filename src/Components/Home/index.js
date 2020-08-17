import React, { useState } from 'react';
import Table from '../Table'

function Home() {
    const [minutos, setMinutos] = useState('');
    const [dddOrigem, setDddOrigem] = useState('')
    const [dddDestino, setDddDestino] = useState('')
    const [plano, setPlano] = useState('')
    const [tarifa, setTarifa] = useState()
    const [ligacao, setLigacao] = useState({})
    const [selectValues, setSelectValues] = useState(['011', '016', '017', '018'])

    function calculaValores() {
        let tempoMinutos = document.getElementById('minutos').value
        let dddO = document.getElementsByName('dddO')
        let dddD = document.getElementsByName('dddD')
        let planos = document.getElementsByName('plano')

        let valorDddOrigem

        dddO.forEach(function (ddd) {
            if (ddd.selected)
                valorDddOrigem = ddd.value
        })

        let valorDddDestino

        dddD.forEach(function (ddd) {
            if (ddd.selected)
                valorDddDestino = ddd.value
        })

        let valorPlano

        planos.forEach(function (p) {
            if (p.selected)
                valorPlano = p.value
        })

        if (tempoMinutos === '')
            tempoMinutos = '0'

        console.log('minutos: ', tempoMinutos)
        console.log('DDD origem: ', valorDddOrigem)
        console.log('DDD destino: ', valorDddDestino)
        console.log('plano: ', valorPlano)


        setMinutos(tempoMinutos)
        setDddOrigem(valorDddOrigem)
        setDddDestino(valorDddDestino)
        setPlano(valorPlano)
        var valorTarifa = calculaValorTarifa(valorDddOrigem, valorDddDestino)
        calculaValorLigacao(tempoMinutos, valorTarifa, valorPlano)
    }




    function calculaValorTarifa(dddOrigem, dddDestino) {
        var valorTarifa
        console.log('entrou', dddOrigem, dddDestino)
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
        }
        console.log('tarifa da funcao: ', valorTarifa)
        //setTarifa(valorTarifa)
        return valorTarifa
    }

    async function calculaValorLigacao(minutos, tarifa, plano) {
        var valorMinutos = parseFloat(minutos)
        var valorPlano = parseFloat(plano)
        var valorLigacao = {
            comPlano: 0.00,
            semPlano: 0.00
        }
        console.log('minutos: ', valorMinutos)
        console.log('tarifa: ', tarifa)
        console.log('plano: ', parseFloat(plano))
        if (plano === 'nenhum') {
            valorLigacao.comPlano = (valorMinutos * tarifa).toFixed(2)
            valorLigacao.semPlano = (valorMinutos * tarifa).toFixed(2)
        }
        else {
            valorLigacao.semPlano = valorMinutos * tarifa
            if (valorMinutos <= valorPlano)
                valorLigacao.comPlano = 0.00
            else
                valorLigacao.comPlano = ((valorMinutos - valorPlano) * (tarifa * 1.1)).toFixed(2)
        }

        console.log('com plano: ', valorLigacao.comPlano)
        console.log('sem plano: ', valorLigacao.semPlano)

        setLigacao(valorLigacao)
    }

    async function valueSelectChange(e) {
        var ddd = document.getElementsByName('dddO')
        var selected
        ddd.forEach((valor) => {
            if (valor.selected)
                selected = valor.value
        })

        if (selected !== '011')
            setSelectValues(['011'])
        else
            setSelectValues(['011', '016', '017', '018'])
        console.log(selectValues)
    }


    return (
        <>
            <div className='selectionContainer'>
                <label>Informe o seu DDD</label>
                <select className='dddOrigem' onChange={valueSelectChange}>
                    <option name='dddO' value='011' selected>011</option>
                    <option name='dddO' value='016'>016</option>
                    <option name='dddO' value='017'>017</option>
                    <option name='dddO' value='018'>018</option>
                </select>
                <br />
                <label>Informe o DDD que você deseeja ligar</label>
                <select className='dddDestino' >
                    {selectValues.map((value) => {
                        return (<option name='dddD' value={value}>{value}</option>)
                    })}
                </select>
                <br />

                <label>Informe seu plano</label>
                <select className='plano'>
                    <option name='plano' value='30.0' selected>Fale Mais 30</option>
                    <option name='plano' value='60.0' >Fale Mais 60</option>
                    <option name='plano' value='120.0' >Fale Mais 120</option>
                    <option name='plano' value='nenhum'>Não tenho plano</option>

                </select>
                <br />

                <label>Informe a duração da chamada em minutos</label>
                <input placeholder='ex: 30' type='number' id='minutos' />
                <button onClick={calculaValores}>Calcular</button>
            </div>
            {/* <Table minutos={minutos} dddOrigem={dddOrigem} dddDestino={dddDestino} plano={plano} /> */}
            <div className='resultados'>
                <table>
                    <tr>
                        <th>Com Fale Mais</th>
                        <th>Sem Fale Mais</th>
                    </tr>
                    <tr>
                        <td>R${ligacao.comPlano}</td>
                        <td>R${ligacao.semPlano}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Home