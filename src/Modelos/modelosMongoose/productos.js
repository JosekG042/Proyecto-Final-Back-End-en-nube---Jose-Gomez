
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Modelos Mongoose - Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { Schema } from "mongoose";

const ColeccionProductos = "productos";

const ProductoEsquema = new Schema(
    {
        titulo: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true, max: 150 },
        codigo: { type: String, required: true, max: 10 },
        imagen: { type: String, required: true, max: 150 },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true, default: 1 },
        cantidad: { type: Number, required: true, default: 1 },
        categoria: { type: String, required: true },
        // timestamp: { type: String, required: true, max: 100 },
        timestamp: { type: Date, default: Date.now },
    },
    {
        virtuals: true,
    }
);

ProductoEsquema.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});

export const modeloProducto = { ColeccionProductos, ProductoEsquema };

