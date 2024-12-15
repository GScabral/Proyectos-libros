import {
    GET_BOOKS,
    GET_BYNAME,
    GET_BYID,
    GET_BYID_ERROR,
    GET_BYID_LOADING,
    CREATE_USER,
    BORROWED,
    ALL_BORROWED,
    CHECK_BORROWED,
    GET_USERS,
    LOGIN,
    CHECK_EMAIL,
    GET_USER_BYID,
    GET_USER_AND_BOOK,
    ADMIN_LOGIN_SUCCESS,
    GET_USER_BYEMAIL,
    SEARCH_AUTHOR,
    CERRAR_SESION,

} from './action'

const initialState = {
    allBooks: [],
    allBooksBackUp: [],
    allBookBorrowed: [],
    allBookBorrowedBackUp: [],
    allUser: [],
    allUserBackUp: [],
    totalPages: 1,
    currentPage: 1,
    filter: false,
    bookDetail: null,
    loading: false,
    error: null,
    loading: false,
    emailExists: false,
    isLoggedIn: false,
    allClientes: [],
    errorMessage: '',
    cliente: [],
    infoCliente: [],
    isAvailable: null,
    isLoggedInAd: false,
    infoClienteAdmin: [],
}

const ITEMS_PER_PAGE = 15;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            const allBooks = action.payload;
            // const slicedBooks = allBooks.slice(0, ITEMS_PER_PAGE)

            return {
                ...state,
                allBooks: allBooks,
                allBooksBackUp: allBooks,
                // totalPages: Math.ceil(allBooks.length / ITEMS_PER_PAGE)
            }
        case GET_BYNAME:
            return {
                ...state,
                allBooks: action.payload,
                allBooksBackUp: action.payload,
                filter: false,
                // totalPages:Math.ceil(action.payload.length/ITEMS_PER_PAGE),
                // currentPage:1
            }
        case SEARCH_AUTHOR:
            return {
                ...state,
                allBooks: action.payload,
                allBooksBackUp: action.payload,
                filter: false,
                // totalPages:Math.ceil(action.payload.length/ITEMS_PER_PAGE),
                // currentPage:1
            }
        case GET_BYID_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            };
        case GET_BYID:
            return {
                ...state,
                bookDetail: action.payload,
                loading: false,
                error: null
            };
        case GET_BYID_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CREATE_USER:
            const createUser = action.payload;
            return {
                ...state,
                allClientes: [...state.allClientes, createUser]
            }

        case ALL_BORROWED:
            const allBorrowed = action.payload;
            // const slicedBooks = allBooks.slice(0, ITEMS_PER_PAGE)

            return {
                ...state,
                allBookBorrowed: allBorrowed,
                allBookBorrowedBackUp: allBorrowed,
                // totalPages: Math.ceil(allBooks.length / ITEMS_PER_PAGE)
            }
        case BORROWED:
            return {
                ...state,
                allBookBorrowed: [...state.allBookBorrowed, action.payload], // Agregar libro prestado
            };

        case CHECK_BORROWED:
            return {
                ...state,
                isAvailable: action.payload,
            };
        case CHECK_EMAIL:
            const existe = action.payload

            return {
                ...state,
                emailExists: existe,
            }


        case GET_USERS:
            const allUsers = action.payload;
            // const slicedBooks = allBooks.slice(0, ITEMS_PER_PAGE)

            return {
                ...state,
                allUser: allUsers,
                allUserBackUp: allUsers,
                // totalPages: Math.ceil(allBooks.length / ITEMS_PER_PAGE)
            }

        case LOGIN:
            const userInfo = action.payload
            return {
                ...state,
                isLoggedIn: true,
                cliente: userInfo,
            }
        case GET_USER_BYEMAIL:

            return {
                ...state,
                allUsers: action.payload,
                allUserBackUp: action.payload,
                filter: false,

            }
        case CERRAR_SESION:
            return {
                ...state,
                isLoggedIn: false,
                cliente: null, // Agrega aquí cualquier otro estado relacionado con la sesión que necesites limpiar
            };
            case GET_USER_AND_BOOK:
                return {
                    ...state,
                    infoCliente: {
                        ...state.infoCliente, // Verifica que `infoCliente` sea un objeto válido
                        ...action.payload,   // Combina todos los datos del payload, no solo `books`
                        books: Array.isArray(action.payload.books) ? action.payload.books : [], // Verifica que `books` sea un array
                    },
                };

        default:
            return state;
    }
}


export default reducer;

