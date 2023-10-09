/*
import React, { useState, useEffect } from 'react';
import  { useContext } from 'react';
import { TokenContext } from '../main.jsx';
import '../styles/styles.css'
import Curso from './CursoEspecifico.jsx';

export default function CursosGeneral() {
  const token = useContext(TokenContext);
  const [isExpanded, setExpanded] = useState(false);
  const [eduCurso, setEduCurso] = useState([]);
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
          setEduCurso(data);
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
    };
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

          <Link to={`/curso-especifico/${curso.id}`}>
            <button>Ver más</button>
          </Link>

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


/*import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";

export default function CursosGeneral() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery("cursos", () => fetchCursosDefault({ url: `http://127.1.1.1:5900/curso/cursos` }));

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (query.status === "success") {
      setCursos(query.data);
      setIsLoading(false);
    }
  }, [query]);

  if (isLoading) {
    return <p>Cargando cursos...</p>;
  }

  return (
    <div>
      {cursos.map((curso) => (
        <div key={curso.id}>
          <h2>{curso.nombre}</h2>
          <p>{curso.descripcion}</p>
          <img src={curso.imagen} alt={curso.nombre} />
        </div>
      ))}
    </div>
  );
}

function fetchCursosDefault({ url }) {
  return fetch(url);
}
*/

import React, { useState, useEffect } from 'react';
import  { useContext } from 'react';
import { TokenContext } from '../main.jsx';
import '../styles/styles.css'
//import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import CursoEspecifico from './CursoEspecifico.jsx';
export default function CursosGeneral() {
 // const token = useContext(TokenContext);
  const [isExpanded, setExpanded] = useState(false);
  const [eduCurso, setEduCurso] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Realizar la consulta a la API
    const response = fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursos`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
  //      'Authorization': `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        // Manejar la respuesta de la API
        if (!response.ok) {
          console.log(response.status, response.statusText);
        } else {
          const data = await response.json();
          console.log(data);
          setEduCurso(data);
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
    return (
      <div className='cargando m-5'>
      <img src='../../img/561596a5d8eb1d67f92a7dd8c00894d5.gif' />
      <p className='justify-content-center m-2'>Cargando cursos...</p>
    </div>
    );
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

          <Link to={`./CursoEspecifico/${curso._id}`}>
            <button onClick={() => setExpanded(curso._id)}>Ver más</button>
          </Link>

          {isExpanded === curso._id && (
            <Link to={`./CursoEspecifico/${curso._id}`}>
              <CursoEspecifico curso={curso} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
