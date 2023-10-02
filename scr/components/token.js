import { jwtVerify } from 'jose';

const verifyToken = async (token) => {
  // Validar el token con la biblioteca jose
  const isValidToken = await jwtVerify(token, process.env.JWT_SECRET_KEY);

  // Devolver un objeto con la información de la validación
  return {
    isValidToken,
    error: isValidToken ? '' : 'Token no válido',
  };
};

export default verifyToken;