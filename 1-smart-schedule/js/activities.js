const actividades = [];

export function agregarActividad(actividad) {
    actividades.push(actividad);
}

export function obtenerActividades() {
    return actividades;
}

export function eliminarActividad(index) {
    actividades.splice(index, 1);
}