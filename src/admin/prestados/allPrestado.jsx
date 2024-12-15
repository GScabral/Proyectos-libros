import React, { useEffect } from "react";
import { allBorrowed } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./allPrestado.css";

const ListBorrowed = () => {
    const dispatch = useDispatch();
    const allBookBorrowed = useSelector((state) => state.allBookBorrowed);

    useEffect(() => {
        dispatch(allBorrowed());
    }, [dispatch]);

    return (
        <div className="list-borrowed-container">
            {allBookBorrowed && allBookBorrowed
                .filter((book) => book.status === "borrowed")
                .map((book, index) => {
                    // Convertir la fecha del préstamo a un objeto Date
                    const loanDate = new Date(book.loanstartdate);
                    const currentDate = new Date();

                    // Calcular la diferencia en días
                    const differenceInMilliseconds = currentDate - loanDate;
                    const daysPassed = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

                    return (
                        <div key={index} className="book-card">
                            <p className="book-name">{book.name}</p>
                            <p className="book-editorial">Editorial: {book.editorial}</p>
                            <p className="book-author">Autor: {book.author}</p>
                            <p className="book-loanstartdate">Prestado: {book.loanstartdate}</p>
                            <p className="time-prestado">
                                Tiempo desde el préstamo: {daysPassed} día/s
                            </p>
                            <p className={`book-status ${book.status.toLowerCase()}`}>
                                Estado: {book.status === "borrowed" ? "Prestado" : "Disponible"}
                            </p>
                        </div>
                    );
                })}
        </div>
    );
};

export default ListBorrowed;
