import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ResultadosDestacados.css'

const ResultadosDestacados = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    const [equipo1, setEquipo1] = useState({});
    const [equipo2, setEquipo2] = useState({});

    useEffect(() => {
        const getEquipos = async () => {
            try {
                const idEquipo1 = Math.floor(Math.random() * 3000) + 1;
                let idEquipo2 = Math.floor(Math.random() * 3000) + 1;
                while (idEquipo2 === idEquipo1) {
                    idEquipo2 = Math.floor(Math.random() * 3000) + 1;
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
        return <div>No se han cargado los equipos</div>;
    }

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

export default ResultadosDestacados;