
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Testeo con Mocha |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import request from 'supertest';
import { expect } from 'chai';
import { logger } from '../Configuracion/logger.js';
import { app } from '../app.js';


//* SOLO TESTEO API PRODUCTOS
//? toEqual == to.equal == strictEqual
//? toBe == to.deep == deepStrictEqual 

describe('Prueba funcionalidad API REST Productos', () => {

    it('Debería crear x productos', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
            "id": 1,
        }
        const respuesta = await request(app).post('/api/productos/').send({ crearProducto })
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.body).to.equal(`${productoCreado}, Producto/s creado/s con exito`)
        expect(respuesta.body).to.deep.equal([2])
        expect(respuesta.body.imagen).to.equal(productoCreado.imagen)
    });


    it('Debería crear otro producto', async () => {
        const crearProducto = {
            "titulo": "AssertionError: expected Csi",
            "descripcion": "Zapatilla adidas",
            "precio": 83.000,
            "codigo": "3656463",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 18,
            "id": 2,
        }
        const respuesta = await request(app).post('/api/productos/').send({ crearProducto })
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.body).to.equal(`${productoCreado}, Producto/s creado/s con exito`)
        expect(respuesta.body).to.deep.equal([2])
        expect(respuesta.body.imagen).to.equal(productoCreado.imagen)
    })

    it('Debería obtener un producto', async () => {
        const respuesta = await request(app).get('/api/productos/1')
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.body).to.deep.equal([1])                       //.to.equal({id: 1})
        expect(respuesta.body).to.include.key('descripcion', 'stock')
    })

    it('Debería obtener todos los productos', async () => {  // status
        const respuesta = await request(app).get('/api/productos/')
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.body).to.deep.equal([1])
    })

    it('Debería actualizar un producto', async () => {
        const actualizarProducto = {
            "titulo": "pepito rujshdhj 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 95.000,
            "codigo": "323762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": "34",
        }
        const respuesta = await request(app).put('/api/productos/2').send({ actualizarProducto })
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.body).to.equal(`${actualizarProducto}, Producto actualizado con exito`)
    })

    it('Debería eliminar un productos', async () => {
        const respuesta = await request(app).delete('/api/productos/2')
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.text).to.equal('Producto eliminado con exito')
        expect(respuesta.body).to.deep.equal([1])
    })

    it('Debería eliminar todos los productos', async () => {
        const respuesta = await request(app).delete('/api/productos/')
        // expect(respuesta.status).to.deep(200)
        expect(respuesta.text).to.equal('Productos eliminados con exito')
        expect(respuesta.body).to.deep.equal([0])
    })

    it('Deberia dar error cuando falta/n valores al crear un nuevo producto', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const errorEsperado = new Error('Error al crear el producto solicitado')
        const respuesta = await request(app).post('/').send({ crearProducto })
        expect(respuesta.error).to.deep(errorEsperado)
    })

    it('Deberia dar error cuando no existe el id para eliminar un producto', async () => {
        const errorEsperado = new Error('Error al eliminar el producto solicitado')
        const respuesta = await request(app).delete('/7')
        expect(respuesta.error).to.deep(errorEsperado)
        // expect(respuesta.error).to.equal(new Error('Error al crear el producto solicitado'))
        // expect(apiProds.eliminarProductosXid.bind(apiProds, '/7')).to.throw(new Error('Error al crear el producto solicitado'));
    })

    before(() => {
        logger.info('\n++++++++++| Comienzo de las Pruebas |++++++++++')
    })

    after(() => {
        logger.info('\n<<<<<<<<<<| Final de las Pruebas |>>>>>>>>>>>')
    })

    beforeEach(() => {
        logger.info('\n~~~~~~~~~~~~| Comienzo Test |~~~~~~~~~~~~')
    })

    afterEach(() => {
        logger.info('\n~~~~~~~~~~~~| Final del Test |~~~~~~~~~~~~')
    })
})

