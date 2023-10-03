import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CursoEspecifico = ({ id }) => {
  const [curso, setCurso] = useState();

  useEffect(() => {
    const response = fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursoid/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log(response.status, response.statusText);
        } else {
          const data = await response.json();
          setCurso(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {curso && (
        <Curso curso={curso} />
      )}
      <button onClick={() => window.history.back()}>Volver</button>
    </div>
  );
};

export default CursoEspecifico;
