import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function SuperAdmin() {
  const [user,setUser]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUserRole = async (userId) => {
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
       Navigate("/ok")
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
        <h1>Usuarios Registrados</h1>
    <p>Si desea actualizar a educador, dar click al boton actualizar.</p>
    {user.map((usuario) => (
      <div className='card p-5 m-5' key={usuario.id}>
        <h2>{usuario.email}</h2>
        <p>{usuario.rol}</p>
        <button classNameName='btn btn-primary' onClick={() => updateUserRole(usuario._id)}>Actualizar</button>
      </div>
    ))}
    
  </div>
    )
}
