import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { devolver } from "../../redux/action";
import './perfil.css'


const Perfil=()=>{
    const infoCliente=useSelector((state)=>state.infoCliente)
    const dispatch=useDispatch();


    console.log(infoCliente)

    const handleReturned = (bookId) => {
        const bookToReturn = infoCliente.books.find((book) => book.id === bookId);
        if (bookToReturn) {
            dispatch(devolver({ id: bookToReturn.id }));
        } else {
            alert("El libro ya ha sido devuelto o no existe.");
        }
    };
    


    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            <div className="client-info">
                <p>Nombre: {infoCliente.name}</p>
                <p>Apellido: {infoCliente.apellido}</p>
                <p>Email: {infoCliente.email}</p>
            </div>
            <div className="books-container">
                <h2>Libros:</h2>
                {infoCliente.books && infoCliente.books.length > 0  ? (
                    infoCliente.books
                    .filter((book) => book.status === "borrowed")
                    .map((book, index) => (
                        <div key={index} className="book-card">
                            <p>ID: {book.id}</p>
                            <p>Nombre: {book.name}</p>
                            <p>Autor: {book.author}</p>
                            <p>Editorial: {book.editorial}</p>
                            <p>{book.loanstartdate}</p>
                            <p className={`book-status ${book.status.toLowerCase()}`}>
                                Estado: {book.status === "borrowed" ? "Prestado" : "Disponible"}
                            </p>
                            {book.status === "borrowed" && (
                                <button onClick={() => handleReturned(book.id)}>Devolver Libro</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay libros asociados.</p>
                )}
            </div>
        </div>
    );
};

export default Perfil;