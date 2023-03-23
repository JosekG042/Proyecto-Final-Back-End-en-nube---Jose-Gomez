
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Contenedor con esquemas Mongoose - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloUsuario } from "../../Modelos/modelosMongoose/index.js";


class ContenedorMongodbUsuario extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloUsuario.ColeccionUsuarios,
            schema: modeloUsuario.esquemaUsuario,
        });
    }
}

export { ContenedorMongodbUsuario }; 