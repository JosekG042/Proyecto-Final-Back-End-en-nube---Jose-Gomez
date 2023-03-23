
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Testeo con Jest |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import request from 'supertest';
import { app } from '../app.js';
import { logger } from '../Configuracion/logger.js';


//* SOLO TESTEO API PRODUCTOS
//? toEqual == to.equal == strictEqual
//? toBe == to.deep == deepStrictEqual 

//? comprobar array: toBeInstanceOf(array)


describe('Prueba funcionalidad API REST Productos', () => {
    it('Debería obtener un producto', async () => {
        const respuesta = await request(app).get('/1')
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveLength(1)
    })

    test('Debería obtener todos los productos', async () => {
        const respuesta = await request(app).get('/') //* ( get x id: /:id || todos: / )
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toHaveLength(2)
    })

    test('Debería crear un producto', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const respuesta = await request(app).post('/').send({ crearProducto })
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toEqual(`${productoCreado}, Producto/s creado/s con exito`)
        expect(respuesta.body.codigo).toBeDefined();
        expect(respuesta.body).toHaveLength(1) //2
    })

    test('Debería actualizar un producto', async () => {
        const actualizarProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 35.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": "54",
        }
        const respuesta = await request(app).put('/1').send({ actualizarProducto })
        expect(respuesta.status).toBe(200)
        expect(respuesta.body).toEqual(`${productoActualizado}, Producto actualizado con exito`)
    })

    test('Debería eliminar un producto', async () => {
        const respuesta = await request(app).delete('/2')
        expect(respuesta.status).toBe(200)
        expect(respuesta.text).toEqual('Producto eliminado con exito')
        expect(respuesta.body).toHaveLength(1)
    })

    test('Debería eliminar todos los productos', async () => {
        const respuesta = await request(app).delete('/')
        expect(respuesta.status).toBe(200)
        expect(respuesta.text).toEqual('Productos eliminados con exito')
    })

    test('Deberia dar error cuando falta descripcion al crear un nuevo producto', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const respuesta = await request(app).post('/').send({ crearProducto })
        expect(respuesta.status).toBe(400)
    })

    test('Deberia dar error cuando falta/no existe el id para eliminar un producto', async () => {
        const respuesta = await request(app).delete('/7')
        expect(respuesta.status).toBe(400)
    })

    before(() => {
        logger.info('\n++++++++++| Comienzo de los Testeos |++++++++++')
    })

    after(() => {
        logger.info('\n<<<<<<<<<<| Final de los Testeos |>>>>>>>>>>>')
    })

    beforeEach(() => {
        logger.info('\n~~~~~~~~~~~~| Comienzo Test |~~~~~~~~~~~~')
    })

    afterEach(() => {
        logger.info('\n~~~~~~~~~~~~| Final del Test |~~~~~~~~~~~~')
    })

    //! Ver como generar un reporte con los resultados .json (creo que ya se)
    // afterEach(function () {
    //     if (existsSync('todos.txt')) {
    //         unlinkSync('todos.txt')
    //     }
    // })
})


