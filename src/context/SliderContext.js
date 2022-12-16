import { createContext, useContext, useReducer } from "react";

const SliderContext = createContext(null);

const initState = {
    id: undefined,
    items: [],
    loading: false,
    errors: [],
    succeeded: false,
    currentSlide: 0,
    previousSlide: null
}

export const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_SLIDE": "SET_SLIDE"
}

const reducer = (state, action) => {
    switch (action.type) {

        case types.SET_LOADING:
            state = { ...state, loading: true };
            break;

        case types.SET_ITEMS:
            state = { ...state, loading: false, id: action.id, errors: [], succeeded: true, items: action.items };
            break;

        case types.SET_ERROR:
            state = { ...state, loading: false, errors: action.errors, items: [], succeeded: false };
            break;

        case types.SET_SLIDE:
            state = { ...state, currentSlide: action.currentSlide, previousSlide: action.previousSlide };
            break;

        default:
            throw Error("An Error");
    }
    return state;
}

const SliderProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <SliderContext.Provider value={{ state, dispatch }}>
            {children}
        </SliderContext.Provider>
    )
};

const useSlider = () => {
    let context = useContext(SliderContext);

    if (!context) {
        throw new Error("error useSlider");
    }

    let { state, dispatch } = context;

    const nextSlide = () => {
        let previousSlide = state.currentSlide;
        let currentSlide = (state.currentSlide + 1) % state.items.length;
        dispatch({
            type: types.SET_SLIDE,
            previousSlide,
            currentSlide
        })
    }

    const previousSlide = () => {
        let previousSlide = state.currentSlide;
        let currentSlide = (state.currentSlide + state.items.length - 1) % state.items.length;
        dispatch({
            type: types.SET_SLIDE,
            previousSlide,
            currentSlide
        });
    }

    return { state, dispatch, nextSlide, previousSlide }
};

export { SliderProvider, useSlider };