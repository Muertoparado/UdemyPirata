import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import {loginUser,regLogin} from '../storage/dtoLogin.js';
import { registerlogin,changePassword,logIn,logout, assignRoleToUser } from "../controller/registrar.js";
import { calcularPromedioEstrellas, getCursoId, getCursoNom, getCursosf, getCursosn, getcAutor, postCom } from "../controller/cursos.js";
import { limitQuery } from "../limit/config.js";
import { getAllUsers, updateUserRole } from "../controller/superAdmin.js";
import { getCursosEduador, postModulo, postNewCurso, updateModulo } from "../controller/educador.js";
import { getCursosUser, postAgregarCurso, postUltimoModulo, updateModuloVisto } from "../controller/estudiantes.js";
import { contarUsuariosPorCursos, getPalabrasClave, insertarAvatar } from "../controller/utill.js";

function configurarApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
  //  app.use(session({
//        secret: process.env.JWT_PRIVATE_KEY,
 //       resave: false,
 //       saveUninitialized: false,
 //     }));
    return app;
}
const appLogin = configurarApp();
const appBack = configurarApp();
const appUtil = configurarApp();

appLogin.post("/",limitQuery(),loginUser,logIn);
appLogin.post("/register",limitQuery(),regLogin,registerlogin);
appLogin.post("/cpass",limitQuery(),changePassword);
appLogin.post("/logout",logout);
appLogin.get("/superadmin",limitQuery(),getAllUsers);
appLogin.post("/superadmin/roles",limitQuery(), updateUserRole);


appBack.get("/cursos",getCursosn);//ordenados nombre
appBack.get("/cursos/fecha",limitQuery(),getCursosf)//ordenados por fechas 
appBack.get("curso/:nombre",limitQuery(),getCursoNom);//curso nombre
appBack.get("/cursos/:autor",limitQuery(),getcAutor); //busqueda por autor
appBack.post("/curso/:autor/comentario",limitQuery(),postCom)//agregar comentario autor curso (implementar estrallas)
appBack.get("/cursoid/:id",limitQuery(),getCursoId);

appBack.post("/educador",limitQuery(),postNewCurso)//seccion educador 
appBack.get("/educador/miscursos",limitQuery(),getCursosEduador)//cursos educador
appBack.post("/educador/modulo",limitQuery(),postModulo)//subir curso por modulo
appBack.put("/educador/:curso/:modulo",limitQuery(),updateModulo)//editar modulo espcifico
appBack.get("/educador/estudiantes",limitQuery())//de la parte de educador quienes estan recibiendo clases

appBack.get("/estudiantes/cursos",limitQuery(),getCursosUser);//ver cursos de cada usuario
appBack.get("/estudiantes/historial",limitQuery(), updateModuloVisto)//ver ultima seccion vista 
appBack.post("/estudiantes/agregarcurso",limitQuery(),postAgregarCurso)//agregar cursos como estudiante
appBack.post("/estudiantes/:idUsuario/:idModulo",limitQuery(),postUltimoModulo)//guardar el ultimo modulo visto

appUtil.get("/skill",getPalabrasClave) //palabras clave busqueda
appUtil.get("/nestudiantes",contarUsuariosPorCursos)//ver cuantos han tomado el curso
appUtil.get("/estrellas",calcularPromedioEstrellas)//estrellas de un curso
appUtil.get("/avatar",insertarAvatar)//agregar avatar usuario
export {
    appLogin,
    appBack,
    appUtil
}