import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { loginUser, getUserAndBook } from "../../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shadowPassword, setShadowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false)
    const [isLoggedIn, setIsLoggedIm] = useState(false)
    const [loginError, setLoginError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false); // Estado para rastrear si se ha intentado enviar el formulario
    const [error, setError] = useState({});



    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }
    useEffect(() => {
        const validateForm = () => {
            const newErrors = {};

            if (!state.correo && isSubmitted) { // Verificar errores solo si se ha intentado enviar el formulario
                newErrors.correo = "El correo es requerido";
            }

            if (!state.contraseña && isSubmitted) { // Verificar errores solo si se ha intentado enviar el formulario
                newErrors.contraseña = "La contraseña es requerida";
            }

            const isValid = Object.values(newErrors).every((error) => error === "");

            setError(newErrors);
            setIsValid(isValid);

        };

        validateForm();
    }, [state, isSubmitted]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); // Marcar el formulario como enviado

        try {
            const response = await dispatch(loginUser(state));

            if (response && response.status === 200 && response.data && response.data.token) {
                const token = response.data.token;
                const id = response.data.idU
                setIsLoggedIm(true);
                navigate('/');
                dispatch(getUserAndBook(id))
            } else {
                setLoginError("Credenciales inválidas");
            }
        } catch (error) {
            setTimeout(() => {
                setLoginError("Error al iniciar sesión");
            }, 1000)
        }
    };


    return (
        <div className="container-login">
            <h1 className="titulo-login">LOGIN</h1>
            <label className="form-labelIs" htmlFor="email">
                Correo electrónico:
            </label>
            <input onChange={handleChange} value={state.email} type="text" name="email" autoComplete="off" />
            {error.email && isSubmitted && <p className="error-message">{error.email}</p>}
            <label className="form-labeliIs" htmlFor="password">
                password:
            </label>
            <input onChange={handleChange} value={state.password} type="password" name="password" autoComplete="off" />
            {error.password && isSubmitted && <p className="error-message">{error.password}</p>}

            {loginError && <p className="error-message">{loginError}</p>}

            <button
                className={`form-button ${isValid ? "valid-button" : "invalid-button"}`}
                disabled={!isValid}
                onClick={handleSubmit}
                type="submit"
            >
                Ingresar
            </button>

            <Link to={"/CreateUser"}>
                <button className="button-login">crear User</button>
            </Link>
            <Link to={"/RecoverPassword"}>
                <button className="button-login">Recuperar contraseña</button>
            </Link>
        </div>
    )
}



export default Login;