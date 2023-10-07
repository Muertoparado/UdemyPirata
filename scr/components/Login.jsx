import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/login.css';
//import VideoBackground from './Background.jsx';
//import {VideoBackground} from './Background.jsx'
//<VideoBackground />
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state variable
    const [token, setToken] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });
    
            if (response.ok) {
                const data = await response.json(); 
                const authToken = data.token; 
                setToken(authToken);
                navigate("/home");
            } else{
                alert("Nombre o contraseña erroneos!!");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
         <Container className="body">
            
      <Row>
        <Col sm={8}>
        
        </Col>
        <Col sm={4}>
            
        <form action="" className="container card-inner">
        <div>
            <img className='circle' src='../../img/Where Art Meets Gif_ The Hypnotic Animated Gifs of David Szakaly — Colossal (1).gif'></img>
        </div>
        <div className="input-container ">
            <div className="input-content">
                <div className="input-dist">
                    <div className="input-type">
                    <h3 className='m-3'>Iniciar Sesion</h3>
                    <input id="usuario" placeholder='Digite su Email' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <input type={showPassword ? "text" : "password"} id="contraseña" placeholder='Digite su Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}></input> 
                    <input type="checkbox" classNameName="form-check-input" id="check"onClick={() => setShowPassword(!showPassword)}/>
                <label classNameName="form-check-label" >Ver contrasena</label>
                <button classNameName='btn btn-primary' onClick={handleSubmit}>Entrar</button>

              </div>
             
          </div>
      </div>
     
  </div>
  
</form>
</Col>
        </Row>
      </Container>
        
        </>
    )
}