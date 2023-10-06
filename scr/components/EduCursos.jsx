
import React, { useState, useEffect } from 'react';
import  { useContext } from 'react';
import { TokenContext } from '../main.jsx';
import '../styles/styles.css'
import Curso from './CursoEspecifico.jsx';

export default function eduCursos() {
  const token = useContext(TokenContext);
  const [isExpanded, setExpanded] = useState(false);
  const [eduCurso, seteduCurso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Realizar la consulta a la API
    const response = fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/educador/miscursos`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        // Manejar la respuesta de la API
        if (!response.ok) {
          console.log(response.status, response.statusText);
        } else {
          const data = await response.json();
          console.log(data);
          seteduCurso(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // Manejar el error de la API
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  /*
    // Devolver una función de limpieza para cerrar el socket WebSocket
    return () => {
      socket.close();
    };*/
  }, []);

  if (loading) {
    return <p>Cargando cursos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {eduCurso.map((curso) => (
        <div className='card p-5 m-5' key={curso.id}>
           <img src={curso.imagen} alt={curso.nombre} />
          <h2>{curso.nombre}</h2>
          <p>{curso.descripcion}</p>

          <button onClick={() => setExpanded(curso)}>
            {isExpanded === curso ? 'Ocultar' : 'Mostrar'}
          </button>

          {isExpanded === curso && (
          <Link to={`./CursoEspecifico/${curso.id}`}>
          
          <Curso curso={curso} />   
        </Link>
          )}

        </div>
      ))}
    </div>
  );
}
