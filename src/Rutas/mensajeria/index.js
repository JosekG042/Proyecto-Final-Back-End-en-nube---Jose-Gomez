
import { Router } from "express"
import { ControladorMensajes } from "../../Controladores/index.js";

const ruta = Router()


class RutaMensaje {

    constructor() {
        this.controladorMsjs = new ControladorMensajes();
    }

    start() {
        ruta.post("/", this.controladorMsjs.CrearMensaje);

        ruta.get("/", this.controladorMsjs.ObtenerTodosMsjs);

        ruta.get("/:email", this.controladorMsjs.ObtenerMsjsXemail);

        return ruta
    }
}

export { RutaMensaje };

