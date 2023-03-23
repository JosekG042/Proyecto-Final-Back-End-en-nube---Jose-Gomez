
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactoryProds } from '../Dao/daoFactories/index.js';
import { ProductosDTO } from '../Dto/productosDto.js';
import { ValidacionJoiProducto } from '../Modelos/validacionesJoi/index.js';

class ApiProductos {
    constructor() {
        this.DaoProductos = DaoFactoryProds.obtenerDao(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosProductos() {
        const elementos = await this.DaoProductos.obtener()
        return elementos.map(elemento => new ValidacionJoiProducto(ProductosDTO(elemento)))
    }

    async obtenerProductosXcategoria() {
        const elementos = await this.DaoProductos.obtener()
        return elementos.map(elemento => new ValidacionJoiProducto(ProductosDTO(elemento)))
    }

    async obtenerProductosXid(idBuscado) {
        const elemento = await this.DaoProductos.obtenerXid(idBuscado)
        return new ValidacionJoiProducto(ProductosDTO(elemento))
    }

    async obtenerUnProducto(elemento) {
        const respuesta = await this.DaoProductos.obtenerUno(elemento);
        return new ValidacionJoiProducto(ProductosDTO(respuesta));
    }

    async guardarProductosBD(nuevoElemento) {
        ApiProductos.ValidarDatosProductos(nuevoElemento, true)
        await this.DaoProductos.guardar(ProductosDTO(nuevoElemento))
    }

    async actualizarProductosXid(idBuscado, datos) {
        ApiProductos.ValidarDatosProductos(datos, true)
        const actualizado = await this.DaoProductos.actualizar((idBuscado, datos))
        return new ValidacionJoiProducto(ProductosDTO(actualizado))
    }

    async eliminarProductosXid(idBuscado) {
        const eliminado = await this.DaoProductos.eliminar(idBuscado)
        return eliminado
    }

    async eliminarTodosProductos() {
        await this.DaoProductos.eliminar()
    }

    static ValidarDatosProductos(producto, requerido) {
        try {
            ValidacionJoiProducto.validar(producto, requerido)
        } catch (error) {
            throw new Error('El producto posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export { ApiProductos };