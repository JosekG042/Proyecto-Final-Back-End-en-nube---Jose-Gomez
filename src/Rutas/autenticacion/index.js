
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Autenticacion |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import passport from "passport";
import { Router } from "express";
import { logger } from '../../Configuracion/logger.js';
import { estaAutenticado } from "../../Middlewares/index.js";
import { subirImg } from '../../Utilidades/index.js';
import { ControladorAutenticacion } from "../../Controladores/index.js";

const ruta = Router();


class RutAutenticacion {
    constructor() {
        this.controladorAuth = new ControladorAutenticacion();
    }

    start() {
        //? Home
        ruta.get("/", estaAutenticado, (solicitud, respuesta) => {
            respuesta.render("view/login");
        });

        //? Inicio Sesion
        ruta.get("/login", estaAutenticado, (solicitud, respuesta) => {
            respuesta.render("view/login");
        });

        ruta.post("/login", passport.authenticate("login", {
            successRedirect: "/api/autenticacion",
            failureRedirect: "/api/autenticacion/error-login"
        }));

        //? Registrarse
        ruta.get("/signup", estaAutenticado, (solicitud, respuesta) => {
            respuesta.render("view/signup");
        });

        ruta.post("/signup", subirImg.single('avatar'), passport.authenticate("signup", {
            successRedirect: "/api/autenticacion",
            failureRedirect: "/api/autenticacion/error-signup"
        }));

        //? Cerrar Sesion
        ruta.get("/logout", this.controladorAuth.desloguearse);

        //? Rutas Errores
        ruta.get("/error-login", (solicitud, respuesta) => {
            logger.error("Error en login")
            respuesta.render("view/error-login", {});
        });

        ruta.get("/error-signup", (solicitud, respuesta) => {
            logger.error("Error en signup")
            respuesta.render("view/error-signup", {});
        });

        return ruta
    }
}

export { RutAutenticacion };
