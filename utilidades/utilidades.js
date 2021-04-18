"use strict";

let numeroCartasEnviadas = 0;

let jugador = {
    cartas: [],
    puntuacion: 0,
    dinero: 100
};

let banca = {
    cartas: [],
    puntuacion: 0
};

const tablero = {
        tableroArr: [],
        inicializar: function() {
            let palosArray, valorArray, p, v;

            palosArray = ["diamantes","corazones","treboles","picas"];
            valorArray = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

            for(p = 0; p < palosArray.length; p += 1){
                for(v = 0; v < valorArray.length; v += 1){
                    this.tableroArr[p * 13 + v] = {
                        valor: valorArray[v],
                        palo: palosArray[p]
                    };
                }
            }
    }, // cerrar funcion inicializar
    barajar: function(){
        let temporal, indice, aleatorio;
            for(indice = 0; indice < this.tableroArr.length; indice += 1){
                aleatorio = Math.floor(Math.random() * this.tableroArr.length);
                temporal = this.tableroArr[indice];
                this.tableroArr[indice] = this.tableroArr[aleatorio];
                this.tableroArr[aleatorio] = temporal;
            }
    }
};

tablero.inicializar();
tablero.barajar();

console.log("Array tablero: ", tablero.tableroArr);

function obtenerPuntuacion(a){
    let arrayCartas = [],
    suma = 0,
    i = 0,
    cuentaAs = 0;
    arrayCartas = a;

    for(i; i < arrayCartas.length; i += 1){
        if(arrayCartas[i].valor === "J" || arrayCartas[i].valor === "Q" || arrayCartas[i].valor === "K"){
            suma += 10;
        }
        else if(arrayCartas[i].valor === "A"){
            suma += 11;
            cuentaAs += 1;
        }
        else{
            suma += arrayCartas[i].valor;
        }
    }
        
    while (cuentaAs > 0 && suma > 21){
            suma -= 10;
            cuentaAs -= 1;
    }
    return suma;
}

function partida(resultado) {
    var apuestaJugador = document.getElementById("apuesta").valueAsNumber;
    if (resultado === "ganaste") {
        jugador.dinero += apuestaJugador;
    }
    if (resultado === "perdiste") {
        jugador.dinero -= apuestaJugador;
    }
}

function resetearJuego(){
    numeroCartasEnviadas = 0;
    jugador.cartas = [];
    banca.cartas = [];
    jugador.puntuacion = [];
    banca.puntuacion = [];
    tablero.inicializar();
    tablero.barajar();
    document.getElementById("mas-cartas").disabled = true;
    document.getElementById("plantarse").disabled = true;
    document.getElementById("apuesta").disabled = false;
    document.getElementById("apuesta").max = jugador.dinero;
    document.getElementById("boton-nueva-partida").disabled = false;
}

function mostrarCartasBanca(){
    let cartas_borrosas = document.getElementsByClassName('carta-borrosa');

    [].forEach.call(cartas_borrosas, function (borrosa) {
       /* Mobile First imagenes: Seteado como ipad mini, se pueden añadir tantos condicionales como se desee */
          borrosa.classList.remove("carta-borrosa");
    })
        /*for(var i = 0; i < cartas_borrosas.length; i++){
            cartas_borrosas[i].classList.remove("carta-borrosa");
        }*/
   
}

