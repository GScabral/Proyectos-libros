import React, { useEffect, useState } from "react";
import { getUsers, getUserByEmail } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchUser from "../searchUser/searchUser";
import './allUser.css'

const ListUsers = () => {
    const dispatch = useDispatch();

    const allUser = useSelector((state) => state.allUser)
    

    const [searchText, setSearchText] = useState("")



    const handleSearch = (email) => {
        dispatch(getUserByEmail(email))
    }


    const handleClear = () => {
        setSearchText("");
        dispatch(getUsers());
    }


    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])




    return (
        <div className="list-users-container">
            <div className="navbar">
                <SearchUser
                    className="search-bar"
                    onSearch={handleSearch}
                    onClearSearch={handleClear}
                    value={searchText}
                />
            </div>
            <h1>Usuarios de la Biblioteca</h1>
            {allUser.map((user, index) => (
                <div key={index} className="user-card">
                    <Link to={`/admin/Detail/user/${user.email}`}>
                        <p className="user-name">{user.name} {user.apellido}</p>
                        <p className="user-email">Email: {user.email}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};


export default ListUsers;