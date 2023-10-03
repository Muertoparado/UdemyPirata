import React from 'react';
import Card from 'react-bootstrap/Card';
import curso from './CursosGeneral.jsx'
const Curso = ({ curso }) => {
    
  return (
    <Card>
      <Card.Body>
        <Card.Title>{curso.nombre}</Card.Title>
        <Card.Text>
          {curso.descripcion}
          <p>ID del curso: {curso.id}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Curso;