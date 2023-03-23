
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Validador Bcrypt |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import bcrypt from 'bcryptjs';


const crearContraHash = contraseña => bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null)

const validarContraseña = (usuario, contraseña) => bcrypt.compareSync(contraseña, usuario.contraseña)


export const BCRYPT_VALIDADOR = { crearContraHash, validarContraseña };
