import axios from "axios"


//GET
export const GET_BOOKS = "GET_BOOKS";
export const GET_BYNAME = "GET_BYNAME";
export const GET_BYID = "GET_BYID";
export const GET_BYID_LOADING = "GET_BYID_LOADING";
export const GET_BYID_ERROR = "GET_BYID_ERROR";
export const CHECK_BORROWED = "CHECK_BORROWED";
export const ALL_BORROWED = "ALL_BORROWED"
export const GET_USERS = "GET_USERS"
export const GET_USER_BYID = "GET_USER_BYID"
export const GET_USER_AND_BOOK = " GET_USER_AND_BOOK"
export const GET_USER_BYEMAIL = "GET_USER_BYEMAIL"
export const GET_TIME = "GET_TIME"
export const SEARCH_AUTHOR = "SEARCH_AUTHOR";
export const CERRAR_SESION = "CERRAR_SESION"
//POST
export const CREATE_USER = "CREATE_USER";
export const CHECK_EMAIL = "CHECK_EMAIL";
export const BORROWED = "BORROWED";
export const LOGIN = "LOGIN";
export const DEVOLVER = "DEVOLVER";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS"
//DELETE
//PATCH




const BASE_URL = "https://libros-back.vercel.app";


//GET
export const getBooks = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/ListBooks`);
            dispatch({
                type: GET_BOOKS,
                payload: response.data.items
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUsers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/create/listUser`);
            dispatch({
                type: GET_USERS,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/create/user/${id}`);
            console.log(response);
            dispatch({
                type: GET_USER_BYID,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTime = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/create/time/${id}`);
            dispatch({
                type: GET_TIME,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserByEmail = (email) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/create/userEmail/${email}`);

            // Si la API devuelve un array, toma el primer elemento
            const userData = Array.isArray(response.data) ? response.data[0] : response.data;

            dispatch({
                type: GET_USER_BYEMAIL,
                payload: userData,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getUserAndBook = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/librosPrestados/${id}`);
            console.log(response);

            dispatch({
                type: GET_USER_AND_BOOK,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchBook = (name) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/ListBooks/${name}`);
            dispatch({
                type: GET_BYNAME,
                payload: response.data.items
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const searchAuthor = (author) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/SearchAuthor/${author}`);
            dispatch({
                type: SEARCH_AUTHOR,
                payload: response.data.items
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const checkEmail = (email) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/create/chekEmail`, { params: { email } });
            dispatch({
                type: CHECK_EMAIL,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const detailBooK = (id) => {
    return async function (dispatch) {
        // Despacha un estado de 'cargando' antes de hacer la solicitud
        dispatch({ type: GET_BYID_LOADING });

        try {
            // Realizar la solicitud de manera asíncrona
            const response = await axios.get(`${BASE_URL}/libros/detailBook/${id}`);

            // Verificar que haya datos válidos antes de proceder
            if (response.data) {
                dispatch({
                    type: GET_BYID,
                    payload: response.data
                });
            } else {
                // En caso de que no haya datos
                dispatch({
                    type: GET_BYID_ERROR,
                    payload: "No se encontraron detalles del libro"
                });
            }
        } catch (error) {
            console.error("Error al obtener los detalles del libro:", error);
            // Despacha un error en caso de fallo en la solicitud
            dispatch({
                type: GET_BYID_ERROR,
                payload: "Error al obtener los detalles del libro. Intenta nuevamente más tarde."
            });
        }
    };
};

export const checkDispible = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/disponible`, { params: { id } });
            dispatch({
                type: CHECK_BORROWED,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const allBorrowed = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${BASE_URL}/libros/prestados`);
            console.log(response);

            dispatch({
                type: ALL_BORROWED,
                payload: response.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

//POST
export const createUser = (userData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASE_URL}/create/createUser`, userData);

            if (response.status === 200) {
                if (response.data) {
                    dispatch({
                        type: CREATE_USER,
                        payload: response.data,
                    });
                } else {
                    console.error('No se recibieron datos en la respuesta del servidor');
                }
            } else {
                throw new Error('Error en la solicitud: Código de estado ' + response.status);
            }
            return response;
        } catch (error) {
            console.error('Error en al solicitud', error);
            console.error("error capturado", error);
            throw error;
        }
    };
};

export const alquilarLibro = (borrowData) => {
    console.log(borrowData);
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASE_URL}/libros/retirar`, borrowData);
            console.log(response);

            if (response.status === 200) {
                if (response.data) {
                    dispatch({
                        type: BORROWED,
                        payload: response.data
                    });
                }
            }
            return response;
        } catch (error) {
            console.error('Error en al solicitud', error);
            console.error("error capturado", error);
            throw error;
        }
    };
};

export const loginUser = (userData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASE_URL}/create/login`, userData);
            console.log(response);

            if (response.status === 200) {
                if (response.data) {
                    dispatch({
                        type: LOGIN,
                        payload: response.data
                    });
                }
            }

            return response;
        } catch (error) {
            console.error("Error en la solicutud:", error);
            console.error("erro capturado", error);
            throw error;
        }
    };
};

export const devolver = (dataBook) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${BASE_URL}/libros/devolver`, dataBook);
            if (response.status === 20) {
                if (response.data) {
                    dispatch({
                        type: DEVOLVER,
                        payload: response.data,
                    });
                }
            }
            return response;
        } catch (error) {
            console.error("error ne la solicitud", error);
            console.error("error capturado", error);
            throw error;
        }
    };
};

export const cerrarSesion = () => {
    return {
        type: CERRAR_SESION,
    };
};

export const enviarCorreo = (title, idBook, name, correo, fecha) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/libros/sendEmail`, {
                title: title,
                idBook: idBook,
                correo: correo,
                name: name,
                fecha: fecha,
            });
        } catch (error) {
            // Manejo de errores
            console.error('Error al enviar el correo:', error);
            // Aquí puedes enviar una acción de error si lo deseas
        }
    };
};

export const recoverPassword = (email) => {
    return async () => {
        try {
            const response = await axios.post(`${BASE_URL}/create/recover-password`, {
                email: email
            });
        } catch (error) {
            // Manejo de errores
            console.error('Error al enviar el correo:', error);
        }
    };
};

export const resetPassword = (token, newPassword) => {
    return async () => {
        try {
            const response = await axios.post(`${BASE_URL}/create/reset-password`, {
                token: token,
                newPassword: newPassword
            });
        } catch (error) {
            // Manejo de errores
            console.error('Error al enviar el correo:', error);
        }
    };
};

export const LoginAdmin = (password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/loginc`, {
                password: password
            });
            dispatch({ type: 'ADMIN_LOGIN_SUCCESS' });
            return response;
        } catch (error) {
            console.error(error);
            dispatch({ type: 'ADMIN_LOGIN_FAILURE', payload: { error: error.message } });
            throw error;
        }
    };
};
