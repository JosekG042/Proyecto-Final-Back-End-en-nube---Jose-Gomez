
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from "cookie-parser";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import __dirname from "./dirname.js";
import passport from "passport";
import cluster from 'cluster';
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { INFO_UTILS } from './Utilidades/index.js';
import { PassportAutenticacion } from './Servicios/index.js';
import { config } from './Configuracion/config.js';
import { logger } from './Configuracion/logger.js';
import { RutAutenticacion, RutaServidor, RutaProducto, RutaCarrito, RutaMensaje } from "./Rutas/index.js";
import { RutaInexistente } from './Middlewares/index.js';


const app = express();


const mongOptiones = { useNewUrlParser: true, useUnifiedTopology: true }

//? Sesion Mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.BASEDATOS_MONGO_URL,
            dbName: process.env.BASEDATOS_MONGO_NOMBRE,
            mongOptiones,
            ttl: process.env.TTL_SESION,
            collectionName: 'sesionesMC',
            autoRemove: 'native'
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        rolling: false,
        cookie: {
            maxAge: 600000,
        },
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + 'uploads'));

//? Seleccion del modo Env
if (config.SERVER.NODE_ENV == 'Desarrollo') app.use(cors())

//? Passport
PassportAutenticacion.iniciar()
app.use(passport.initialize());
app.use(passport.session());

//? Motor de plantilla
app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));

app.set('view engine', 'hbs')
app.set('views', './public/Vistas');


//? Yargs
const yargs = _yargs(hideBin(process.argv));
const args = yargs
    .default({
        modo: "FORK",
        puerto: 8080,
    })
    .alias({
        m: "modo",
        p: "puerto",
    })
    .argv;

export const PUERTO = config.SERVER.PUERTO || args.puerto


// const LOGGER = args.logger || DEV


//? Instancias de las rutas
const RutaAutenticacion = new RutAutenticacion();
const RutaCarritos = new RutaCarrito();
const RutaProductos = new RutaProducto();
const RutaMensajeria = new RutaMensaje();

//? Rutas del proyecto
app.use('/api/', RutaServidor);
app.use('/api/autenticacion', RutaAutenticacion.start());
app.use('/api/carrito', RutaCarritos.start());
app.use('/api/productos', RutaProductos.start());
app.use('/api/chat', RutaMensajeria.start());
app.use('/api/*', RutaInexistente);


//? Modo de ejecucion 
if (process.env.MODO_CLUSTER == true) {  // args.modo == 'CLUSTER' 
    if (cluster.isPrimary) {
        logger.info('Ejecucion en Modo Cluster')
        logger.info(`Primario corriendo con el id: ${process.pid} -- Puerto ${args.puerto}`);

        for (let i = 0; i < INFO_UTILS.procesadoresdCpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', worker => {
            logger.info(`El trabajador con el id:${worker.process.pid} ha finalizado.`, new Date().tolocaleString());
            cluster.fork();
        });
    } else {
        //? Servidor
        app.listen(PUERTO, async () => {
            logger.info(`Servidor escuchando en el puerto: ${PUERTO}, Trabajador iniciado con el id: ${process.pid}`);
            try {
                await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
                logger.info("Conectado a Base de Datos Mongo");
            } catch (error) {
                logger.error(`Error en conexión de Base de datos: ${error}`);
            }
        })
        app.on("error", (error) => logger.error(`Error en servidor ${error}`));
    }
} else {
    logger.info('Ejecucion en Modo Fork')
    logger.warn(`Prueba implementada, xd`)

    //? Servidor
    app.listen(PUERTO, async () => {
        logger.info(`Servidor escuchando en el puerto: ${PUERTO}, Trabajador iniciado con el id: ${process.pid}`);
        try {
            await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
            logger.info("Conectado a Base de Datos Mongo");
        } catch (error) {
            logger.error(`Error en conexión de Base de datos: ${error}`);
        }
    })
    app.on("error", (error) => logger.error(`Error en servidor ${error}`));
}

export { app };