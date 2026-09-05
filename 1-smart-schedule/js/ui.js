export function mostrarActividades(actividades, onEliminar) {
    const container = document.querySelector("#activities-container");

    container.innerHTML = "";

    if (actividades.length === 0) {
        container.innerHTML = "<p>No hay actividades registradas.</p>";
        return;
    }

    actividades.forEach((actividad, index) => {
        const elemento = document.createElement("div");

        elemento.innerHTML = `
            <p>
                <strong>${index + 1}. ${actividad.nombre}</strong><br>
                ${actividad.inicio} - ${actividad.fin}
                <button type="button" data-index="${index}">
                    Eliminar
                </button>
            </p>
        `;

        const botonEliminar = elemento.querySelector("button");

        botonEliminar.addEventListener("click", () => {
            onEliminar(index);
        });

        container.appendChild(elemento);
    });
}

export function mostrarResultado(actividadesSeleccionadas, actividades) {
    const selectedContainer = document.querySelector("#selected-activities");
    const discardedContainer = document.querySelector("#discarded-activities");

    selectedContainer.innerHTML = "<h3>Actividades seleccionadas</h3>";
    discardedContainer.innerHTML = "<h3>Actividades descartadas</h3>";

    const actividadesDescartadas = actividades.filter(
        (actividad) => !actividadesSeleccionadas.includes(actividad)
    );

    if (actividadesSeleccionadas.length === 0) {
        selectedContainer.innerHTML += "<p>No hay actividades seleccionadas.</p>";
    } else {
        actividadesSeleccionadas.forEach((actividad) => {
            const elemento = document.createElement("p");

            elemento.textContent =
                `${actividad.nombre} — ${actividad.inicio} - ${actividad.fin}`;

            selectedContainer.appendChild(elemento);
        });
    }

    if (actividadesDescartadas.length === 0) {
        discardedContainer.innerHTML += "<p>No hay actividades descartadas.</p>";
    } else {
        actividadesDescartadas.forEach((actividad) => {
            const elemento = document.createElement("p");

            elemento.textContent =
                `${actividad.nombre} — ${actividad.inicio} - ${actividad.fin}`;

            discardedContainer.appendChild(elemento);
        });
    }
}