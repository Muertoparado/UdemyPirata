import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
//import { saveRol,checkPermissions } from './middleware/midd.js';
import { appBack, appLogin } from './routes/routes.js';
import { verifyTokenMiddleware } from './limit/token.js';


dotenv.config();

let app = express();

app.use(express.json());
app.use(cookieParser());

//app.use(saveRol);
app.use("/login",appLogin);
app.use("/curso",verifyTokenMiddleware,appBack);

let config = JSON.parse(process.env.MY_SERVER);

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});