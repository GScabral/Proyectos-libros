import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';




const SearchUser = ({ onSearch, onClearSearch, value }) => {
    const [email, setEmail] = useState(value || "");

    const handleChange = (event) => {
        setEmail(event.target.value);

        // Verifica si el texto está vacío y llama a onClearSearch
        if (event.target.value.trim() === "") {
            onClearSearch();
        }
    };

    const handleSearch = () => {
        if (email.trim() !== "") {
            onSearch(email);
        }
    };

    return (
        <div className="div-search">
            <input
                type="search"
                onChange={handleChange}
                value={email}
                placeholder="Buscar usuario..."
            />
            <button className="lupa" onClick={handleSearch}>
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}






export default SearchUser
