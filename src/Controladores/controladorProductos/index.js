
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { ApiProductos } from '../../Api/index.js';
import { FECHA_UTILS, ERRORES_UTILS, JOI_VALIDADOR, LOGGER_UTILS } from "../../Utilidades/index.js";
import { logger } from '../../Configuracion/logger.js';
import __dirname from '../../dirname.js';


class ControladorProductos {

    constructor() {
        this.apiProds = new ApiProductos()
    }

    obtenerTodosProds = async (solicitud, respuesta) => {
        try {
            const producto = await this.apiProds.obtenerTodosProductos();

            if (!producto) return logger.error({ error: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO });

            respuesta.send(producto);
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al obtener los productos solicitados`)
        }
    };

    obtenerProdXid = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            const producto = await this.apiProds.obtenerProductosXid(id);

            respuesta.send(producto);
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' })
            logger.error(`${error}, Error al obtener el producto solicitado`)
        }
    };

    obtenerProdsXcategoria = async (solicitud, respuesta) => {
        try {
            const { categoria } = solicitud.params;

            const productos = await this.apiProds.obtenerProductosXcategoria(categoria);

            respuesta.send(productos);

            respuesta.render("view/cart", { prodsXcategoria: productos })
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' })
            logger.error(`${error}, Error al obtener el producto solicitado`)
        }
    };

    actualizarProducto = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            const { titulo, descripcion, codigo, stock,
                precio, imagen } = solicitud.body;

            const productoValidado = await JOI_VALIDADOR.productoJoi.validateAsync({
                titulo, descripcion, codigo, imagen, precio, stock, timestamp: FECHA_UTILS.getTimestamp(),
            });
            logger.info({ productoValidado })

            const productoActualizado = await this.apiProds.actualizarProductosXid({ id, productoValidado })

            logger.info({ productoActualizado })

            respuesta.send(`${productoActualizado}, Producto actualizado con exito`)

        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al actualizar el producto solicitado`)
        }
    }

    crearProducto = async (solicitud, respuesta) => {
        try {
            const { titulo, descripcion, codigo, precio, stock } = solicitud.body; //imagen

            //! para probar con postman agregar imagen "solicitud.body" y comentar subida file

            //* Subida de imagen del producto
            const file = solicitud.file;

            logger.info({ status: 'imagen subida correctamente!', link: __dirname + '/public/Uploads/productos' + file.filename });

            const imagen = file.filename;

            const nuevoProducto = await JOI_VALIDADOR.productoJoi.validateAsync({
                titulo, descripcion, codigo, imagen, precio, stock,
                timestamp: FECHA_UTILS.getTimestamp(),
            });
            logger.info({ nuevoProducto })

            const productoCreado = await this.apiProds.guardarProductosBD(nuevoProducto);

            respuesta.send(`${productoCreado}, Producto/s creado/s con exito`);
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al crear el producto solicitado`)
            await LOGGER_UTILS.guardarLOG(error);
        }
    };

    eliminarProdXid = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            const productoEliminado = await await this.apiProds.eliminarProductosXid(id);

            respuesta.send({ success: true, eliminado: productoEliminado });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al eliminar el producto solicitado`)
        }
    };

    eliminarTodosProds = async (solicitud, respuesta) => {
        try {
            await this.apiProds.eliminarTodosProductos();

            respuesta.send({ success: true, mensaje: 'Productos eliminados con exito' });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al eliminar los productos solicitados`)
        }
    };
}

export { ControladorProductos };


