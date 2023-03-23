
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactoryCarts } from '../Dao/daoFactories/index.js';
import { CarritosDTO } from '../Dto/carritosDto.js';
import { ValidacionJoiCarrito } from '../Modelos/validacionesJoi/index.js';

class ApiCarritos {
    constructor() {
        this.DaoCarritos = DaoFactoryCarts.obtenerDao(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosCarritos() {
        const elementos = await this.DaoCarritos.obtenerTodos();
        return elementos.map(elemento => new ValidacionJoiCarrito(CarritosDTO(elemento)))
    }

    async obtenerCarritoXid(idBuscado) {
        const elemento = await this.DaoCarritos.obtenerXid(idBuscado);
        return new ValidacionJoiCarrito(CarritosDTO(elemento))
    }

    async actualizarProductosXid(idBuscado, datos) {
        ApiCarritos.ValidarDatosCarritos(datos, true)
        const actualizado = await this.DaoProductos.actualizar(idBuscado, datos)
        return new ValidacionJoiCarrito(actualizado)
    }

    async craerCarritoBD(nuevoElemento) {
        ApiCarritos.ValidarDatosCarritos(nuevoElemento, true)
        await this.DaoCarritos.guardar(CarritosDTO(nuevoElemento))
    }

    async eliminarCarritoXid(idBuscado) {
        const eliminado = await this.DaoCarritos.eliminar(idBuscado);
        return eliminado
    }

    async eliminarTodosCarritos() {
        await this.DaoCarritos.eliminar();
    }

    static ValidarDatosCarritos(carrito, requerido) {
        try {
            ValidacionJoiCarrito.validar(carrito, requerido)
        } catch (error) {
            throw new Error('El carrito posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export { ApiCarritos };

