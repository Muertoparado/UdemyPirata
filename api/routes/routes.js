import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {loginUser,regLogin} from '../storage/dtoLogin.js';
import { registerlogin,changePassword,logIn,logout } from "../controller/registrar.js";
import { getCursoNom, getCursos } from "../controller/cursos.js";
import { limitQuery } from "../limit/config.js";

function configurarApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({
        secret: process.env.JWT_PRIVATE_KEY,
        resave: false,
        saveUninitialized: false,
      }));
    return app;
}
const appLogin = configurarApp();
const appBack = configurarApp();
const appUtil = configurarApp();

appLogin.post("/",limitQuery(),loginUser,logIn);
appLogin.post("/register",limitQuery(),regLogin,registerlogin);
appLogin.post("/cpass",limitQuery(),changePassword);
appLogin.post("/logout",logout);

appBack.get("/cursos",limitQuery(),getCursos);//ordenados nombre
appBack.get("/cursos/fecha",limitQuery())//ordenados por fechas 
appBack.get("curso/:nombre",limitQuery(),getCursoNom);//curso nombre
appBack.get("/cursos/:autor",limitQuery()); //busqueda por autor
appBack.post("/curso/:autor/comentario",limitQuery())//agregar comentario curso (implementar estrallas)
appBack.get("/educador",limitQuery())//seccion educador 
appBack.get("/educador/miscursos",limitQuery())//cursos educador
appBack.post("/educador/modulo",limitQuery())//subir curso por modulo
appBack.post("/educador/:curso/:modulo",limitQuery())//editar modulo espcifico
appBack.get("/educador/estudiantes",limitQuery())//de la parte de educador quienes estan recibiendo clases
appBack.get("/estudiantes/cursos",limitQuery());//ver cursos de cada usuario
appBack.get("/estudiantes/historial",limitQuery())//ver ultima seccion vista 


appUtil.get("/skill",limitQuery()) //palabras clave busqueda

export {
    appLogin,
    appBack,
    appUtil
}