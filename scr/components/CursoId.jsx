import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useUser } from './UserContex.jsx';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
const CursoEspecifico = (props) => {
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  let user = 'est@ejemplo.com';

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
    const user = 'est@ejemplo.com';
    try {
        const response = await fetch(
            `http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/curso/cursoid/${id}`,
            {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user,
            cursoId: CursoId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      setShowModal(true);
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
        <div >
          
          <Dropdown>
            <Dropdown.Toggle className='drop m-2 p-4' variant="success" id={`dropdown-module-${index}`}>
            <p>{modulo.titulo}</p>
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
            <div className=' p-5 m-5'>
              <img src={curso.imagen} alt={curso.nombre} />
              <h2>{curso.nombre}</h2>
              <p>{curso.descripcion}</p>
              
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