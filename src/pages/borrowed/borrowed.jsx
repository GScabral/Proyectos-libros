import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alquilarLibro, detailBooK, checkDispible, enviarCorreo } from "../../redux/action";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./borrowed.css"

const Alquilar = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookDetail = useSelector((state) => state.bookDetail)
    const isAvailable = useSelector((state) => state.isAvailable);
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const infoCliente = useSelector((state) => state.infoCliente)


    const [showModal, setShowModal] = useState(false);

    let actual = new Date();
    let sinHora = actual.toISOString().split("T")[0];

    let fechaVuelta = 7;
    actual.setDate(actual.getDate() + fechaVuelta)

    let fechaFormateada = actual.toLocaleDateString("es-ES");



    useEffect(() => {
        if (id) {
            dispatch(detailBooK(id))// Cargar los detalles del libro
            dispatch(checkDispible(id))// Comprobar disponibilidad

        }
    }, [id, dispatch])

    const sendCorreo = async (correo) => {
        try {
            const title = bookDetail.volumeInfo.title;
            const idBook = bookDetail.id;
            const name = infoCliente.name;
            const fecha = fechaFormateada

            await dispatch(enviarCorreo(title, idBook, name, correo, fecha))
        } catch (error) {
            console.error("error al enviar el correo", error)
        }
    }



    const handleBorrow = () => {
        if (!isLoggedIn) {
            alert("Debe crear una cuenta o iniciar sesión para realizar esta acción.");
        } else if (!isAvailable.disponible) {
            alert(`El libro no está disponible en estos momentos.Estara disponible apartir del ${fechaFormateada}`);
        } else if (bookDetail && isAvailable.disponible && isLoggedIn) {
            const borrowData = {
                id: bookDetail.id,
                name: bookDetail.volumeInfo.title,
                author: bookDetail.volumeInfo.authors.join(", "), // Asumiendo que 'authors' es un array
                editorial: bookDetail.volumeInfo.publisher,
                userId: infoCliente.id,
                status: "borrowed",
                loanstartdate: sinHora
            };
            dispatch(alquilarLibro(borrowData));

            const correo = infoCliente.email;
            if (correo) {
                sendCorreo(correo)
            } else {
                console.error("ERROR: No se seleccionó un libro o falta el correo electrónico.");
            }
            setShowModal(true)
        }
    };

    const closeModal = () => {
        setShowModal(false)
    }


    return (
        <div className="back-borrowed">
            <h1 className="borrowed">Alquilar Libro</h1>
            {bookDetail ? (
                <div className="container">
                    <h2 className="bookDetail">{bookDetail.volumeInfo.title}</h2>
                    <p className="info">Autor: {bookDetail.volumeInfo.authors.join(",")}</p>
                    <p className="info">Editorial: {bookDetail.volumeInfo.publisher}</p>
                    <button className="button-close">
                        <Link to="/" className="back-button">
                            Volver al inicio
                        </Link>
                        </button>
                    {isAvailable ? (
                        <button className="button-borrowed" onClick={handleBorrow}>Prestar Libro</button>
                        
                    ) : (
                        <p className="error">Este libro no está disponible para préstamo.</p>
                    )}
                </div>
            ) : (
                <p className="loading">Cargando detalles del libro...</p>
            )}
            {showModal && (
                <div className="modal-prestar">
                    <div className="modal-content">
                        <h2>Prestamos realizado con existo</h2>
                        <p>El libro "{bookDetail.volumeInfo.title}</p>
                        <p>Fecha de devolución esperada: {fechaFormateada}</p>
                        <button className="button-close" onClick={closeModal}>
                            Cerrar
                        </button>
                    
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alquilar;