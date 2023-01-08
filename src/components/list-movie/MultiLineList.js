/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, } from 'react';
import { Link } from 'react-router-dom';
import './RowList.scss';
import { fetchData } from '../../utils/Functions';
import SingleRowList from './SingleRowList';


const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
}

let multiLineReducer = (state, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            state = { ...state, loading: true };
            break;

        case types.SET_ITEMS:
            state = { ...state, error: false, items: action.items, loading: false };
            break;

        case types.SET_ERROR:
            state = { ...state, items: [], error: action.error, loading: false };
            break;

        case types.SET_FETCH_REQUEST:
            state = { ...state, fetchRequest: true };
            break;

        default:
            throw Error("error multiLineReducer");
    }

    return state;
};



const MultiLineList = React.forwardRef(({ className, data: { payloadType, payloadKey, title, items: defaultItems, key = "id", page, slug, maxItems, options = {}, perRow = 7 }, ItemComponent, placeholder = false, preview = false }, ref) => {
    const initialState = {
        items: defaultItems || [],
        loading: false,
        error: false,
        fetchRequest: false
    }
    const [state, dispatch] = useReducer(multiLineReducer, initialState, (initState) => initState);
    const { items, loading, error, fetchRequest } = state;

    useEffect(() => {
        if ((fetchRequest || placeholder === false) && (items.length === 0 && loading === false && error === false)) {
            fetchData(payloadType, payloadKey, (result) => {
                //setItems(result);
                dispatch({ type: types.SET_ITEMS, items: result });
            }, (error) => {
                //setError(error);
                dispatch({ type: types.SET_ERROR, error });
            }, (isLoading) => {
                //setLoading(isLoading);
                if (isLoading) {
                    dispatch({ type: types.SET_LOADING, loading: isLoading });
                }
            });
        }
    }, [payloadType, payloadKey, placeholder, fetchRequest, dispatch, items.length, loading, error]);

    // برای زمانی که دیتایی نیامده و میخواهیم چیزی نشان دهیم
    const getRows = () => {
        let rows = [];
        let row = 0;
        let rowItems = [];
        let max = items.length;
        let z = 0;
        if (maxItems != null && maxItems < max) {
            max = maxItems;
        }
        for (let i = 0; i < max; i++) {
            rowItems[z++] = items[i];
            if (z === 7 || i + 1 === max) {
                rows.push(<SingleRowList key={`single-row-${payloadType}-${payloadKey}-${key}-${row}`} data={{
                    payloadType,
                    payloadKey,
                    items: rowItems,
                    key,
                    slug
                }} ItemComponent={ItemComponent} placeholder={false} />)
                z = 0;
                rowItems = [];
            }
        }
        return rows;
    }


    let canIRender = items.length > 0;

    return (
        <div ref={ref} className={`row-list col-12 p-0 ${className}`}>
            {title && (
                <div className='row-title'>
                    <h3>{title}</h3>
                    <Link className='more-link'>
                        <span>مشاهده همه</span>
                    </Link>
                </div>
            )}
            {canIRender && (
                getRows()
            )}
        </div>
    )
});

export default MultiLineList;