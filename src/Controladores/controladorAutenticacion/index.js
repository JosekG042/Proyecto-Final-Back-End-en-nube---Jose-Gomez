
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Autenticacion |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { ApiUsuarios } from '../../Api/index.js';
import { logger } from '../../Configuracion/logger.js';


class ControladorAutenticacion {
    constructor() {
        this.apiUsers = new ApiUsuarios()
    }

    desloguearse = async (solicitud, respuesta) => {
        try {
            const { email } = solicitud.user;

            solicitud.logout(error => {
                if (error) {
                    logger.error('Error al desloguearse');
                } else {
                    respuesta.render('view/logout', { email });
                }
            });
        } catch (error) {
            respuesta.render("view/error-forAll", { infoError: error, lugarError: 'USUARIOS' });
            logger.error(`${error}, Error en el logout`);
        }
    }
}

export { ControladorAutenticacion };



