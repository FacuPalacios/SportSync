// CalendarioPartidos.jsx
import './css/CalendarioPartidos.css'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CalendarioPartidos = () => {
    const API = import.meta.env.VITE_API;
    const KEY = import.meta.env.VITE_KEY;

    // Fecha actual
    const currentDate = new Date().toISOString().slice(0, 10);

    // Fecha inicio hace 14 días (en milisegundos)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const startDate = fourteenDaysAgo.toISOString().slice(0, 10);

    // Estados para las fechas y los partidos
    const [calendario, setCalendario] = useState([]);
    const [fechaInicio, setFechaInicio] = useState(startDate);
    const [fechaFin, setFechaFin] = useState(currentDate);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

    // Referencia al contenedor de tarjetas para el desplazamiento horizontal
    const tarjetasContainerRef = useRef(null);
    // Estado para la posición de inicio del desplazamiento
    const [startX, setStartX] = useState(null);
    // Estado para la posición actual del desplazamiento
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    // Estado para controlar si se está realizando un desplazamiento
    const [isScrolling, setIsScrolling] = useState(false);

    // Estado para almacenar el partido seleccionado
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);

    // Estado para controlar la visibilidad del modal
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchCalendario(startDate, currentDate); // Llamamos a fetchCalendario() al inicio con fechas por defecto
    }, []);

    const fetchCalendario = async (inicio, fin) => {
        try {
            setLoading(true); // Activamos el estado de carga

            const URL = `${API}/?met=Fixtures&APIkey=${KEY}&from=${inicio}&to=${fin}`;
            const respuesta = await axios.get(URL);

            setCalendario(respuesta.data.result);
            setLoading(false); // Desactivamos el estado de carga
            console.log("Calendario: ", respuesta);
        } catch (error) {
            console.error("ERROR ---> ", error);
            setLoading(false); // En caso de error, también desactivamos el estado de carga
        }
    };

    const handleDateChange = () => {
        fetchCalendario(fechaInicio, fechaFin); // Llamamos a fetchCalendario() con las nuevas fechas
    };

    // Manejador para iniciar el desplazamiento
    const handleMouseDown = (e) => {
        setIsScrolling(true);
        setStartX(e.clientX - tarjetasContainerRef.current.offsetLeft);
        setStartScrollLeft(tarjetasContainerRef.current.scrollLeft);
    };

    // Manejador para mover el mouse durante el desplazamiento
    const handleMouseMove = (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.clientX - tarjetasContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Ajuste de velocidad del desplazamiento
        tarjetasContainerRef.current.scrollLeft = startScrollLeft - walk;
    };

    // Manejador para detener el desplazamiento
    const handleMouseUp = () => {
        setIsScrolling(false);
    };

    // Manejador para mostrar modal con detalles del partido seleccionado
    const handleCardClick = (partido) => {
        setPartidoSeleccionado(partido);
        setModalVisible(true); // Abrir el modal al hacer clic en una tarjeta
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setModalVisible(false);
    };

    // Función para cerrar el modal con la tecla Escape
    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    // Verificar si estamos cargando
    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="calendario" onKeyDown={handleKeyPress}>
            <div className="filtro-fechas">
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
                <button onClick={handleDateChange}>Filtrar</button>
            </div>
            <div
                ref={tarjetasContainerRef}
                className="tarjetas-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="tarjetas-list">
                    {calendario && calendario.length > 0 ? (
                        calendario.map((partido, index) => (
                            <div key={index} className="partido" onClick={() => handleCardClick(partido)}>
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
                        ))
                    ) : (
                        <p>No hay partidos disponibles</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            <div className="modal" style={{ display: modalVisible ? 'block' : 'none' }} onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <span className="close-modal" onClick={closeModal}>&times;</span>
                    {partidoSeleccionado && (
                        <>
                            <h2>Detalles del Partido</h2>
                            <p>Resultado: {partidoSeleccionado.event_final_result}</p>
                            <p>Equipo Local: {partidoSeleccionado.event_home_team}</p>
                            <p>Equipo Visitante: {partidoSeleccionado.event_away_team}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarioPartidos;
