import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
const RegisterForm = () => {
  const [completeName, setCompleteName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProfessor, setIsProfessor] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Si es exitoso:

    navigate("/Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      completeName,
      birthdate: birthdate.toISOString().substring(0, 10),
      email,
      password,
      roleId: isProfessor ? 2 : 1, // si es profesor asigna valor (2), si es alumno asigna valor (1)
    };

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        navigate("/Login"); //navega despues del registro exitoso
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData || "Error al registrar un usuario");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    //Verifico que las contraseñas sean iguales

    if (e.target.value !== password) {
      setErrorMessage("Las contraseñas no coinciden");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <div className="app-container">
        <div className="login-container">
          <h2 className="login-h2">Regístrate</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                id="name"
                value={completeName}
                onChange={(e) => setCompleteName(e.target.value)}
                placeholder="Nombre y Apellido"
                className="styled-input"
              />
            </div>
            {/* <div className="form-group">
              <input
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                className="styled-input"
              />
            </div> */}
            <div className="form-group">
              <input
                id="birthdate"
                value={
                  birthdate ? birthdate.toISOString().substring(0, 10) : "" //convertidor de string a Date
                }
                onChange={(e) => setBirthdate(new Date(e.target.value))}
                placeholder="Fecha de nacimiento"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="styled-input"
              />
            </div>
            <div className="form-group">
              <input
                /*type="password"*/
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                className="styled-input"
              />
            </div>

            {errorMessage && (
              <p className="error-message">
                {typeof errorMessage === "string"
                  ? errorMessage
                  : errorMessage.message}
              </p>
            )}

            <div className="form-group">
              <input
                /*type="password"*/
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                placeholder="Repetir contraseña"
                className="styled-input"
              />
            </div>
            <div>
              <label htmlFor="isProfessor" className="checkbox-container">
                <span className="checkbox-label"> ¿Eres profesor? </span>
                <input
                  type="checkbox"
                  id="isProfessor"
                  className="large-checkbox"
                  checked={isProfessor}
                  onChange={(e) => setIsProfessor(e.target.checked)}
                />
              </label>
            </div>

            <button type="submit" className="login-btn">
              Regístrate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
