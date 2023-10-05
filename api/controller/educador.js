import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";
export async function postModulo(req, res){
    try{
        let db = await con();
        let colleccion = db.collection("curso");
        let data = req.body;
        const newModulo = {
            _id: new ObjectId(),
            ...data.modulo,
        };
        await colleccion.updateOne(
            { _id: ObjectId(data.idCurso) },
            { $push: { modulos: newModulo } }
        );
        res.status(201).send({ status:201, message: "Created" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
}

export async function postNewCurso(req, res) {
    // Obtenemos la conexión a MongoDB.
    let db = await con();
  
    // Obtenemos la colección de cursos.
    let colleccion = db.collection("curso");
  
    // Obtenemos el documento JSON del curso.
    const documento = req.body;
  
    // Creamos un objeto `newCurso` vacío.
    const newCurso = {
      _id: new ObjectId(),
      // Eliminamos la clave `modulos` del documento JSON.
      ...documento,
      modulos: {},
    };
  
    // Insertamos el objeto `newCurso` en la colección.
    await colleccion.insert(newCurso);
  
    // Devolvemos un mensaje de éxito.
    res.status(201).send({ status:201, message: "Created" });
  }

/*
export async function postNewCurso(req, res){
    try{
        let db = await con();
        let colleccion = db.collection("curso");
        let data = req.body;
        const newCurso = {
            _id: new ObjectId(),
            ...data,
            modulos: {},
            comentarios: {},
            palabrasClave: {},
        };
        await colleccion.insert(newCurso);
        res.status(201).send({ status:201, message: "Created" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
}*/



export async function getCursosEduador(req, res) {
    try {
        const db = await con();
        const collection = db.collection("curso");
        const CursosNom =req.params.autor;
        console.log(CursosNom);
        const Cursos = await collection.findOne({ autor:CursosNom });

        if (!Cursos) {
            return res.status(404).send({ status: 404, message: "Cursos no encontrado" });
        }
        res.status(200).json(Cursos);
    
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Error interno del servidor" });
        }
    }

export async function updateModulo(req, res){
    try{
        let db = await con();
        let colleccion = db.collection("curso");
        let data = req.body;
        const updatedModulo = {
            ...data.modulo,
        };
        await colleccion.updateOne(
            { _id: ObjectId(data.idCurso) },
            { $set: { [`modulos.${data.moduloIndex}`]: updatedModulo } }
        );
        res.status(200).send({ status:200, message: "Updated" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
}





