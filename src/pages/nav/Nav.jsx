import React, { useState } from "react";
import SearchBar from "../search/search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, searchBook, searchAuthor, cerrarSesion } from "../../redux/action";
import "./Nav.css";

const Nav = () => {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("title"); // Estado para controlar el tipo de búsqueda
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const [showModal,setShowModal]=useState(false)

    const handleSearch = (query) => {
        if (searchType === "title") {
            dispatch(searchBook(query)); // Búsqueda por nombre del libro
        } else if (searchType === "author") {
            dispatch(searchAuthor(query)); // Búsqueda por autor
        }
    };

    const handleClear = () => {
        setSearchText("");
        dispatch(getBooks());
    };

    const toggleSearchType = () => {
        setSearchType((prevType) => (prevType === "title" ? "author" : "title"));
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchText.trim() !== "") {
            handleSearch(searchText);
        }
    };

    const handleLogOut = () => {
        dispatch(cerrarSesion())
        setShowModal(false);
    }


    return (
        <div className="navbar-container">
            <div className="navbar">
                <SearchBar
                    className="search-bar"
                    onSearch={handleSearch}
                    onKeyDown={handleKeyDown}
                    onClearSearch={handleClear}
                    onChange={(e) => setSearchText(e.target.value)} // Actualizar el estado
                />
                <button className="toggle-search-button" onClick={toggleSearchType}>
                    Cambiar a búsqueda por {searchType === "title" ? "Autor" : "Título"}
                </button>
            </div>

            {isLoggedIn === false ? (
                <div className="auth-buttons">
                    <Link to={"/login"}>
                        <button>Iniciar Sesión</button>
                    </Link>
                    <Link to={"/CreateUser"}>
                        <button>Crear Usuario</button>
                    </Link>
                </div>
            ) : (
                <div className="auth-buttons">
                    <Link to={"/Perfil"}>
                        <button>Perfil</button>
                    </Link>

                    <button onClick={()=>setShowModal(true)}>Cerra sesion</button>

                </div>
            )}
            {showModal && (
                <div className="modal-cerrar">
                    <div className="modal-content-cerrar">
                        <h2>¿Cerrar sesion?</h2>
                        <p>¿Estas seguro de que deseas cerrar sesion?</p>
                    </div>
                    <div className="modal-button-cerrar">
                        <button onClick={handleLogOut} className="confirm-button">
                            confirmar
                        </button>
                        <button onClick={() => setShowModal(false)} className="cancle-button">
                            cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nav;
