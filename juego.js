document.getElementById('configuracion-juego').addEventListener('submit', function (event) { //escucha el evento submit y ejecuta la funcion event
    event.preventDefault();//hace que no recarge la pagina

    var numPartidas = 0;
    var modoJuego = '';
    modoJuego = document.getElementById('modo-juego').value;
    numPartidas = parseInt(document.getElementById('num-partidas').value);
  
    iniciarJuego(modoJuego, numPartidas);
});
  
function iniciarJuego(modo, numPartidas) {
    document.getElementById('menu-inicial').style.display = 'none';
    document.getElementById('juego').style.display = 'grid';
    document.getElementById('piedra-papel-tijera').style.display = 'grid';

    let intentos = 0;
    let puntosJugador1 = 0;
    let puntosJugador2 = 0;
    
    
    document.querySelector('.container-puntaje-player1 .puntaje').innerText = puntosJugador1;
    document.querySelector('.container-puntaje-player2 .puntaje').innerText = puntosJugador2;

    document.querySelector('.container-intentos').innerText = `INTENTO ${intentos} DE ${numPartidas}`;

    const opciones = ['piedra', 'papel', 'tijera'];
    const imagenes = {
        piedra: 'assets/piedra.png',
        papel: 'assets/papel.png',
        tijera: 'assets/tijera.png',
        interrogacion: 'assets/interrogacion.png'
    };

    // Establecer imágenes predeterminadas
    document.getElementById('jugada-jugador1').querySelector('img').src = imagenes['interrogacion'];
    document.getElementById('jugada-jugador2').querySelector('img').src = imagenes['interrogacion'];

    let eleccionJugador1 = '';
    let eleccionJugador2 = '';

    // Función para manejar la elección del jugador 1
    document.querySelectorAll('.piedra-papel-tijera div').forEach(div => { //recorre todos los elementos con la clase .piedra-papel-tijera
        div.addEventListener('click', function () {
            if (intentos < numPartidas) {
                console.log("intento: " + intentos);
                console.log("numPartidas: " + numPartidas);
                if (!eleccionJugador1) {
                    eleccionJugador1 = this.id;
                    document.getElementById('jugada-jugador1').querySelector('img').src = imagenes[eleccionJugador1];
                    
                    if (modo === 'maquina') {
                        eleccionJugador2 = opciones[Math.floor(Math.random() * 3)];
                        document.getElementById('jugada-jugador2').querySelector('img').src = imagenes[eleccionJugador2];
                        mostrarResultado(eleccionJugador1, eleccionJugador2);
                        eleccionJugador1 = '';
                        eleccionJugador2 = '';
                        intentos++;
                        document.querySelector('.container-intentos').innerText = `INTENTO ${intentos} DE ${numPartidas}`;
                        if (intentos == numPartidas) {
                            finalizarJuego(puntosJugador1, puntosJugador2);
                            document.getElementById('volver-menu').style.display = 'block';
                        } 
                    } else {
                        document.querySelector('.container-intentos').innerText = 'Jugador 2, haz tu elección';
                    }
                } else if (modo === 'persona' && !eleccionJugador2) {
                    eleccionJugador2 = this.id;
                    document.getElementById('jugada-jugador2').querySelector('img').src = imagenes[eleccionJugador2];
                    mostrarResultado(eleccionJugador1, eleccionJugador2);
                    eleccionJugador1 = '';
                    eleccionJugador2 = '';
                    intentos++;
                    document.querySelector('.container-intentos').innerText = `INTENTO ${intentos} DE ${numPartidas}`;
                    if (intentos == numPartidas) {
                        finalizarJuego(puntosJugador1, puntosJugador2);
                        document.getElementById('volver-menu').style.display = 'block';
                    } else {
                    }
                }
            }
        });
    });

    function mostrarResultado(eleccion1, eleccion2) {
        let resultado = '';
        if (eleccion1 === eleccion2) {
            resultado = 'Empate';
        } else if (
            (eleccion1 === 'piedra' && eleccion2 === 'tijera') ||
            (eleccion1 === 'papel' && eleccion2 === 'piedra') ||
            (eleccion1 === 'tijera' && eleccion2 === 'papel')
        ) {
            resultado = 'Jugador 1 Gana';
            puntosJugador1++;
        } else {
            resultado = 'Jugador 2 Gana';
            puntosJugador2++;
        }

        document.getElementById('resultado').innerText = resultado;
        document.querySelector('.container-puntaje-player1 .puntaje').innerText = puntosJugador1;
        document.querySelector('.container-puntaje-player2 .puntaje').innerText = puntosJugador2;
    }

    document.getElementById('volver-menu').addEventListener('click', function() {
        // intentos = 0;
        // puntosJugador1 = 0;
        // puntosJugador2 = 0;
        // document.getElementById('menu-inicial').style.display = 'block';
        // document.getElementById('juego').style.display = 'none';
        // document.getElementById('piedra-papel-tijera').style.display = 'none';
        // document.getElementById('volver-menu').style.display = 'none';
        // document.getElementById('resultado').innerText = '';
        // document.getElementById('resultado-final').innerText = '';
        // document.getElementById('jugada-jugador1').querySelector('img').src = '';
        // document.getElementById('jugada-jugador2').querySelector('img').src = '';
        location.reload();
        
    });
}

function finalizarJuego(puntos1, puntos2) {
    let resultado = '';
    if (puntos1 > puntos2) {
        resultado = 'Jugador 1 es el ganador!';
    } else if (puntos2 > puntos1) {
        resultado = 'Jugador 2 es el ganador!';
    } else {
        resultado = 'Es un empate!';
    }
    document.getElementById('resultado').innerText = '';
    document.getElementById('resultado-final').innerText = resultado;
}
