"use strict";

let palabras = [
  ["atlantico", "Un oceano"],
  ["ordenador", "Una maquina"],
  ["laurel", "Un arbol"],
  ["plaza", "Espacio publico"],
  ["rueda", "Gran invento"],
  ["cereza", "Una fruta"],
  ["petanca", "Un juego"],
  ["higuera", "Un arbol"],
  ["everest", "Un monte"],
  ["relampago", "Antecede al trueno"],
  ["jirafa", "Un animal"],
  ["luxemburgo", "Un pais"],
  ["uruguay", "Un pais"],
  ["ilustracion", "Representacion grafica"],
  ["excursion", "Actividad en la naturaleza"],
  ["empanadilla", "De la panaderia"],
  ["pastel", "De la pasteleria"],
  ["colegio", "Lugar para estudiar"],
  ["carrera", "Competicion"],
  ["mermelada", "Confitura"],
];
// Palabra a averiguar
let palabra = "";
// Nº aleatorio
let numeroAleatorio;
// Palabra oculta
let oculta = [];
// Elemento html de la palabra
let hueco = document.getElementById("palabraOculta");
// Botones de letras
let buttons = document.getElementsByClassName("letra");

let intentos = 6;
// Imagen ahorcado
const imagen = id("imagen0");
// funcion buscar por id
function id(str) {
  return document.getElementById(str);
}

const elementoÑ = String.fromCharCode(209).toUpperCase();

// Escoger palabra al azar
function generaPalabra() {
  numeroAleatorio = +(Math.random() * (palabras.length - 1)).toFixed(0);
  palabra = palabras[numeroAleatorio][0].toUpperCase();
}
// reemplazar palabra por guiones
function pintarGuiones(num) {
  for (let i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

// Generar teclado
function generaABC(a, z) {
  id("abcdario").innerHTML = "";
  let i = a.charCodeAt(0),
    j = z.charCodeAt(0);
  let letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    id(
      "abcdario"
    ).innerHTML += `<button value='${letra}' onclick='intento("${letra}")' class='letra' id='${letra}'> ${letra} </button>`;
    if (i == 110) {
      id(
        "abcdario"
      ).innerHTML += `<button value='${elementoÑ}' onclick='intento("${elementoÑ}")' class='letra' id='${elementoÑ}'> ${elementoÑ} </button>`;
    }
  }
}

// Resertear el juego
function handleReset() {
  imagen.src = "img/img7.png";
  location.reload();
  id("comenzarJuego").disabled = true;
}

// Comprobar si se ha completado la palabra o no y avisar al usuario con un mensaje
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    id(
      "winGameOverImg"
    ).innerHTML += `<img src="./img/win.png" class="winImg" alt="imagen de victoria">`;
    setTimeout(() => {
      id("winGameOverImg").innerHTML = "";
    }, 4000);

    id("comenzarJuego").disabled = false
    id("comenzarJuego").innerHTML = "Empezar";
    id("pista").disabled = true;
    id("comenzarJuego").addEventListener("click", handleReset);
  } else if (intentos == 0) {
    id(
      "winGameOverImg"
    ).innerHTML = `<img src="./img/gameOver.png" class="winImg" alt="imagen de victoria">`;
    id("mostrarPalabra").innerHTML = `tu palabra era ${palabra}`;
    setTimeout(() => {
      id("winGameOverImg").innerHTML = "";
      id("mostrarPalabra").innerHTML = "";
    }, 4000);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      id("pista").disabled = true;
      id("comenzarJuego").disabled = false
      id("comenzarJuego").innerHTML = "Empezar";
      id("comenzarJuego").addEventListener("click", handleReset);
    }
  }
}

// chequear si acerto o fallo en la palabra
function intento(letra) {
  id(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
  } else {
    intentos--;
    const source = `img/img${intentos + 1}.png`;
    imagen.src = source;
    if (id("turnos")) {
      id("turnos").innerHTML = intentos;
    }
  }
  compruebaFin();
}
// genera una pista por cinco segundos
function pista() {
  id("huecoPista").innerHTML = palabras[numeroAleatorio][1];
  setTimeout(function () {
    id("huecoPista").innerHTML = "";
  }, 5000);
}

id("pista").addEventListener("click", pista);
// funcion para iniciar los componentes del juego
function inicio() {
  generaPalabra();
  id("comenzarJuego").disabled = true
  pintarGuiones(palabra.length);
  generaABC("a", "z");
  intentos = 6;
  if (id("turnos")) {
    id("turnos").innerHTML = intentos;
  }
}

// Iniciar el juego al refrescar la pagina
window.addEventListener("onload", inicio());
