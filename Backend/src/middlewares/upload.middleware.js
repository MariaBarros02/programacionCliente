import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __nombreArchivo = fileURLToPath(import.meta.url);
const __directorioArchivo = path.dirname(__nombreArchivo);

const almacenimiento = multer.diskStorage({
    destination: function(req, file, cb){
        const uploadPath = path.join(__directorioArchivo, "../public/uploads")
        fs.mkdirSync(uploadPath, {recursive: true});
        cb(null, uploadPath);
    },
    filename: function(req, file, cb){
        const sufijoUnico = Date.now() + "-" + Math.round(Math.random()*1E9);
        cb(null, sufijoUnico + path.extname(file.originalname));
    }
})

const filtroArchivos = (req, file, cb) =>{
    const tiposPermitidos = ["image/jpg", 'image/png', 'image/jpg', 'image/webp' ];
    if (tiposPermitidos.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(new Error ('Solo se permite imágenes (JPEG, PNG, JPG, WEBP)'), false);

    }
}

const archivo = multer({
    storage: almacenimiento,
    fileFilter: filtroArchivos,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export const cargarUnArchivo = archivo.single('logoEmpresa')