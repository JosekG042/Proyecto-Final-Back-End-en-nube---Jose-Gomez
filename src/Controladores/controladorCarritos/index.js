
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Carrito Compra |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import nodemailer from 'nodemailer';
import swal from 'sweetalert';
import { config } from '../../Configuracion/config.js';
import { logger } from '../../Configuracion/logger.js';
import { transporter, client } from '../../Servicios/index.js';
import { FECHA_UTILS, ERRORES_UTILS } from "../../Utilidades/index.js";
import { ApiCarritos, ApiProductos } from '../../Api/index.js';



class ControladorCarritos {
    constructor() {
        this.apiCarts = new ApiCarritos()
        this.apiProds = new ApiProductos()
    }

    obtenerCarritoXid = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;

            const carrito = await this.apiCarts.obtenerXid(_id);

            if (!carrito)
                return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

            // respuesta.send({ success: true, carrito });
            respuesta.render("view/cart", { datosCarrito: carrito });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al obtener el carrito solicitado`);
        }
    };

    crearCarrito = async (solicitud, respuesta) => {
        try {
            const carritoBase = { timestamp: FECHA_UTILS.getTimestamp(), usuario: [], productos: [] };

            const nuevoCarrito = await this.apiCarts.guardar(carritoBase);

            // respuesta.send({ success: true, carritoId: nuevoCarrito.id });
            respuesta.render("view/home", { carritoID: nuevoCarrito.id });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al crear el carrito`);
        }
    };


    guardarProdsCarrito = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;
            const { prodId } = solicitud.body;

            const producto = await this.apiProds.obtenerXid(prodId);

            if (!producto)
                return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO });

            const carrito = await this.apiCarts.añadirProducto(_id, producto._id);

            if (!carrito)
                return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

            logger.info({ carrito })

            respuesta.send({ success: true, carrito: carritoActualizado, id: carritoActualizado._id });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al guardar un producto al carrito`);
        }
    };

    obtenerTodosProdsCarrito = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;

            const carrito = await this.apiCarts.obtenerXid(_id);
            logger.info({ carrito })

            if (!carrito) {
                return logger.info({ error: "Error, no se encontro el carrito" })
            }

            else {
                const listadoProductos = { productos: carrito.productos };

                if (!listadoProductos) return respuesta.send({ error: true, mensaje: "No se encontraron los productos solicitados" });

                logger.info({ listadoProductos })

                // respuesta.send({ success: true, productos: listadoProductos });
                respuesta.render("view/home", { todosProductos: listadoProductos });
            }
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al obtener la lista los productos del carrito`);
        }
    };

    eliminarProdCarrito = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;
            const { prodId } = solicitud.body;

            logger.info({ idC: solicitud.params })
            logger.info({ idP: solicitud.body })

            const producto = await this.apiProds.obtenerXid(prodId);

            if (!producto) {
                logger.info({ error: "Error, no se encontro el producto" })
            }
            logger.info({ producto })

            const carrito = await this.apiCarts.obtenerXid(_id);
            if (!carrito) {
                logger.info({ error: "Error, no se encontro el carrito" })
            }
            logger.info({ carrito })

            const productoEliminado = await this.apiCarts.eliminarProducto(_id, prodId)

            logger.info({ eliminado: productoEliminado })

            logger.info({ carrito })

            swal({
                title: 'El producto seleccionado fue eliminado del carrito con exito',
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            })

            respuesta.send({ success: true, mensaje: "Se elimino correctamente el producto del carrito", carrito: productoEliminado })
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al eliminar un producto del carrito`)
        }
    };

    eliminarCarritoXid = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;

            const carrito = await this.apiCarts.eliminarXid(_id);
            if (!carrito) return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

            swal({
                title: 'El carrito seleccionado fue eliminado con exito',
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500
            })
            respuesta.send({ success: true, mensaje: `Se elimino correctamente el carrito ${_id}` })
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'PRODUCTOS' });
            logger.error(`${error}, Error al eliminar el carrito seleccionado`);
        }
    };

    //? ruta con carrito id en params usuario boton => sacado de usuario

    procesarPedidoCarrito = async (solicitud, respuesta) => {
        try {
            const { _id } = solicitud.params;

            const carrito = await this.apiCarts.obtenerXid(_id);

            if (!carrito) return respuesta.send({ error: true, mensaje: ERRORES_UTILS.MESSAGES.ERROR_CARRITO });

            if (carrito.length === 0) logger.warn({ mensaje: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO })

            logger.info({ ProductoPedido: carrito.productos })

            //? Verificacion de autenticidad + extraccion datos del usuario
            if (solicitud.isAuthenticated()) {

                const usuarioCarrito = solicitud.user;

                carrito.usuario = usuarioCarrito;
                carrito.pedido.numero = [[numero]];
                carrito.pedido.estado = [[estado]];
                carrito.pedido.precioTotal = [[precioTotal]];

                logger.info({ Cliente: usuarioCarrito })

                //? Envio del Email al admin
                let envioEmail = {
                    from: "Remitente",
                    to: config.EMAIL.USUARIO,
                    subject: `Nueva orden de compra de: ${carrito.usuario.nombre}, email: ${carrito.usuario.email}, direccion: ${carrito.usuario.direccion}, N° de compra: ${carrito.pedido.numero}`,
                    text: `Productos solicitados por el usuario: ${carrito.productos}, precio total de la compra: ${carrito.productos.precioTotal}`
                };
                logger.info({ Cliente: envioEmail.subject })

                let info = transporter.sendMail(envioEmail, (error, info) => {
                    if (error) {
                        logger.error("Error al enviar mail: " + error);
                    } else {
                        logger.info(`El email: nuevo pedido, fue enviado correctamente: ${info.messageId}`);
                        logger.info(`Vista previa a URL: ${nodemailer.getTestMessageUrl(info)}`);
                    }
                });

                //? Envio del SMS al cliente
                const envioSMS = await client.messages.create({
                    body: "Su pedido ya ha sido recibido y esta en proceso",
                    messagingServiceSid: 'MG811b5e7425f1a790279a5f4bcf832d3e',
                    from: config.WHATSAPP.NRO_TWILIO,
                    to: `whatsapp:+${carrito.usuario.telefono}`
                }).then(mensaje => logger.info(mensaje.sid));

                logger.info(`Mensaje SMS enviado correctamente ${envioSMS}`);

                //? Envio del Whatsapp al cliente
                const envioWhatsapp = await client.messages.create({
                    body: `Nuevo pedido: ${carrito.productos}, precio total de la compra: ${carrito.productos.precioTotal}, de: ${carrito.usuario.nombre}, email: ${carrito.usuario.email}, estado de compra: ${carrito.pedido.estado}`,
                    from: config.WHATSAPP.NRO_TWILIO,
                    to: `whatsapp:+${carrito.usuario.telefono}`
                }).then(mensaje => logger.info(mensaje.sid));

                logger.info(`Mensaje SMS enviado correctamente ${envioWhatsapp}`);

                logger.info('Pedido de compra procesado con exito');
                logger.info(carrito)

                swal({
                    title: 'Pedido de compra procesado con exito',
                    icon: 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500
                })

                respuesta.render('view/home', { carrito: carrito.productos });
            } else {
                throw new Error("Debes estar autenticado para enviar pedidos");
            }
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'CARRITOS' });
            logger.error(`${error}, Error al procesar el pedido de compra`);
        }
    }
}

export { ControladorCarritos };



