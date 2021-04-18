let numeroCartasEnviadas = 0;

let jugador = {
    cartas: [],
    puntuacion: 0,
    dinero: 100
};

let banca = {
    cartas: [],
    puntuacion: 0
}

let tablero = {
        tableroArr: [],
        inicializar: function() {
            let palosArray, valorArray, p, v;

            palosArray = ["diamantes","corazones","treboles","picas"];
            valorArray = [2,3,4,5,6,7,8,9,10,"J","Q","K","A"];

            for(p = 0; p < palosArray.length; p += 1){
                for(v = 0; v < valorArray.length; v += 1){
                    this.tableroArr[s * 13 + v] = {
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