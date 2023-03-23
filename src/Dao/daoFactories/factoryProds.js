
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DAO Factory - Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../../Configuracion/config.js';
import { ContenedorFileSystem } from '../../Contenedores/contenedorFileSystem.js';
import { ContenedorMemoria } from '../../Contenedores/contenedorMemoria.js';
import { ContenedorMongodbProducto } from '../esquemasMongoose/index.js';


const almacenamientoEnArchivo = './productosFile.txt'

const urlConexionBD = (config.DATABASES.mongodb.url, {
    dbName: config.DATABASES.mongodb.dbName,
})

let daoProds;


class DaoFactoryProds {
    static obtenerDao(tipoBaseDatos) {

        switch (tipoBaseDatos) {
            case 'Mem':
                if (!daoProds) return daoProds
                daoProds = new ContenedorMemoria()

            case 'File':
                if (!daoProds) return daoProds
                daoProds = new ContenedorFileSystem(process.cwd() + almacenamientoEnArchivo)
                break

            case 'Mongo':
                if (!daoProds) return daoProds
                daoProds = new ContenedorMongodbProducto(urlConexionBD, 'productos')
                break

            default: daoProds = new ContenedorMemoria()
        }
        if (!daoProds) {
            throw new Error('Error en Factory Prods')
        }
        return daoProds
    }
}

export { DaoFactoryProds };


