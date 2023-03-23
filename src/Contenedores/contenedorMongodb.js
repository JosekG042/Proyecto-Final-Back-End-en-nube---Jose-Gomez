
import { logger } from '../Configuracion/logger.js';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import { ContenedorBase } from './contenedorBase.js';

class ContenedorMongoBD extends ContenedorBase {

    constructor(basedatos, coleccion) {
        super(async () => {
            try {
                logger.info('Conectando a la Base de datos MongoBD...')

                const conexion = await MongoClient.connect('mongodb://localhost', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const baseDatosMongo = conexion.db(basedatos);
                this._coleccion = baseDatosMongo.collection(coleccion);

                logger.info('La conexión con MongoBD fue establecida con exito')
            } catch (error) {
                logger.error('Error al establecer conexión con MongoBD')
            }
        })
    }

    obtenerTodos = async elemento => {
        try {
            // if (id) {
            //     console.log(id)
            //     const respuesta = await this._collection.findOne({ id: ObjectId(id) })
            //     return [respuesta]
            // }
            if (elemento) {
                console.log(elemento)
                const elementos = await this._collection.find({ categoria: elemento }).toArray()
                return elementos
            }
            else {
                const respuesta = await this._collection.find({}).toArray()
                return respuesta
            }
        }
        catch (error) {
            logger.error(`${error}, Error al obtener el/los elemento/s seleccionado/s`);
        }
    }

    obtenerXid = async id => {
        try {
            const respuesta = await this._collection.findOne({ id: ObjectId(id) })
            return [respuesta]
        }
        catch (error) {
            logger.error(`${error}, Error al obtener el elemento seleccionado`);
        }
    }

    obtenerUno = async elemento => {
        try {
            const respuesta = await this._coleccion.findOne(elemento).lean().exec();
            return respuesta
        }
        catch (error) {
            logger.error(`${error}, Error al obtener el elemento seleccionado`);
        }
    }

    guardar = async elemento => {
        try {
            await this._collection.insertOne(elemento);
            return elemento
        }
        catch (error) {
            logger.error(`${error}, Error al guardar un elemento`);
            return elemento
        }
    }

    actualizar = async (id, elemento) => {
        try {
            await this._collection.updateOne({ id: ObjectId(id) }, { $set: elemento });
            return elemento
        }
        catch (error) {
            logger.error(`${error}, Error al actualizar un elemento`);
            return elemento
        }
    }

    eliminar = async id => {
        try {
            if (id) {
                await this._collection.deleteOne({ id: ObjectId(id) })
                return elementoEliminado
            } else {
                await this._coleccion.deleteMany({})
            }
        }
        catch (error) {
            logger.error(`${error}, Error al eliminar un/os elemento/s`);
            return elementoEliminado
        }
    }
}

export { ContenedorMongoBD };

