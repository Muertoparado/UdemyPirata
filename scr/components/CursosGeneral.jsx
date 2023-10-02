
import React, { useState, useEffect } from 'react';

export default function CursosGeneral(token) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Crear el socket WebSocket
    /*const socket = new WebSocket('wss://127.0.0.1:5900/ws');
  
    // Manejar los eventos del socket WebSocket
    socket.onerror = (error) => {
      console.error('WebSocket connection error:', error);
    };
  
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
  
    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };*/

    // Realizar la consulta a la API
    const response = fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursos`, {
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
          setCursos(data);
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