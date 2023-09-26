import bcrypt from 'bcryptjs';
export default class Login {
  constructor(name, email, password) {
      this.name = name;
      this.email = email;
      this.password = password; // Asigna la contraseña hasheada directamente aquí
  }
}