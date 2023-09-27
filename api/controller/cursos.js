import { con} from "../db/atlas.js";
import { ObjectId } from "mongodb";

export async function getCursos(req, res) {
    try {
        let db = await con();
        let colleccion = db.collection("curso");
        let results = await colleccion.find({}).sort({ fecha_creacion: 1 }).toArray();
        results.length > 0 ? res.send(results).status(200) : res.status(404).send({ status: 404, message: "No Encontrado" })

    } catch (error) {
        console.log(error); 
        res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
}

export async function getCursoNom(req, res) {
    try {
        const db = await con();
        const collection = db.collection("curso");
        const CursosNom =req.params.nombre;
        console.log(CursosNom);
        const Cursos = await collection.findOne({ nombre:CursosNom });

        if (!Cursos) {
            return res.status(404).send({ status: 404, message: "Cursos no encontrado" });
        }
        res.status(200).json(Cursos);
    
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: "Error interno del servidor" });
    }
};

export async function postCursos(req, res){
    try{
        let db = await con();
        let colleccion = db.collection("curso");
        let data = req.body;
        const newCursos = {
            _id: new ObjectId(),
            ...data,
            fecha_creacion:new Date(req.body.fecha_creacion),
        };
        await colleccion.insertOne(newCursos);
        res.status(201).send({ status:201, message: "Created" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
};

export async function deleteCursos(req, res){
    try{
        let db = await con();
        console.log("connect delete");
        let colleccion = db.collection("curso");
        const CursosId = parseInt(req.params.id);
        const Cursos = await colleccion.findOne({ id: CursosId });

        if (!Cursos) {
            return res.status(404).send({ status: 404, message: "Cursos no encontrado" });
        }
        const deletionResult = await colleccion.deleteOne({ id: CursosId });
        //console.log(deletionResult);
        res.status(200).send({ status:200, message: "Deleted" });
    
    } catch (error) {
        console.error(error);
        res.status(500).send({ status:500, message: "Internal Server Error" });
    }
};