
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Middleware Autenticacion |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


const estaAutenticado = (solicitud, respuesta, next) => {
    if (solicitud.isAuthenticated())

        return respuesta.render("view/home", {
            nombre: solicitud.user.nombre,
            usuario: solicitud.user.usuario,
            edad: solicitud.user.edad,
            avatar: solicitud.user.avatar,
            telefono: solicitud.user.telefono,
            direccion: solicitud.user.direccion,
            contraseña: solicitud.user.contrasena,
            carritoID: solicitud.user.idCarrito
        });
    next()
}

export { estaAutenticado };


