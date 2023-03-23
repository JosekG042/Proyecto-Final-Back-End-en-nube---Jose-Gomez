
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DAO Factory - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../../Configuracion/config.js';
import { ContenedorFileSystem } from '../../Contenedores/contenedorFileSystem.js';
import { ContenedorMemoria } from '../../Contenedores/contenedorMemoria.js';
import { ContenedorMongodbCarrito } from '../esquemasMongoose/index.js';


const almacenamientoEnArchivo = './carritosFile.txt'

const urlConexionBD = (config.DATABASES.mongodb.url, {
    dbName: config.DATABASES.mongodb.dbName,
})

let daoCarts;


class DaoFactoryCarts {
    static obtenerDao(tipoBaseDatos) {

        switch (tipoBaseDatos) {
            case 'memory':
                if (!daoCarts) return daoCarts
                daoCarts = new ContenedorMemoria()

            case 'filesystem':
                if (!daoCarts) return daoCarts
                daoCarts = new ContenedorFileSystem(process.cwd() + almacenamientoEnArchivo)
                break

            case 'mongodb':
                if (!daoCarts) return daoCarts
                daoCarts = new ContenedorMongodbCarrito(urlConexionBD, 'carritos')
                break

            default: daoCarts = new ContenedorMemoria()
        }
        if (!daoCarts) {
            throw new Error('Error en Factory Carts')
        }
        return daoCarts
    }
}

export { DaoFactoryCarts };

