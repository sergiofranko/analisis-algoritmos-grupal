export function seleccionarActividades(actividades) {
    if (actividades.length === 0) {
        return [];
    }

    const actividadesOrdenadas = [...actividades];

    actividadesOrdenadas.sort((a, b) => {
        return a.fin.localeCompare(b.fin);
    });

    const actividadesSeleccionadas = [];

    actividadesSeleccionadas.push(actividadesOrdenadas[0]);

    let ultimaHoraFin = actividadesOrdenadas[0].fin;

    for (let i = 1; i < actividadesOrdenadas.length; i++) {
        const actividadActual = actividadesOrdenadas[i];

        if (actividadActual.inicio >= ultimaHoraFin) {
            actividadesSeleccionadas.push(actividadActual);
            ultimaHoraFin = actividadActual.fin;
        }
    }

    return actividadesSeleccionadas;
}
