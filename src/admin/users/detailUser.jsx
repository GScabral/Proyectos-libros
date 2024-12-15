import React, { useEffect, useState } from "react";
import { getUserByEmail, getUserAndBook } from "../../redux/action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./detailUser.css";

const DetailUser = () => {
    const { email } = useParams();
    const dispatch = useDispatch();
    const infoCliente = useSelector((state) => state.infoCliente || {}); // Asegura que sea un objeto
    const allUsers= useSelector((state)=>state.allUsers) 
    const isLoading = useSelector((state) => state.loading);
    const [userId, setUserId] = useState(null);

    console.log(allUsers)
    console.log(infoCliente)

    useEffect(() => {
        if (email) {
            dispatch(getUserByEmail(email));
        }
    }, [dispatch, email]);

    useEffect(() => {
        if (allUsers?.id) {
            setUserId(allUsers.id);
        }
    }, [allUsers]);

    useEffect(() => {
        if (userId) {
            dispatch(getUserAndBook(userId));
        }
    }, [dispatch, userId]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (!allUsers?.id) {
        return <p>No se encontraron detalles del usuario.</p>;
    }


    return (
        <div className="admin-user-container">
            <h1 className="admin-user-h1">Detalle del Usuario</h1>

            <div className="admin-user-page-left">
                <h2 className="admin-user-title">Apellido: {allUsers.apellido}</h2>
                <p className="admin-user-author">Nombre: {allUsers.name}</p>
                <p className="admin-user-category">Email: {allUsers.email}</p>
            </div>

            <div className="books-container">
                <h2>Libros:</h2>
                {infoCliente?.books?.length > 0 ? (
                    infoCliente.books
                        .filter((book) => book?.status !== "available")
                        .map((book, index) => (
                            <div key={index} className="book-card">
                                <p>ID: {book?.id}</p>
                                <p>Nombre: {book?.name}</p>
                                <p>Autor: {book?.author}</p>
                                <p>Editorial: {book?.editorial}</p>
                                <p>Fecha de préstamo: {book?.loanstartdate}</p>
                            </div>
                        ))
                ) : (
                    <p>No hay libros asociados.</p>
                )}
            </div>
        </div>
    );
};


export default DetailUser;
