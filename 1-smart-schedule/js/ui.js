export function mostrarActividades(actividades) {
    const container = document.querySelector("#activities-container");

    container.innerHTML = "";

    actividades.forEach((actividad, index) => {
        const elemento = document.createElement("div");

        elemento.innerHTML = `
            <p>
                <strong>${index + 1}. ${actividad.nombre}</strong><br>
                ${actividad.inicio} - ${actividad.fin}
            </p>
        `;

        container.appendChild(elemento);
    });
}