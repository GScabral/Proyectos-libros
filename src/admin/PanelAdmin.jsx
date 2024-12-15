import React, { useState } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAdmin } from '../redux/action';
import ListUsers from './users/allUser';
import ListBorrowed from './prestados/allPrestado';
import BarraAdmin from './barraAdmin/barraAdmin';
import DetailUser from './users/detailUser';
import Incio from './inicio/inicio';
import './panelAdmin.css';

const PanelAdmin = () => {
    const [showModal, setShowModal] = useState(true);
    const isLoggeIn = useSelector((state) => state.isLoggeInAd);
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        const password = event.target.elements.password.value;

        if (!password) {
            console.error('La contraseña no puede estar vacía.');
            return;
        }

        try {
            await dispatch(LoginAdmin(password));
            setShowModal(false);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    if (!isLoggeIn && showModal) {
        return (
            <div className="modal-ini-adm">
                <div className="modal-content-ini-adm">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLogin}>
                        <input type="password" name="password" placeholder="Contraseña" />
                        <button type="submit">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="panel-admin-container">
            <div className="sidebar-container-admin">
                <BarraAdmin />
            </div>
            <div className="pages-container">
                <Routes>
                    {/* Rutas internas del panel */}
                    <Route path="/" element={<Navigate to="Inicio" />} />
                    <Route path="Inicio" element={<Incio />} />
                    <Route path="ListUsers" element={<ListUsers />} />
                    <Route path="ListBorrowed" element={<ListBorrowed />} />
                    <Route path="Detail/user/:email" element={<DetailUser />} />
                </Routes>
                <Outlet />
            </div>
        </div>
    );
};

export default PanelAdmin;
