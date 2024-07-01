import './css/Goleadores.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Goleadores = () => {
    /*const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;
    let URL = `${API}/?met=Topscorers&leagueId=207&APIkey=${KEY}`;*/

    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    const [jugador, setJugador] = useState([]);

    useEffect(() => {
        const getJugador = async () => {
            try {
                let URL = `${API}/?met=Topscorers&leagueId=207&APIkey=${KEY}`;

                const respuesta = await axios.get(URL);

                setJugador(respuesta.data.result);
                console.log("Jugadores: ", respuesta);
            } catch (error) {
                console.error("ERROR ---> ", error);
            }
        };

        getJugador();
    }, []);

    if (!Array.isArray(jugador) || jugador.length === 0) {
        return <div>Error. Recargue la página</div>;
    }
    return (
        <div className='container'>
            <div className="equipo">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th className="custom-th">
                                <div className='text-center'>
                                    {/* <img src={logo.result[0].league_logo} alt={logo.result[0].league_name} /> */}
                                    {/* <p>{logo.result[0].league_name}</p> */}
                                    Posición
                                </div>
                            </th>
                            <th className="text-center">Jugador</th>
                            <th className="text-center">Goles</th>
                            <th className="text-center">Equipo</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {jugador.map((player, index) => (
                            <tr key={index}>
                                <td>{player.player_place}</td>
                                <td>{player.player_name}</td>
                                <td>{player.goals}</td>
                                <td>{player.team_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Goleadores;