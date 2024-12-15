import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, checkEmail } from "../../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik"
import * as Yup from "yup";
import "./create.css";

const NewUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const emailExists = useSelector((state) => state.emailExists);

    const [emailCheckInitiated, setEmailCheckInitiated] = useState(false);

    

    // Esquema de validación con Yup
    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es obligatorio"),
        apellido: Yup.string().required("Este campo es obligatorio"),
        email: Yup.string()
            .required("Este campo es obligatorio")
            .test(
                "is-gmail",
                "El correo debe ser una dirección válida de Gmail (ejemplo@gmail.com)",
                (value) => {
                    if (!value) return false;
                    const gmailRegex = /^[^\s@]+@gmail\.com$/;
                    return gmailRegex.test(value);
                }
            ),
        password: Yup.string()
            .required("Este campo es obligatorio")
            .min(8, "Debe tener al menos 8 caracteres"),
    });


    useEffect(() => {
        if (emailCheckInitiated) {
            if (emailExists === true) {
                alert("El correo electrónico ya está en uso. Por favor, inicia sesión en lugar de crear una nueva cuenta.");
            } else if (emailExists === false) {
                // Aquí asegúrate de que sólo se llame a createUser si el correo es válido
                dispatch(createUser(emailCheckInitiated))
                    .then(() => {
                        alert("Usuario creado con éxito.");
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.error("Error al crear el usuario:", error);
                        alert("Ocurrió un error al crear el usuario. Intenta de nuevo más tarde.");
                    });
            }
            setEmailCheckInitiated(false); // Reinicia el estado para evitar loops
        }
    }, [emailExists, emailCheckInitiated, dispatch, navigate]);
    


    return (
        <div className="form-container">
            <div className="background-animation"></div> {/* Animación de fondo */}
            <h1 className="form-title">Crear Cuenta</h1>

            <Formik
                initialValues={{ name: "", apellido: "", email: "", password: "" }}
                validationSchema={RegisterSchema}
                validateOnChange={false}
                validateOnBlur={true}
                onSubmit={(values, { setSubmitting }) => {
                    const checkAndCreateUser = async () => {
                        setSubmitting(true);
                        await dispatch(checkEmail(values.email)); // Espera a que la acción termine
                        setEmailCheckInitiated(values); // Esto activa el useEffect
                        setSubmitting(false);
                    };
                    checkAndCreateUser();
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="form-label">Nombre:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="form-input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {touched.name && errors.name && <p className="error">{errors.name}</p>}

                        <label htmlFor="apellido" className="form-label">Apellido:</label>
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            className="form-input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.apellido}
                        />
                        {touched.apellido && errors.apellido && <p className="error">{errors.apellido}</p>}

                        <label htmlFor="email" className="form-label">Correo:</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="form-input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && <p className="error">{errors.email}</p>}

                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {touched.password && errors.password && <p className="error">{errors.password}</p>}

                        <button
                            className="button-create"
                            type="submit"
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                        >
                            Crear
                        </button>
                        <Link to={"/login"}>
                            <button className="button-login" type="button">Iniciar Sesión</button>
                        </Link>
                    </form>
                )}
            </Formik>



        </div>
    );
};

export default NewUser;
