import React, { useEffect, useState } from "react";
import { detailBooK } from "../../redux/action";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./detail.css";

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookDetail = useSelector((state) => state.bookDetail);
    const isAvailable = useSelector((state) => state.isAvailable);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    
    useEffect(() => {
        if (id) {
            setIsLoading(true);
            setError(null);
            dispatch(detailBooK(id))
                .finally(() => setIsLoading(false))
                .catch((err) => setError("Error al cargar los detalles del libro."));
        }
    }, [id, dispatch]);

    if (isLoading) return <p className="loading">Cargando detalles...</p>;
    if (error) return <p className="error">{error}</p>;

    
    const description = bookDetail.volumeInfo.description.replace(/<\/?[^>]+(>|$)/g, ""); //esto sirve para sacar las etiquetas que tenia la descripcion 


    return (
        <div className="detail-container">
            {bookDetail && bookDetail.volumeInfo ? (
                <div className={`book-open ${isAvailable===false ? "not-available" : ""}`}>
                    <div className="page-left">
                        <h2 className="book-title">Título: {bookDetail.volumeInfo.title}</h2>
                        <p className="book-author">Autor: {bookDetail.volumeInfo.authors?.join(", ")}</p>
                        <p className="book-category">Categoría: {bookDetail.volumeInfo.categories?.join(", ")}</p>
                        <img
                            src={bookDetail.volumeInfo.imageLinks?.thumbnail}
                            alt={`Portada de ${bookDetail.volumeInfo.title}`}
                            className="book-thumbnail"
                        />
                    </div>
                    <div className="page-right">
                        <p className="book-description">Descripción: {description || "No disponible."}</p>
                        <p className="book-published">Publicado: {bookDetail.volumeInfo.publishedDate || "No disponible."}</p>
                        <p className="book-publisher">Editorial: {bookDetail.volumeInfo.publisher || "No disponible."}</p>
                        <Link to="/" className="back-button">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            ) : (
                <p>No se encontraron detalles para este libro.</p>
            )}
        </div>
    );
};

export default Detail;
