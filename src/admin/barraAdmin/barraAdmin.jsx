import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./barraAdmin.css";

const BarraAdmin = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`sidebar-admin ${menuOpen ? "open" : ""}`}>
            <button className="hamburger-menu" onClick={toggleMenu}>
                ☰
            </button>
            <div className={`menu-links ${menuOpen ? "show" : ""}`}>
                <Link to={"ListUsers"}>
                    <button className="barra-admin-button">Lista de usuarios</button>
                </Link>
                <Link to={"ListBorrowed"}>
                    <button className="barra-admin-button">Lista de prestados</button>
                </Link>

            </div>
        </div>
    );
};

export default BarraAdmin;
