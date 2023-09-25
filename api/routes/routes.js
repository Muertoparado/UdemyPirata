import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
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

const appBack = configurarApp();

appBack.get();

export {
    appBack
}