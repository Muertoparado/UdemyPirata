import fetch from "node-fetch";

export const fetchCursos = async () => {
  const authToken = req.cookies.jwt;

  const response = await fetch(
    `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/cursos/`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};