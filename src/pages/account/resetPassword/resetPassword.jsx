import React, { useState } from "react";
import { resetPassword } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./resetPassword.css"; 

const ResetContraseña = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [shadowPassword, setShadowPassword] = useState(false);

    const [state, setState] = useState({
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await dispatch(resetPassword(token, state.password));
            if (response && response.status === 200) {
                alert("Contraseña actualizada correctamente");
                navigate("/login");
            }
        } catch (error) {
            alert("Error al modificar la contraseña", error);
        }
    };

    return (
        <div className="reset-container">
            <label className="form-labelIs" htmlFor="password">
                Nueva Contraseña:
            </label>
            <input
                onChange={handleChange}
                value={state.password}
                type={shadowPassword ? "text" : "password"}
                name="password"
                autoComplete="off"
            />
            <button onClick={() => setShadowPassword(!shadowPassword)}>
                {shadowPassword ? "Ocultar" : "Mostrar"} contraseña
            </button>
            <button onClick={handleSubmit} type="submit">
                Cambiar
            </button>
        </div>
    );
};

export default ResetContraseña;
