import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getBooks } from '../redux/action'
import Cards from "./cards/cards";
import Nav from "./nav/Nav";
import "./Home.css"


const Home = () => {
    const dispatch = useDispatch();
    const allBooks = useSelector((state) => state.allBooks)

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch])

    return (
        <>
        <nav><Nav></Nav></nav>
            <h1>LIBROS</h1>
            <ul>
                <div className="Home-container">
                    {allBooks.map((books, index) => (
                        <Cards key={index} books={books} />
                    ))}
                </div>

            </ul>
        </>
    );
}



export default Home;