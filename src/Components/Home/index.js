import React, { useState } from 'react';
import './Home.css'


function Home() {

    const [ligacao, setLigacao] = useState({})
    const [selectValues, setSelectValues] = useState(['016', '017', '018'])

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



        var valorTarifa = calculaValorTarifa(valorDddOrigem, valorDddDestino)
        calculaValorLigacao(tempoMinutos, valorTarifa, valorPlano)
    }




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
                else if (dddDestino === '011')
                    valorTarifa = 1
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

    async function calculaValorLigacao(minutos, tarifa, plano) {
        var valorMinutos = parseFloat(minutos)
        var valorPlano = parseFloat(plano)
        var valorLigacao = {
            comPlano: 0.00,
            semPlano: 0.00,
            economia: 0.00
        }

        if (plano === 'nenhum') {
            valorLigacao.comPlano = (valorMinutos * tarifa).toFixed(2)
            valorLigacao.semPlano = (valorMinutos * tarifa).toFixed(2)
        }
        else {
            valorLigacao.semPlano = (valorMinutos * tarifa).toFixed(2)
            if (valorMinutos <= valorPlano)
                valorLigacao.comPlano = 0.00
            else
                valorLigacao.comPlano = ((valorMinutos - valorPlano) * (tarifa * 1.1)).toFixed(2)
        }

        valorLigacao.economia = (valorLigacao.semPlano - valorLigacao.comPlano).toFixed(2)

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
            setSelectValues(['016', '017', '018'])
        console.log(selectValues)
    }


    return (
        <>

            <p className='texto'>Aqui você pode calcular o valor das suas ligações e descobrir o quanto vai economizar com nossos planos.</p>
            <div className='selectionContainer'>
                <div className='containerDDDorigem' >
                    <label className='labelDDDOrigem'>Informe o seu DDD</label>
                    <select className='dddOrigem' onChange={valueSelectChange}>
                        <option name='dddO' value='011' selected>011</option>
                        <option name='dddO' value='016'>016</option>
                        <option name='dddO' value='017'>017</option>
                        <option name='dddO' value='018'>018</option>
                    </select>
                </div>
                <br />
                <div className='containerDDDdestino'>
                    <label className='labelDDDDestino'>Informe o DDD que você deseja ligar</label>
                    <select className='dddDestino' >
                        {selectValues.map((value) => {
                            return (<option name='dddD' value={value}>{value}</option>)
                        })}
                    </select>
                </div>
                <br />
                <div className='containerPlano'>
                    <label className='labelPlano'>Selecione seu plano</label>
                    <select className='plano'>
                        <option name='plano' value='30.0' selected>Fale Mais 30</option>
                        <option name='plano' value='60.0' >Fale Mais 60</option>
                        <option name='plano' value='120.0' >Fale Mais 120</option>
                        <option name='plano' value='nenhum'>Não tenho plano</option>
                    </select>
                </div>
                <br />
                <div className='containerMinutos'>
                    <label>Informe a duração da chamada em minutos</label>
                    <input placeholder='ex: 30' type='number' id='minutos' />
                </div>
                <button className='botaoCalcular' onClick={calculaValores}>Calcular</button>
            </div>
            <div className='resultados'>
                <table>
                    <thead>
                        <tr className='titulos'>
                            <th>Com Fale Mais</th>
                            <th>Sem Fale Mais</th>
                            <th>Você economiza</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='linhas'>
                            <td>R${ligacao.comPlano}</td>
                            <td>R${ligacao.semPlano}</td>
                            <td>R${ligacao.economia}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home