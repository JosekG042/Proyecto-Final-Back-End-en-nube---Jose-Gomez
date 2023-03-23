
import fs from 'fs';
import { logger } from '../Configuracion/logger.js';
import { ContenedorBase } from './contenedorBase.js';


class ContenedorFileSystem extends ContenedorBase {

    #listo = false

    constructor(archivoFile) {
        super(async () => {
            try {
                await fs.promises.readFile(this.archivoFile, 'utf-8')
                this.#listo = true
                logger.info('Iniciando el contenedor en Filesystem')
            } catch (error) {
                await fs.promises.writeFile(this.archivoFile, '[]')
                this.#listo = true
                logger.info('Iniciando el contenedor en Filesystem')
            }
        })
        this.archivoFile = archivoFile
        this.elementos = [];
    }

    // async iniciar() {
    //     try {
    //         await fs.promises.readFile(this.archivoFile, 'utf-8')
    //         this.#listo = true
    //         logger.info('Iniciando el contenedor en Filesystem')
    //     } catch (error) {
    //         await fs.promises.writeFile(this.archivoFile, '[]')
    //         this.#listo = true
    //         logger.info('Iniciando el contenedor en Filesystem')
    //     }
    // }

    desconectar() {
        logger.info('el contenedor en Filesystem ha sido desconectado')
    }

    #chequearListo() {
        if (!this.#listo) throw new Error('INTERNAL_ERROR: Dao no esta conectado!')
    }

    async #leerArchivo() {
        this.#chequearListo()
        const texto = await fs.promises.readFile(this.archivoFile, 'utf-8')
        this.elementos = JSON.parse(texto)
    }

    async #escribirArchivo() {
        this.#chequearListo()
        const texto = JSON.stringify(this.elementos, null, 2)
        await fs.promises.writeFile(this.archivoFile, texto)
    }

    obtener = async id => {
        try {
            if (id) {
                let elementos = await this.#leerArchivo(this.archivoFile)
                let index = elementos.obtenerIndice(elemento => elemento.id == id)

                return index >= 0 ? [elementos[index]] : []
            }
            else {
                let elementos = await this.#leerArchivo(this.archivoFile)
                return elementos
            }
        }
        catch (error) {
            logger.error(`${error}, Error al obtener un/os elemento/s`);

            let elementos = []
            await this.#escribirArchivo(this.archivoFile, elementos)
            return elementos
        }
    }

    guardar = async elemento => {
        try {
            let elementos = await this.#leerArchivo(this.archivoFile)

            let elementoGuardado = elemento
            elementos.push(elementoGuardado)

            await this.#escribirArchivo(this.archivoFile, elementos)

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
            let elementos = await this.#leerArchivo(this.archivoFile)

            let nuevoElemento = (elemento, id)

            let indice = this.obtenerIndice(id, elementos)
            let elementoEncontrado = elementos[indice] || {}

            let elementoActualizado = { ...elementoEncontrado, ...nuevoElemento }

            indice >= 0 ?
                elementos.splice(indice, 1, elementoActualizado) :
                elementos.push(elementoActualizado)

            await this.#escribirArchivo(this.archivoFile, elementos)

            return elementoActualizado
        }
        catch (error) {
            logger.error(`${error}, Error al actualizar un elemento`);

            let elemento = {}
            return elemento
        }
    }

    eliminar = async id => {
        try {
            if (id) {
                let elemento = await this.#leerArchivo(this.archivoFile)

                let indice = this.obtenerIndice(id, elemento)
                let elementoEliminado = elemento.splice(indice, 1)[0]

                await this.#escribirArchivo(this.archivoFile, elemento)

                return elementoEliminado
            } else {
                this.elementos = [];
                await this.#escribirArchivo()
            }
        }
        catch (error) {
            logger.error(`${error}, Error al eliminar un/os elemento/s`);

            let elemento = {}
            return elemento
        }
    }
}

export { ContenedorFileSystem };

