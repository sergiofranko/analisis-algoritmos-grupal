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
    const selectedContainer = document.querySelector("#optimized-schedule");
    const discardedContainer = document.querySelector("#discarded-activities");

    selectedContainer.innerHTML = "";
    discardedContainer.innerHTML = "<h3>Actividades descartadas</h3>";

    const actividadesDescartadas = actividades.filter(
        (actividad) => !actividadesSeleccionadas.includes(actividad)
    );

    if (actividadesSeleccionadas.length === 0) {
        selectedContainer.innerHTML = "<p>No hay actividades seleccionadas.</p>";
    } else {
        const actividadesOrdenadas = [...actividadesSeleccionadas].sort(
            (a, b) => a.inicio.localeCompare(b.inicio)
        );

        actividadesOrdenadas.forEach((actividad) => {
            const bloque = document.createElement("div");

            bloque.classList.add("schedule-block");

            bloque.innerHTML = `
                <strong>${actividad.nombre}</strong>
                <span>${actividad.inicio} - ${actividad.fin}</span>
            `;

            selectedContainer.appendChild(bloque);
        });
    }

    if (actividadesDescartadas.length === 0) {
        discardedContainer.innerHTML +=
            "<p>No hay actividades descartadas.</p>";
    } else {
        actividadesDescartadas.forEach((actividad) => {
            const elemento = document.createElement("p");

            elemento.textContent =
                `${actividad.nombre} — ${actividad.inicio} - ${actividad.fin}`;

            discardedContainer.appendChild(elemento);
        });
    }

    mostrarEstadisticas(
        actividades.length,
        actividadesSeleccionadas.length,
        actividadesDescartadas.length
    );
}

export function mostrarEstadisticas(total, seleccionadas, descartadas) {
    document.querySelector("#total-activities").textContent = total;
    document.querySelector("#selected-count").textContent = seleccionadas;
    document.querySelector("#discarded-count").textContent = descartadas;
}