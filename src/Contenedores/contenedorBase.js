class ContenedorBase {
    constructor() {
    }

    obtenerSiguienteId(elementos) {
        let longitud = elementos.length
        return longitud ? parseInt(elementos[longitud - 1].id) + 1 : 1
    }

    obtenerIndice(id, elementos) {
        return elementos.findIndex(elemento => elemento ? elemento.id == id : true)
    }
}

export { ContenedorBase };