function terminarJuego(){
   

    if (jugador.puntuacion === 21) {
        document.getElementById("resultado").innerHTML = "¡Fantástico! Has conseguido un blackjack." + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("ganaste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
       
    }
    if (jugador.puntuacion > 21) {
        document.getElementById("resultado").innerHTML = "¡Has pasado de 21! La banca gana" + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("perdiste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
       
    }
    if (banca.puntuacion === 21) {
        document.getElementById("resultado").innerHTML = "Has perdido. La banca tiene un blackjack" + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("perdiste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
        
    }
    if (banca.puntuacion > 21) {
        document.getElementById("resultado").innerHTML = "La banca se ha pasado de los 21 ¡Tu ganas!" + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("ganaste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
        
    }
    if (banca.puntuacion >= 17 && jugador.puntuacion > banca.puntuacion && jugador.puntuacion < 21) {
        document.getElementById("resultado").innerHTML = "¡Has ganado! Tu puntuación supera a la de la banca." + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("ganaste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
       
    }
    if (banca.puntuacion >= 17 && jugador.puntuacion < banca.puntuacion && banca.puntuacion < 21) {
        document.getElementById("resultado").innerHTML = "¡Perdiste! La banca te supera en puntuación" + "<br>" + "pulsa en jugar si quieres otra partida";
        partida("perdiste");
        document.getElementById("dinero-jugador").innerHTML = "Tu dinero: $" + jugador.dinero;
        resetearJuego();
        
    }
    if (banca.puntuacion >= 17 && jugador.puntuacion === banca.puntuacion && banca.puntuacion < 21) {
        document.getElementById("resultado").innerHTML = "¡Empate!" + "<br>" + "pulsa en jugar si quieres otra partida";
        resetearJuego();
        
    }
    if (jugador.dinero <= 0) {
        document.getElementById("boton-nueva-partida").disabled = true;
        document.getElementById("mas-cartas").disabled = true;
        document.getElementById("plantarse").disabled = true;
        document.getElementById("resultado").innerHTML = "¡Has perdido!" + "<br>" + "Estás sin dinero" + "<br>" + "<input type='button' value='Comenzar juego' onclick='location.reload();'/>";
    }
}

function cartasBanca(){
    banca.cartas.push(tablero.tableroArr[numeroCartasEnviadas]);
    banca.puntuacion = obtenerPuntuacion(banca.cartas);
    //document.getElementById("cartas-banca").innerHTML = "Cartas Banca: " + JSON.stringify(banca.cartas);
    document.getElementById("puntuacion-banca").innerHTML = "<h3>Puntuacion Banca:</h3> <h2>" + banca.puntuacion+"</h2>";
    let cartasBanca = banca.cartas;
    document.getElementById("cartas-banca").innerHTML = "";

    for(var i = 0; i < cartasBanca.length; i++){
        if(cartasBanca[i]){
            console.log(`Carta ${i}: `,  `img/${cartasBanca[i].palo}_${cartasBanca[i].valor}.svg` );
            let cartaFisica = document.createElement("div");
            //cartaFisica.classList.add("carta-borrosa");
            cartaFisica.classList.add("carta-fisica");
            cartaFisica.style.backgroundImage = `url('img/${cartasBanca[i].palo}_${cartasBanca[i].valor}.svg')`;
            document.getElementById("cartas-banca").append(cartaFisica);
        }
    }

    numeroCartasEnviadas += 1;
}

function nuevaPartida(){
    document.getElementById("boton-nueva-partida").disabled = true;
    document.getElementById("mas-cartas").disabled = false;
    document.getElementById("plantarse").disabled = false;
    document.getElementById("apuesta").disabled = true;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("cartas-banca").innerHTML = "";
    document.getElementById("cartas-jugador").innerHTML = "";
    nuevaCarta();
    nuevaCarta();
    cartasBanca();
    terminarJuego();
}

function nuevaCarta(){
    jugador.cartas.push(tablero.tableroArr[numeroCartasEnviadas]);
    jugador.puntuacion = obtenerPuntuacion(jugador.cartas);
    //document.getElementById("cartas-jugador").innerHTML = "Cartas jugador: " + JSON.stringify(jugador.cartas);
    document.getElementById("puntuacion-jugador").innerHTML = "<h3>Puntuacion jugador:</h3> <h2>" + jugador.puntuacion+"</h2>";
    let cartasEnJuego = jugador.cartas;
    /*console.log("Valores", cartasEnJuego);
    console.log("Total cartas", cartasEnJuego.length);
    console.log("Carta 1: ",  `img/${cartasEnJuego[0].palo}_${cartasEnJuego[0].valor}.svg` );*/
    document.getElementById("cartas-jugador").innerHTML = "";
    for(var i = 0; i < cartasEnJuego.length; i++){
        if(cartasEnJuego[i]){
            console.log(`Carta ${i}: `,  `img/${cartasEnJuego[i].palo}_${cartasEnJuego[i].valor}.svg` );
            let cartaFisica = document.createElement("div");
            cartaFisica.classList.add("carta-fisica");
            cartaFisica.style.backgroundImage = `url('img/${cartasEnJuego[i].palo}_${cartasEnJuego[i].valor}.svg')`;
            document.getElementById("cartas-jugador").append(cartaFisica);
        }
    }
    
    numeroCartasEnviadas += 1;
    if (numeroCartasEnviadas >= 2) {
        terminarJuego();
    }
}

function finalizar(){
    while(banca.puntuacion < 17){
        cartasBanca();
    }
    terminarJuego();
}

/*module.exports.numeroCartasEnviadas = numeroCartasEnviadas;
module.exports.jugador = jugador;
module.exports.tablero = tablero;
module.exports.banca = banca;*/