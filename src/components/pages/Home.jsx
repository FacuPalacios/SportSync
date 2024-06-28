import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import marcador from "../../../public/image/6.jpg"
import '../css/Home.css'
import ResultadosDestacados from '../sections/ResultadosDestacados';
import ResultadosArgentina from '../sections/ResultadosArgentina';

const Home = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    /*const [equipo1, setEquipo1] = useState({});
    const [equipo2, setEquipo2] = useState({});

    useEffect(() => {
        const getEquipos = async () => {
            try {
                const idEquipo1 = 1000;
                let idEquipo2 = 19999;
                while (idEquipo2 === idEquipo1) {
                    idEquipo2 = Math.floor(Math.random() * 3000) + 1;
                }

                let URL1 = `${API}/?&met=Teams&teamId=${idEquipo1}&APIkey=${KEY}`;
                let URL2 = `${API}/?&met=Teams&teamId=${idEquipo2}&APIkey=${KEY}`;

                const respuesta1 = await axios.get(URL1);
                const respuesta2 = await axios.get(URL2);

                setEquipo1(respuesta1.data);
                setEquipo2(respuesta2.data);

                console.log("equipo1: ", equipo1);
                console.log("equipo2: ", equipo2);
            } catch (error) {
                console.error("ERROR ---> ", error);
            }
        };

        getEquipos();
    }, []);*/

    return (
        <>
            <div>
                <div className='fondoPrincipal cont'>
                    <div className='titulo mt-5'>
                        <h1>SportSync</h1>
                        <h3>Toda la información del deporte en un solo lugar.</h3>
                    </div>
                    <div className='tamanioCarrusel w-100 justify-content-center d-flex'>
                        <Carousel controls={false} className='vh-50 w-75'>
                            <Carousel.Item interval={3000}>
                                <div className="carrusel">
                                    {/* <img className="d-block w-25" src={marcador} alt="imagen" /> */}
                                    <Carousel.Caption>
                                        <div className="contenedorCarrusel">
                                            <ResultadosDestacados />
                                        </div>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item interval={3000}>
                                <div className="carrusel">
                                    {/* <img className="d-block w-25" src={marcador} alt="imagen" /> */}
                                    <Carousel.Caption>
                                        <ResultadosDestacados />
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item interval={3000}>
                                <div className="carrusel">
                                    {/* <img className="d-block w-25" src={marcador} alt="imagen" /> */}
                                    <Carousel.Caption>
                                        <ResultadosDestacados />
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className='colorFondo d-flex'>
                <div className='d-25'>
                    <h3>Resultados</h3>
                </div>
                <div className='d-75'>
                    <h3>Tablas</h3>
                </div>
            </div>
            <div>
                <ResultadosArgentina />
            </div>
        </>
    );
};

export default Home;