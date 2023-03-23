import { ContenedorBase } from './contenedorBase.js';

class ContenedorMemoria extends ContenedorBase {

    constructor(array = []) {
        super()
        this.elementos = array
    }

    obtener = async id => {
        try {
            if (id) {
                let indice = this.elementos.obtenerIndice(elemento => elemento.id == id)
                if (indice === -1)
                    return []
                return [this.elementos[indice]]
            }
            else {
                return this.elementos
            }
        }
        catch (error) {
            logger.error(`${error}, Error al obtener un/os elemento/s`);

            return []
        }
    }

    guardar = async elemento => {
        try {
            let elementoGuardado = elemento
            this.noticias.push(elementoGuardado)

            return elementoGuardado
        }
        catch (error) {
            logger.error(`${error}, Error al guardar un elemento`);

            let elemento = {}
            return elemento
        }
    }

    actualizar = async (id, elemento) => {
        try {
            let nuevoElemento = (elemento, id)

            let indice = this.obtenerIndice(id, this.elementos)
            let elementoEncontrado = this.noticias[indice] || {}

            let elementoActualizado = { ...elementoEncontrado, ...nuevoElemento }

            indice >= 0 ?
                this.elementos.splice(indice, 1, elementoActualizado) :
                this.elementos.push(elementoActualizado)

            return elementoActualizado
        }
        catch (error) {
            logger.error(`${error}, Error al acualizar un elemento`);

            let elemento = {}
            return elemento
        }
    }

    eliminar = async id => {
        try {
            if (id) {
                let indice = this.obtenerIndice(id, this.elementos)
                let elementoEliminado = this.elementos.splice(indice, 1)[0]

                return elementoEliminado
            } else {
                this.elementos = []
            }
        }
        catch (error) {
            logger.error(`${error}, Error al eliminar un/os elemento/s`);

            let elemento = {}
            return elemento
        }
    }
}


export { ContenedorMemoria };



