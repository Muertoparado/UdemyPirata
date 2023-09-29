import { body } from "express-validator";


const titulo= body("titulo").trim().notEmpty().withMessage("Parametros vacios!!")
        .isString().withMessage("Tipo de dato incorrecto!")

const descripcion= body("email").trim().notEmpty().withMessage("Parametros vacios!!")
        .isEmail().withMessage("Parametro email invalido!")
        .isString().withMessage("Tipo de dato incorrecto!")
    
const palabrasc =  body("palabrasc").notEmpty().withMessage("Parametros vacios!!")
        .isString().withMessage("Tipo de dato incorrecto!")

const contenido= body("contenido").notEmpty().withMessage("Parametros vacios!!")
        .isString().withMessage("Tipo de dato incorrecto!")

const video = body("video")

//const modulo = [];


//const loginUser =[email,password];
//export {regLogin,loginUser};
