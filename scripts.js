//import { createRequire } from './module';
//const Tablero = import {tablero}  from './utilidades/utilidades.js';
//const Jugador = import {jugador}  from './utilidades/utilidades.js';
//const tablero = require("./utilidades");
//const Tablero = require("./utilidades/utilidades");

//import {tablero} from './utilidades';

//import { tablero} from './utilidades/utilidades.js';

const Tablero = require("./utilidades/utilidades");


console.log("Tablero", Tablero);

console.log("Jugador", Tablero.jugador);

Tablero.tablero.inicializar();
Tablero.tablero.barajar();

console.log("Baraja", Tablero.tablero.tableroArr);
console.log("Aleatorio", Tablero.tablero.tableroArr);