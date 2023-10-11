import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/login.css';
import { useUser } from './UserContex';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    email: username,
                    password: password,
                }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                alert('Datos nombre o contraseña incorrectos!!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <video className="video-background" autoPlay muted loop>
        <source src="../../img/original-8c84d58757f2307620c18a5cd36e250f.mp4" type="video/mp4" />
      </video>
<Container className="body">
<Row>
<Col sm={8}>
    
</Col>
<Col sm={4}>
    <Row className='space'>
        
    </Row>
<form action="" className="container card-inner">
<div>
<img className='circle' src='../../img/Where Art Meets Gif_ The Hypnotic Animated Gifs of David Szakaly — Colossal (1).gif'></img>
</div>
<div className="input-container ">
<div className="input-content">
    <div className="input-dist">
        <div className="input-type">
            <h3 className='m-3'>Registrar</h3>
            <input id="nombre" placeholder='Digite su Nombre Completo' value={name} onChange={(e) => setName(e.target.value)}></input>
            <input id="usuario" placeholder='Digite su Email' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input type={showPassword ? "text" : "password"} id="contraseña" placeholder='Digite su Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <div>
            <input type="checkbox" className="form-check-input" id="check" onClick={() => setShowPassword(!showPassword)} />
            <label className="form-check-label">Ver contrasena</label>

            </div>
            <button className='btn btn-primary' onClick={handleSubmit}>Registrar</button>
            <a href='/login' >Ingresar</a>
        </div>
    </div>
    <img className='circle' src='../../img/Where Art Meets Gif_ The Hypnotic Animated Gifs of David Szakaly — Colossal (1).gif'></img>
</div>
</div>
</form>
</Col>
</Row>
</Container>
</>
)
}
