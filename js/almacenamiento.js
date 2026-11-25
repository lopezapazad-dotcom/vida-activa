// ======================================
// ALMACENAMIENTO DE DATOS - VIDA ACTIVA
// ======================================

window.AlmacenamientoVidaActiva = {

    guardar(clave, valor) {
        localStorage.setItem(clave, JSON.stringify(valor));
    },

    obtener(clave, valorPredeterminado = null) {
        const dato = localStorage.getItem(clave);

        if (dato === null) {
            return valorPredeterminado;
        }

        try {
            return JSON.parse(dato);
        } catch (error) {
            console.error("Error al recuperar los datos:", error);
            return valorPredeterminado;
        }
    },

    eliminar(clave) {
        localStorage.removeItem(clave);
    },

    guardarEdad(edad) {
        this.guardar("edadVidaActiva", edad);
    },

    obtenerEdad() {
        return this.obtener("edadVidaActiva", null);
    },

    guardarPreferenciaModoFacil(activado) {
        this.guardar("modoFacilVidaActiva", activado);
    },

    obtenerPreferenciaModoFacil() {
    const dato = localStorage.getItem("modoFacilVidaActiva");

    return dato === "true" || dato === '"activado"';
    }
};