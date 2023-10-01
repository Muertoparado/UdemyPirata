import { con } from "../db/atlas.js";

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

export async function updateUserRole(req, res) {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const db = await con();
    const result = await db.collection('login').updateOne(
      { _id: userId },
      { $set: { role: role } }
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
}
