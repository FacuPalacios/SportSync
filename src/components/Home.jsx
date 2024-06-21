import './css/Home.css'

const Home = () => {
    let image = document.querySelector("#img1");
    let nombre = document.querySelector("#nombre");
    let image2 = document.querySelector("#img2");
    let nombre2 = document.querySelector("#nombre2");

    function equipo1(logo, nombreEquipo) {
        image.setAttribute("src", logo);
        nombre.innerHTML = nombreEquipo;
    }
    function equipo2(logo, nombreEquipo) {
        image2.setAttribute("src", logo);
        nombre2.innerHTML = nombreEquipo;
    }

    let key = "b70621feef65cd8d72c761b4b4c5dc8064788a0b29eec5a32bf8c7c2f75d475a";
    function mostrarEquipos(idEquipo, fucionEquipo) {

        // fetch(`https://allsportsapi.com/api/football/?&met=Teams&teamId=${idEquipo}&APIkey=${key}`)
        fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=${idEquipo}&APIkey=${key}`)
            .then(response => response.json())
            .then((equipos) => {
                fucionEquipo(
                    equipos.result[0].team_logo,
                    equipos.result[0].team_name)
            });
    }

    mostrarEquipos(2627, equipo1);

    mostrarEquipos(2621, equipo2);

    return (
        <div>
            <div className='fondoPrincipal'>
                {/* <img className="d-block w-100" src={fondo} alt="imagen" /> */}
                <h1>SportSync</h1>
                <div class="contenedor">
                    <img src="" alt="" id="img1" />
                    <p id="nombre"></p>
                    <p id="versus">VS</p>
                    <img src="" alt="" id="img2" />
                    <p id="nombre2"></p>
                </div>
            </div>
        </div>
    );
};

export default Home;