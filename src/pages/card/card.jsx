import React from "react";
import "./card.css"
import { Link } from "react-router-dom"


    const Card = ({ id, title, authors, thumbnail }) => {
        return (
            <div className="card-container">
                <div className="card-inner">
                    {/* Cara frontal: Imagen del libro */}
                    <div className="card-front">
                        <img src={thumbnail} alt="Portada del libro" className="book-thumbnail" />
                    </div>
                    {/* Cara trasera: Información del libro */}
                    <div className="card-back">
                        <h1 className="card-title">Título: {title}</h1>
                        <p className="card-author">Autor: {authors && authors.join(", ")}</p>
                        <Link to={`/Detail/${id}`} className="card-link">
                            Ver detalles
                        </Link>
                        <Link to={`/alquilar/${id}`} className="card-link">
                        alquilar
                        </Link>
                        <Link to={`/Returned/${id}`}  className="card-link">devolver</Link>
                    </div>
                </div>
            </div>
        );
    };



export default Card;