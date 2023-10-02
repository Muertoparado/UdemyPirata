import React, { useState, useEffect } from "react";
import fetchCursos from "./api";

const CursosGeneral = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursosData = async () => {
      const data = await fetchCursos();
      setCursos(data);
    };

    fetchCursosData();
  }, []);

  if (cursos.length === 0) {
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
};

export default CursosGeneral;