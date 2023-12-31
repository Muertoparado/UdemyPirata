//import Login from '../storage/dtoLogin.js'
import bcrypt from 'bcrypt';
import { hashPassword} from './acceso.js';
import {con} from '../db/atlas.js'
import {generateSalt} from './acceso.js'
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';
import { createToken } from '../limit/token.js';

export async function registerlogin(req, res) {
	const { name, password, email } = req.body;
	//let data = req.body;
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) return res.status(401).json({ errores: errors.array() });
	
	try {
		const db = await con();
		let colleccion = db.collection("login");
		let usuarios = db.collection("usuario");
		// Generar una sal segura
		const salt = generateSalt();
		// Generar un hash de contraseña seguro
		const hashedPassword = await hashPassword(password, salt);
	
		const newlogin = {
            _id: new ObjectId().toString(),
			name: name,
			email: email,
			password: hashedPassword, // Include only the hashed password
			rol:'Estudiante'
    };
		console.log("Inserting document:", newlogin);
        await colleccion.insertOne(newlogin);
		
		const newUser = {
			_id: new ObjectId(),
			name:name,
			email: email,
		}
		console.log("Inserting document:", newUser);
		await usuarios.insertOne(newUser);

	if (newlogin) {
		console.log("enviado");
		return res.status(201).json(newlogin);
	} else {
	return res.status(500).json({
		message: "Login not created",
	});
	}
} catch (err) {
	if (err.code === 121) {
		err.errInfo.details.clausesNotSatisfied.forEach(clause => {
            console.log(clause.details);
        });}
	console.error("Error al insertar documento:", err);
	if (err.code === 11000) {
		return res.status(400).json({ message: "El correo electrónico ya está en uso" });
	} else if (err.code === 121) {
	// Handle validation error more explicitly
		return res.status(400).json({ message: "Documento no válido. Verifique los datos enviados." });
	}
		return res.status(500).json({ message: err.message });
  }
}

export async function logIn (req, res){	
	const { email, password } = req.body;

	try{

	const db = await con();
	let colleccion = db.collection("login");
	const login = await colleccion.findOne({email });
		console.log(login);
	if (!login) {
		return res.status(401).json("login not found");
	}

	const isPasswordValid = await bcrypt.compare(password, login.password);

	if (!isPasswordValid) {
		return res.status(401).json({ message: "Contraseña incorrecta" });
}

	if (await bcrypt.compare(password, login.password)) {
		const token = await createToken(login);
		res.cookie("jwt", token, { httpOnly: true, expires: 0 }); // La cookie expirará cuando se cierre el navegador
			return res.status(200).json({ token, rol:login.rol });
}
	res.status(401).json("Wrong credentials!");
}catch(error){
		console.error(error); // Log the error to the console
		return res.status(500).json({ message: "Error interno del servidor" });
}
}	

export async function changePassword (req, res) {
	const { email,password } = req.body;
	const db = await con();
	let colleccion = db.collection("login");
	const login = await colleccion.findOne({email });
	if (!login) {
		return res.status(401).json("login not found");
	}
	if (!password || typeof password !== "string") {
		return res.status(400).json({
			message: "Invalid Password"
		});
	}
	const _id = login._id;
	const hasedPassowrd = await bcrypt.hash(
		password,
		parseInt(process.env.BCRYPT_SALT)
	);

	try {
		const updatedlogin = await colleccion.updateOne(
			{ _id },
			{
				$set: { password: hasedPassowrd }
			}
		);
		res.status(200).json(updatedlogin);
	} catch (error) {
			return res.status(500).json({
			message: "Server Error"
		});
	}
}

export async function logout (req, res) {
	res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out" });
}

export async function assignRoleToUser(username, role) {
	try {
		const db = await con();
		const user = await db.collection('login').findOne({ email: username });

		if (!user) {
		console.log(`Usuario ${username} no encontrado.`);
		return;
		}
		db.adminCommand({
		createUser: user.name,
		pwd: user.password,
		roles: [ { role: role, db: process.env.ATLAS_DB } ]
		});

		console.log(`Rol ${role} asignado al usuario ${username}.`);
	} catch (err) {
		console.error("Error al asignar rol:", err);
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