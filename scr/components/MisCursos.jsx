import React, { useState, useEffect } from 'react';
import '../styles/styles.css'
import { Link } from 'react-router-dom';
import CursoEspecifico from './CursoEspecifico.jsx';
//import { useNavigate } from 'react-router-dom';
export default function MisCursos() {
  const [isExpanded, setExpanded] = useState(false);
  const [misCursos, setMisCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const email='est@ejemplo.com'
    fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/estudiantes/cursos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(async (response) => {
        if (!response.ok) {
            console.log(response.status, response.statusText);
        } else {
            const data = await response.json();
            console.log(data);
            setMisCursos(data);
            setLoading(false);
        }
    })
    .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
    });
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
    {misCursos.map((curso) => (
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