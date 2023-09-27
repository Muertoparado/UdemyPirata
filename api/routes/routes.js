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
        secret: process.env.JWT_PRIVATE_KEY, // Cambia esto por una clave secreta más segura
        resave: false,
        saveUninitialized: false,
      }));
    return app;
}
const appLogin = configurarApp();
const appBack = configurarApp();
//const appUtil = configurarApp();

appLogin.post("/",limitQuery(),loginUser,logIn);
appLogin.post("/register",limitQuery(),regLogin,registerlogin);
appLogin.post("/cpass",limitQuery(),changePassword);
appLogin.post("/fin",logout);

appBack.get("/react",limitQuery(),getCursos);
appBack.get("/:nombre",limitQuery(),getCursoNom);


export {
    appLogin,
    appBack
}