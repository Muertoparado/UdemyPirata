import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";


export async function getCursosUser(req){
    const { email } = req.body;
    try {
        let db = await con();
        let colleccion = db.collection("usuario");
        let user = await colleccion.findOne({
            email: email
        });
        return user.cursos;
    } catch (error) {
        console.error(error);
    }
}


export async function updateModuloVisto(req, res){
    try{
        let db = await con();
        let colleccion = db.collection("usuario");
        let data = req.body;
        const historial = {
            modulo: data.idModulo,
            fecha: new Date()
        };
        await colleccion.updateOne(
            { _id: ObjectId(data.idUsuario) },
            { $push: { historial: historial }, $set: { ultimoModuloVisto: data.idModulo } }
        );
        res.status(200).send({ status:200, message: "Updated" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
}

export async function postUltimoModulo(idUsuario, idModulo) {
    try {
        let db = await con();
        let colleccion = db.collection("usuario");
        const historial = {
            modulo: idModulo,
            fecha: new Date()
        };
        await colleccion.updateOne(
            { _id: ObjectId(idUsuario) },
            { $push: { historial: historial }, $set: { ultimoModuloVisto: idModulo } }
        );
        console.log("Último módulo visto guardado con éxito");
    } catch (error) {
        console.error("Error al guardar el último módulo visto:", error);
    }
}
export async function postAgregarCurso(req) {
    const {email,cursoId}=req.body
    try {
        let db = await con();
        let colleccion = db.collection("usuario");
        await colleccion.updateOne(
            { email: email },
            { $push: { cursos: cursoId } }
        );
        console.log("Nuevo curso agregado con éxito");
    } catch (error) {
        console.error("Error al agregar el nuevo curso:", error);
    }
}




