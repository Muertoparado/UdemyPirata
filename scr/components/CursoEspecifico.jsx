import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';

const CursoEspecifico = (props) => {
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(
          `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursoid/${id}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

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

  if (error) {
    return <p>Error: {error}</p>;
  }
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
  const renderModules = () => {
    if (!curso || !curso.modulos || !Array.isArray(curso.modulos) || curso.modulos.length === 0) {
      return <p>No hay módulos disponibles</p>;
    }
  
    return curso.modulos.map((modulo, index) => (
      <Col key={index} sm={4}>
        <div className='drop m-2 '>
          <h3>{modulo.titulo}</h3>
          <Dropdown>
            <Dropdown.Toggle variant="success" id={`dropdown-module-${index}`}>
              Clases
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {modulo.clases && modulo.clases.length > 0 ? (
                modulo.clases.map((clase, claseIndex) => (
                  <Dropdown.Item key={claseIndex}>
                    <Button variant="link" href={clase.titulo} target="_blank">
                      <p>{clase.titulo}</p>
                    </Button>
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item>No hay clases disponibles</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
    ));
  };
  
  return (
    <Container>
      <Row>
        <Col sm={8}>
          {curso && (
            <div className='card p-5 m-5'>
              <img src={curso.imagen} alt={curso.nombre} />
              <h2>{curso.nombre}</h2>
              <p>{curso.descripcion}</p>
              <button className='btn btn-primary' onClick={() => saveCurso(curso._id)}>Guardar</button>
            </div>
          )}
        </Col>
        <Col sm={4}>
          {renderModules()}
        </Col>
      </Row>
    </Container>
  );
};

export default CursoEspecifico;