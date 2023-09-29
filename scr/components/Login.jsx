    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    export default function Login() {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false); // New state variable
        const [token, setToken] = useState("");
        const navigate = useNavigate();

        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/login`, {
                    method: "POST",
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
            <h1>Iniciar Sesion</h1>
    <form>
        <div className="mb-3">
            <label  className="form-label">Email</label><br />
                <input id="usuario" placeholder='Digite su Email' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>  <br />
                <input type={showPassword ? "text" : "password"} id="contraseña" placeholder='Digite su Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check"onClick={() => setShowPassword(!showPassword)}/>
            <label className="form-check-label" >Ver contrasena</label>
        </div>
        <button className='btn btn-primary' onClick={handleSubmit}>Entrar</button>

    </form>
            </>
        )
    }
