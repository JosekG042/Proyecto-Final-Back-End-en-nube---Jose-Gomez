
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Contenedor con esquemas Mongoose - Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloMensajes } from "../../Modelos/modelosMongoose/index.js";


class ContenedorMongodbMensaje extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloMensajes.ColeccionMensajes,
            schema: modeloMensajes.EsquemaMensajes,
        });
    }
}

export { ContenedorMongodbMensaje };
