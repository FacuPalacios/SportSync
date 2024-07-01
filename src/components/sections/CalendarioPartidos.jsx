import './css/CalendarioPartidos.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalendarioPartidos = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    const [calendario, setCalendario] = useState([]);

    useEffect(() => {
        const getCalendario = async () => {
            try {
                let URL = `${API}/?met=Fixtures&APIkey=${KEY}&from=2024-01-01&to=2024-01-10`;

                const respuesta = await axios.get(URL);

                setCalendario(respuesta.data.result);
                console.log("Calendario: ", respuesta);
            } catch (error) {
                console.error("ERROR ---> ", error);
            }
        };

        getCalendario();
    }, []);

    return (
        <div className="calendario">
            {calendario.map((partido, index) => (
                <div key={index} className="partido">
                    <div className="equipo-local">
                        <img src={partido.home_team_logo} alt={partido.event_home_team} />
                        <p>{partido.event_home_team}</p>
                    </div>
                    <div className="resultado">
                        <p>{partido.event_final_result}</p>
                    </div>
                    <div className="equipo-visitante">
                        <img src={partido.away_team_logo} alt={partido.event_away_team} />
                        <p>{partido.event_away_team}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalendarioPartidos;