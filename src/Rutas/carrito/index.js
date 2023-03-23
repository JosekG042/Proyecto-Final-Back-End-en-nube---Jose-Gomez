
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Carrito Compra |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { Router } from "express";
import { ControladorCarritos } from '../../Controladores/index.js';
import { ApiCarritos } from '../../Api/index.js';

const ruta = Router();


class RutaCarrito {

    constructor() {
        this.controladorCarts = new ControladorCarritos();
    }

    start() {
        //? pagina carrito
        ruta.get("/", (solicitud, respuesta) => { respuesta.render("view/cart") });

        ruta.get('/:_id', this.controladorCarts.obtenerCarritoXid);
        ruta.get('/:_id/productos/', this.controladorCarts.obtenerTodosProdsCarrito);

        ruta.post('/', this.controladorCarts.crearCarrito);
        ruta.post("/:_id", this.controladorCarts.guardarProdsCarrito);
        ruta.post('/compra/:_id', this.controladorCarts.procesarPedidoCarrito);

        ruta.delete('/_:id', this.controladorCarts.eliminarCarritoXid);
        ruta.delete('/:_id/productos/', this.controladorCarts.eliminarProdCarrito);

        return ruta
    }
}

export { RutaCarrito };

