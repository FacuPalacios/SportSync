import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import marcador from "../../../public/image/6.jpg"
import '../css/Home.css'
import ResultadosDestacados from '../sections/ResultadosDestacados';
import ResultadosArgentina from '../sections/ResultadosArgentina';
import TablaPosiciones from '../sections/TablaPosiciones';

const Home = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

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
            <div>
                <TablaPosiciones />
            </div>
        </>
    );
};

export default Home;