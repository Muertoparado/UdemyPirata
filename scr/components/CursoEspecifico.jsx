/*
import React, { useState, useEffect, useParams } from 'react';


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

  const Curso = ({ curso }) => {
    return (
      <div>
        <h3>Información del curso</h3>
        <ul>
          <li>Nombre: {curso.nombre}</li>
          <li>Descripción: {curso.descripcion}</li>
          <li>Autor: {curso.autor}</li>
          <li>Fecha de creación: {curso.fecha_creacion}</li>
          <li>Palabras clave: {curso.palabrasClave}</li>
        </ul>
        <h3>Modulos</h3>
        {curso.modulos && (
          <ul>
            {curso.modulos.videos.map((video) => (
              <li key={video.id}>
                <h4>{video.Titulo}</h4>
                <p>
                  <a href={video.video}>Ver video</a>
                </p>
                <ul>
                  {video.links && video.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.value}>{link.key}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <h3>Comentarios</h3>
        {curso.comentarios && (
          <ul>
            {curso.comentarios.map((comentario) => (
              <li key={comentario.id}>
                {comentario.comentario}
                <p>
                  <strong>Estrellas: </strong>
                  {comentario.estrellas}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      {curso && (
        <div className='card p-5 m-5'>
          <img src={curso.imagen} alt={curso.nombre} />
          <h2>{curso.nombre}</h2>
          <p>{curso.descripcion}</p>
          <Curso curso={curso} />
        </div>
      )}
    </div>
  );
};

export default CursoEspecifico;

*/

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CursoEspecifico = () => {
  const [curso, setCurso] = useState();
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursoid/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (response) => {
      if (!response.ok) {
        console.log(response.status, response.statusText);
      } else {
        const data = await response.json();
        console.log(data);
        setCurso(data);
      }
    })
    .catch((error) => {
      console.log(error);
      setError(error.message);
    });
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {curso && (
        <div className='card p-5 m-5'>
          <img src={curso.imagen} alt={curso.nombre} />
          <h2>{curso.nombre}</h2>
          <p>{curso.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default CursoEspecifico;
