import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './css/TablaPosiciones.css'

const TablaPosiciones = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;
    const LEAGUE = import.meta.env.VITE_LEAGUE;

    const [liga, setLiga] = useState([]);
    const [logo, setLogo] = useState([]);

    useEffect(() => {
        const getEquipos = async () => {
            try {
                let URL_Logo = `${API}/?met=Leagues&APIkey=${KEY}`;
                let URL = `${API}/?met=Standings&leagueId=${LEAGUE}&APIkey=${KEY}`;
                const respuesta = await axios.get(URL);
                const respuestaLogo = await axios.get(URL_Logo);
                console.log("Respuesta API: ", respuesta.data);

                setLiga(respuesta.data.result.total);
                setLogo(respuestaLogo.data);
                console.log("Respuesta Logo: ", respuestaLogo);
            } catch (error) {
                console.error("ERROR ---> ", error);
            }
        };
        getEquipos();
    }, []);

    if (!liga || liga.length === 0) {
        return <div>Error. Recargue la página</div>;
    }

    return (
        <div className='container'>
            <img src={logo.result[0].league_logo} alt={logo.result[0].league_name} />
            <p>Liga: {logo.result[0].league_name}</p>
            <img src={logo.result[0].country_logo} alt={logo.result[0].country_name} />
            <p>País: {logo.result[0].country_name}</p>
            {/* <Table striped bordered hover className="custom-table"> */}
            {/* Sin la tabla de React puedo darle color aparte a la tabla */}
            <table className="custom-table">
                <thead>
                    <tr>
                        <th className="custom-th">
                            <div className='imagenLiga'>
                                <img src={logo.result[0].league_logo} alt={logo.result[0].league_name} />
                                {/* <p>{logo.result[0].league_name}</p> */}
                            </div>
                        </th>
                        <th className="text-center">Equipos</th>
                        <th className="text-center">Partidos</th>
                        <th className="text-center">Puntos</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {liga.map((equipo, index) => (
                        <tr key={index}>
                            {/* <td>{equipo.standing_place}</td> */}
                            <td className={equipo.standing_place === 1 ? 'bg-green' : (equipo.standing_place >= 16 && equipo.standing_place <= 18 ? 'bg-red' : '')}>
                                {equipo.standing_place}
                            </td>
                            <td className='custom-td w-50'>
                                <div className='imagenEquipo'>
                                    <img src={equipo.team_logo} alt={equipo.standing_team} />
                                    {equipo.standing_team}
                                </div>
                            </td>
                            <td>{equipo.standing_P}</td>
                            <td>{equipo.standing_PTS}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaPosiciones;