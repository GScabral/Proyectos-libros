import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./serach.css"


const SearchBar = ({ onSearch, onClearSearch, value,onKeyDown, onChange }) => {
    const [name, setName] = useState(value || "");


    const handleChange = (event) => {
        setName(event.target.value);

        // Verifica si el texto está vacío y llama a onClearSearch
        if (event.target.value.trim() === "") {
            onClearSearch();
        }
    };

    const handleSearch = () => {
        if (name.trim() !== "") {
            onSearch(name);
        }
    };

    return (
        <div className="div-search">
            <input
                type="search"
                onChange={handleChange}
                value={name}
                placeholder="Buscar..."
                onKeyDown={onKeyDown} // Detectar tecla Enter

            />
            <button className="lupa" onClick={handleSearch}>
                <i className="bi bi-search"></i>
            </button>
        </div>
    );
}

export default SearchBar;