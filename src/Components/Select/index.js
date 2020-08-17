import React, { useState, useEffect } from 'react';

function Select(props) {


    return (
        <div>
            <label>Informe seu plano</label>
            <select className='plano'>
                <option name='plano' value='30.0' selected>Fale Mais 30</option>
                <option name='plano' value='60.0' >Fale Mais 60</option>
                <option name='plano' value='120.0' >Fale Mais 120</option>
                <option name='plano' value='nenhum'>Não tenho plano</option>
            </select>
            <br />
        </div>
    )
}

export default Select