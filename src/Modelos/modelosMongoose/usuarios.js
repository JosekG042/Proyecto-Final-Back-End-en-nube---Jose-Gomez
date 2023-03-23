
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Modelos Mongoose - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { Schema } from "mongoose";


const ColeccionUsuarios = "usuarios";

const esquemaUsuario = new Schema({
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    usuario: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    telefono: { type: Number, required: true },
    direccion: { type: String, required: true, },
    avatar: { type: String, required: true, },
});

esquemaUsuario.set("toJSON", {
    transform: (_, respuesta) => {
        respuesta.id = respuesta._id;
        delete respuesta.__v;
        delete respuesta._id;
        return respuesta;
    },
});

export const modeloUsuario = { esquemaUsuario, ColeccionUsuarios };


