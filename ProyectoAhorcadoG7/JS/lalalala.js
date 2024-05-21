"use strict";
//import './palabras.js';
import { obtener_palabra } from "./palabras.js";

// Palabra a averiguar
let palabras = obtener_palabra();
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

function id(str) {
	return document.getElementById(str);
}

const elementoÑ = String.fromCharCode(209).toUpperCase();

// Escoger palabra al azar
function generaPalabra() {
	numeroAleatorio = +(Math.random() * (palabras.length - 1)).toFixed(0);
	console.log(numeroAleatorio);
	palabra = palabras[numeroAleatorio][0].toUpperCase();
	//console.log(palabra);
}

function pintarGuiones(num) {
	for (let i = 0; i < num; i++) {
		oculta[i] = "_";
	}
	hueco.innerHTML = oculta.join("");
}

// Generar teclado
function obtener_letra(letra) {
	return intento(letra);
}

function generaABC(a, z) {
	id("abcdario").innerHTML = "";
	var i = a.charCodeAt(0),
		j = z.charCodeAt(0);
	var letra = "";
	for (; i <= j; i++) {
		letra = String.fromCharCode(i).toUpperCase();
		let boton = document.createElement('button');
		boton.id = letra;
		boton.className = "letra";
		boton.innerHTML = " " + letra + " ";
		boton.value = letra;
		boton.addEventListener("click", (evt) => intento(letra));
		id("abcdario").appendChild(boton);
	/* 	id(
			"abcdario"
		).innerHTML += `<button value='${letra}' onclick='intento("${letra}")' class='letra' id='${letra}'> ${letra} </button>`; */
		//id("abcdario").addEventListener('click', function(){intento(letra)});
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
}

// Comprobar si se ha completado la palabra o no y avisar al usuario con un mensaje
function compruebaFin() {
	if (oculta.indexOf("_") == -1) {
		id(
			"winGameOverImg"
		).innerHTML += `<img src="./img/win.png" class="winImg" alt="imagen de victoria">`;
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].disabled = true;
		}
		id("comenzarJuego").innerHTML = "Empezar";
		id("comenzarJuego").addEventListener("click", handleReset);
	} else if (intentos == 0) {
		id(
			"winGameOverImg"
		).innerHTML = `<img src="./img/gameOver.png" class="winImg" alt="imagen de victoria">`;
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].disabled = true;
		}
		id("comenzarJuego").innerHTML = "Empezar";
		id("comenzarJuego").addEventListener("click", handleReset);
	}
}

/*Se utiliza en los eventos onClick*/
function intento(letra) {
	document.getElementById(letra).disabled = true;
	if (palabra.indexOf(letra) != -1) {
		for (var i = 0; i < palabra.length; i++) {
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

function pista() {
	id("huecoPista").innerHTML = palabras[numeroAleatorio][1];
	setTimeout(function () {
		id("huecoPista").innerHTML = "";
	}, 5000);
}

id("pista").addEventListener("click", pista);

function inicio() {
	generaPalabra();
	pintarGuiones(palabra.length);
	generaABC("a", "z");
	intentos = 6;
	if (id("turnos")) {
		id("turnos").innerHTML = intentos;
	}
}

// Iniciar
window.addEventListener("onload", inicio());
console.log('Pagina cargada');