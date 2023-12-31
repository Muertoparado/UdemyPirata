import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Asegúrate de tener react-bootstrap instalado

export default function SuperAdmin() {
  const [user,setUser]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Nuevo estado para controlar el modal
  const [updatedUser, setUpdatedUser] = useState(null); 


  const updateUserRole = async (userId) => {
    const userToUpdate = user.find(usuario => usuario._id === userId); // Encuentra el usuario que se está actualizando
    setUpdatedUser(userToUpdate); 
    try {
      const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login/superadmin/roles`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            rol: 'Educador',
        }),
    });

    if (response.ok) {
      setShowModal(true); // Muestra el modal cuando la respuesta es ok
   } else {
       alert("Nombre o contraseña erroneos!!");
   }
 } catch (error) {
   console.error(error);
 }
 }

  useEffect(() => {
    // Realizar la consulta a la API
    fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login/superadmin`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        // Manejar la respuesta de la API
        if (!response.ok) {
          console.log(response.status, response.statusText);
        } else {
          const data = await response.json();
          console.log(data);
          setUser(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // Manejar el error de la API
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
    }, [])

    if (loading) {
      return (
        <div className='cargando m-5'>
        <img src='../../img/Morphing dots loader.gif' />
        <p className='justify-content-center m-2'>Cargando Usuarios...</p>
      </div>
      );
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <video className="video-background" autoPlay muted loop>
        <source src="../../img/original-8c84d58757f2307620c18a5cd36e250f.mp4" type="video/mp4" />
      </video>
        <h1 className='text-center text-white mt  -5'>Usuarios Registrados</h1>
    <p className='text-center text-white'>Si desea actualizar a educador, dar click al boton actualizar.</p>
    {user.map((usuario) => (
      <div className='card p-5 m-5' key={usuario.id}>
        <h2>{usuario.email}</h2>
        <p>{usuario.rol}</p>
        <button className='btn btn-primary' onClick={() => updateUserRole(usuario._id)}>Actualizar</button>
      </div>
    ))}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Usuario actualizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>El usuario {updatedUser?.email} se ha actualizado correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
    )
}
