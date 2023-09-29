//appBack.get("/estudiantes/cursos",limitQuery());//ver cursos de cada usuario
//appBack.get("/estudiantes/historial",limitQuery())//ver ultima seccion vista 

import { con } from "../db/atlas";

export async function estuCursos(){
    try {
        const db = await con();
		let colleccion = db.collection("login");
        
    } catch (error) {
        
    }
}