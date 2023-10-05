import { con } from "../db/atlas.js";
import { ObjectId } from "mongodb";

export async function getAllUsers(req, res) {
  try {
    const db = await con();
    const users = await db.collection('login').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ message: err.message });
  }
}
/*
export async function updateUserRole(req, res) {
  let data = req.body;

  const { userId, role } = data;
  try {
    const db = await con();
    const result = await db.collection('usuario').updateOne(
      { _id: userId },
      { $set: { rol: role } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Rol actualizado correctamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error("Error al actualizar el rol del usuario:", err);
    res.status(500).json({ message: err.message });
  }
}*/
export async function updateUserRole(req, res) {
  // Obtenemos la data de la solicitud HTTP.
  const data = req.body;

  // Verificamos que la propiedad userId esté presente en el objeto data.
  if (!data.userId) {
    // La propiedad userId no está presente en el objeto data.
    res.status(400).json({ message: 'Error en la data de la solicitud' });
    return;
  }

  // Convierte el userId a un objeto ObjectId.
  const userId = new ObjectId(data.userId);

  // Creamos el documento de actualización.
  const updateDocument = {
    $set: {
      rol: data.role,
    },
  };

  // Actualizamos el rol del usuario.
  const db = await con();
  const result = await db.collection('usuario').updateOne(
    { _id: userId },
    updateDocument
  );

  if (result.modifiedCount === 1) {
    // El rol se actualizó correctamente.
    res.status(200).json({ message: 'Rol actualizado correctamente' });
  } else {
    // El usuario no se encontró.
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}