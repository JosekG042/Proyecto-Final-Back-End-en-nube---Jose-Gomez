
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Multer - Utils |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import multer from 'multer';


const myStorage = multer.diskStorage({
    destination: (solicitud, file, cb) => {
        cb(null, 'public/Uploads')
    },
    filename: (solicitud, file, cb) => {
        const nombreArchivo = `${Date.now()}-${file.originalname}`
        cb(null, nombreArchivo);
    }
})

export const subirImg = multer({ storage: myStorage })

