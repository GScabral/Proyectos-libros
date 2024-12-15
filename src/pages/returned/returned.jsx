import React, { useEffect, useState } from "react";

import { detailBooK, devolver } from "../../redux/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./returned.css"



const Returned = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookDetail = useSelector((state) => state.bookDetail)
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        if (id) {
            dispatch(detailBooK(id))
        }
    }, [id, dispatch])




    const handleReturned = () => {
        if (!isLoggedIn) {
            alert("Debe crear una cuenta o iniciar sesión para realizar esta acción.");
        } else if (bookDetail) {
            const dataBook = {
                id: bookDetail.id,
            }
            dispatch(devolver(dataBook))
        } else {
            alert("el libro ya a sido devuelto")
        }
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }


    return (
        <div className="container-devolver">
            <h1 className="h1-devolver">Devolver Libro</h1>
            {bookDetail ? (
                <div className="devolver">
                    <h2 className="h2-devolver">{bookDetail.volumeInfo.title}</h2>
                    <p className="p-devolver">¿Deseas devolver este libro?</p>
                    <button className="button-close">
                        <Link to="/" className="back-button">
                            Volver al inicio
                        </Link>
                    </button>
                    <button className="button-devolver" onClick={handleReturned}>Devolver Libro</button>
                </div>
            ) : (
                <p className="p-devolver">Cargando detalles del libro...</p>
            )}
            {showModal && (
                <div className="modal-prestar">
                    <div className="modal-content">
                        <h2>Se devolvio el libro con exito</h2>
                        <p>El libro "{bookDetail.volumeInfo.title}"</p>
                        <button className="button-close" onClick={closeModal}>
                            Cerrar
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Returned;