import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const CursoEspecifico = (props) => {
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursoid/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setCurso(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCurso();
  }, [id]);

  const saveCurso = async (CursoId) => {
    try {
      const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/estudiantes/agregarcurso`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: location.state.userId,
          cursoId: CursoId,
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      // Curso guardado exitosamente
      console.log('Curso guardado');
    } catch (error) {
      console.error(error);
    }
  };

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
          <button className='btn btn-primary' onClick={() => saveCurso(curso._id)}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default CursoEspecifico;
