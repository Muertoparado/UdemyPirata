import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";

export async function getPalabrasClave(palabrasClave) {
    try {
        let db = await con();
        let colleccion = db.collection("cursos");
        const cursosRelacionados = await colleccion.find({ palabrasClave: { $in: palabrasClave } }).toArray();
        return cursosRelacionados;
    } catch (error) {
        console.error("Error al buscar cursos por palabras clave:", error);
        return [];
    }
}

export async function contarUsuariosPorCursos(curso) {
    try {
        let db = await con();
        let colleccion = db.collection("usuarios");
        const contador = await colleccion.countDocuments({ cursos: { $in: curso } });
        return contador;
    } catch (error) {
        console.error("Error al contar usuarios por cursos:", error);
        return 0;
    }
}

export async function insertarAvatar(idUsuario, urlImagen) {
    try {
      // Actualiza el documento del usuario en la colección "usuarios" con la URL de la imagen
      let db = await con();
      let colleccion = db.collection("usuarios");
      await colleccion.updateOne(
        { _id: ObjectId(idUsuario) },
        { $set: { imagen: urlImagen } }
      );
  
      console.log("Imagen del usuario insertada con éxito");
    } catch (error) {
      console.error("Error al insertar la imagen del usuario:", error);
    }
  }
  