
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DAO Factory - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../../Configuracion/config.js';
import { ContenedorFileSystem } from '../../Contenedores/contenedorFileSystem.js';
import { ContenedorMemoria } from '../../Contenedores/contenedorMemoria.js';
import { ContenedorMongodbUsuario } from '../esquemasMongoose/index.js';


const almacenamientoEnArchivo = './usuariosFile.txt'

const urlConexionBD = (config.DATABASES.mongodb.url, {
    dbName: config.DATABASES.mongodb.dbName,
})

let daoUsers;


class DaoFactoryUsers {
    static obtenerDao(tipoBaseDatos) {

        switch (tipoBaseDatos) {
            case 'memory':
                if (daoUsers) return daoUsers
                daoUsers = new ContenedorMemoria()

            case 'filesystem':
                if (daoUsers) return daoUsers
                daoUsers = new ContenedorFileSystem(process.cwd() + almacenamientoEnArchivo)
                break

            case 'mongodb':
                if (daoUsers) return daoUsers
                daoUsers = new ContenedorMongodbUsuario(urlConexionBD, 'usuarios')
                break

            default: daoUsers = new ContenedorMemoria()
        }
        if (!daoUsers) {
            throw new Error('Error en Factory Users')
        }
        return daoUsers
    }
}

export { DaoFactoryUsers };



// switch (baseDatosSeleccionada) {
//     case 'Mongo': {
//         if (Dao) return Dao
//         Dao = new ContenedorMongoBD(urlConexionBD),
//         await Dao.iniciar();
//         break
//     }
//     case 'File':
//         // if (Dao) return Dao
//         Dao = new ContenedorFileSystem(almacenamientoEnArchivo)
//         await Dao.iniciar();
//         break
//     default:
//         // if (Dao) return Dao
//         Dao = new ContenedorMemoria()
// }

// class DaoFactory {
//     static obtenerDAO() {
//         return Dao
//     }
// }

