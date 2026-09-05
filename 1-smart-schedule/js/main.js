import { mostrarActividades } from "./ui.js";

const actividades = [];

const formulario = document.querySelector("#activity-form form");
const nombreInput = document.querySelector("#activity-name");
const inicioInput = document.querySelector("#start-time");
const finInput = document.querySelector("#end-time");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const inicio = inicioInput.value;
    const fin = finInput.value;

    if (!nombre || !inicio || !fin) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (inicio >= fin) {
        alert("La hora de finalización debe ser posterior a la hora de inicio.");
        return;
    }

    const actividad = {
        nombre,
        inicio,
        fin
    };

    actividades.push(actividad);

    mostrarActividades(actividades);

    formulario.reset();
});