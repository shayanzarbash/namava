import { createContext, useContext, useReducer } from "react";

const MenusContext = createContext(null);

const initState = {
    data: null,
    home: null,
    loading: false,
    errors: [],
    succeeded: false,
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_DATA": "SET_DATA",
    "SET_ERROR": "SET_ERROR",
}

const reducer = (state, action) => {
    switch (action.type) {

        case types.SET_LOADING:
            state = { ...state, loading: true };
            break;
        case types.SET_DATA:
            state = { ...state, loading: false, errors: [], succeeded: true, data: action.data, home: action.home };
            break;
        case types.SET_ERRORS:
            state = { ...state, loading: false, errors: action.errors, data: null, home: null, succeeded: false };
            break;

        default:
            throw Error("An Error");
    }
    return state;
}

const MenusProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <MenusContext.Provider value={{ state, dispatch }}>
            {children}
        </MenusContext.Provider>
    )
};

const useMenus = () => {
    let context = useContext(MenusContext);

    if (!context) {
        throw new Error("error useMenus");
    }

    let { state, dispatch } = context;

    return { state, dispatch, }
};

export { MenusProvider, useMenus };