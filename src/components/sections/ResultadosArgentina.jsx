import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ResultadosArgentina.css'

const ResultadosArgentina = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    const [equipo1, setEquipo1] = useState({});
    const [equipo2, setEquipo2] = useState({});

    useEffect(() => {
        const getEquipos = async () => {
            try {
                const idEquipo1 = Math.floor(Math.random() * (1008 - 879 + 1)) + 879;
                //Después tengo que hacer con la PRUEBA para incluir equipos Arg en Libertadores
                let idEquipo2 = Math.floor(Math.random() * (1008 - 879 + 1)) + 879;
                while (idEquipo2 === idEquipo1) {
                    idEquipo2 = Math.floor(Math.random() * (1008 - 879 + 1)) + 879;
                }

                let URL1 = `${API}/?&met=Teams&teamId=${idEquipo1}&APIkey=${KEY}`;
                let URL2 = `${API}/?&met=Teams&teamId=${idEquipo2}&APIkey=${KEY}`;

                const respuesta1 = await axios.get(URL1);
                const respuesta2 = await axios.get(URL2);

                setEquipo1(respuesta1.data);
                setEquipo2(respuesta2.data);
            } catch (error) {
                console.error("ERROR ---> ", error);
            }
        };

        getEquipos();
    }, []);

    if (!equipo1 || !equipo2 || !equipo1.result || !equipo2.result || equipo1.result.length === 0 || equipo2.result.length === 0) {
        return <div>Error. Recargue la página</div>;
    }


    // PRUEBA INCLUIR LIGA ARG + EQUIPOS LIBERTADORES
    const generarNumeroRandom = () => {
        //const numerosRango = [879, 880, 881, /* ... hasta ... */ 1008];
        /* OTRA FORMA DE HACER numerosRango:
        const numerosRango = [];
        const inicio = 879;
        const fin = 1008;
        for (let i = inicio; i <= fin; i++) {
            numerosRango.push(i);
        }*/
        const numerosRango = Array.from({ length: 1008 - 879 + 1 }, (_, index) => 879 + index);
        const numerosExtras = [405, 517];

        // Concatenar los números del rango y los números extras
        const todosLosNumeros = [...numerosRango, ...numerosExtras];

        // Elegir aleatoriamente un número del array combinado
        const numeroAleatorio = todosLosNumeros[Math.floor(Math.random() * todosLosNumeros.length)];
        
        return numeroAleatorio;
    };

    const numeroRandom = generarNumeroRandom();


    return (
        <div className='contenedor'>
            {/* Equipo 1 */}
            <div className="equipo">
                <img src={equipo1.result[0].team_logo} alt={equipo1.result[0].team_name} />
                <p>{equipo1.result[0].team_name}</p>
            </div>

            <p id="versus">VS</p>

            {/* Equipo 2 */}
            <div className="equipo">
                <img src={equipo2.result[0].team_logo} alt={equipo2.result[0].team_name} />
                <p>{equipo2.result[0].team_name}</p>
            </div>
        </div>
    );
};

export default ResultadosArgentina;