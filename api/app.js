import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
//import { saveRol,checkPermissions } from './middleware/midd.js';
import { appBack, appLogin } from './routes/routes.js';
import { verifyTokenMiddleware } from './limit/token.js';
import cors from 'cors'

dotenv.config();

let app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true,
}))
//app.use(saveRol);
app.use("/login",appLogin,cors({ origin: '*' }));
app.use("/curso",verifyTokenMiddleware,appBack);

let config = JSON.parse(process.env.MY_SERVER);

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});