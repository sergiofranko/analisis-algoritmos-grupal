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