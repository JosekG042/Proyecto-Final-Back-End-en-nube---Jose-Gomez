
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Contenedor con esquemas Mongoose - Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


import { ContenedorMongoBD } from "../../Contenedores/index.js";
import { modeloProducto } from "../../Modelos/modelosMongoose/index.js";


class ContenedorMongodbProducto extends ContenedorMongoBD {
    constructor() {
        super({
            nombre: modeloProducto.ColeccionProductos,
            schema: modeloProducto.ProductoEsquema,
        });
    }
}

export { ContenedorMongodbProducto };

