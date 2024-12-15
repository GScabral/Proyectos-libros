import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { recoverPassword } from "../../../redux/action";


const RecoverPassword = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await dispatch(recoverPassword(state.email))
            if (response && response.status === 200) {
                alert("revise su correo")
            }
        } catch (error) {
            alert("corroe no encontrado",error)
        }
    }


    return (
        <div>
            <h1>si olvidaste tu contrañase  te enviaremos un correo para restablecer</h1>
            <label className="form-labelIs" htmlFor="email">
                Correo electrónico:
            </label>
            <input onChange={handleChange} value={state.email} type="text" name="email" autoComplete="off" />
            <button type="submit" onClick={handleSubmit}>Restablecer</button>

            <div>
                <Link to={"/login"}>
                    <button>Iniciar Sesión</button>
                </Link>
            </div>
        </div>


    )
}



export default RecoverPassword


// onChange={handleChange} value={state.email}