
import { Router } from "express";
import { ControladorProductos } from "../../Controladores/index.js";

const ruta = Router();


class RutaProducto {
    constructor() {
        this.controladorProds = new ControladorProductos();
    }

    start() {
        ruta.get("/", this.controladorProds.obtenerTodosProds);
        ruta.get("/:id", this.controladorProds.obtenerProdXid);
        ruta.get("/:categoria", this.controladorProds.obtenerProdsXcategoria);

        ruta.post("/", this.controladorProds.crearProducto);
        ruta.put("/:id", this.controladorProds.actualizarProducto);

        ruta.delete("/:id", this.controladorProds.eliminarProdXid);
        ruta.delete("/", this.controladorProds.eliminarTodosProds);

        return ruta
    }
}

export { RutaProducto };

