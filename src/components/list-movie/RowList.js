/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import './RowList.scss';
import Flickity from 'flickity';
import { fetchData } from '../../utils/Functions';
import { RealLazyLoad } from 'real-react-lazyload';
import PreviwItem from '../movie/PreviewItem';


const types = {
    "SET_LOADING": "SET_LOADING",
    "SET_ITEMS": "SET_ITEMS",
    "SET_ERROR": "SET_ERROR",
    "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
}

let rowListReducer = (state, action) => {
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
            throw Error("error RowList");
    }

    return state;
};


const initialState = {
    items: [],
    loading: false,
    error: false,
    fetchRequest: false
}


const RowList = React.forwardRef(({ className, data: { payloadType, payloadKey, title }, ItemComponent, placeholder = false, preview = false }, ref) => {
    const flickityRef = createRef();
    const [state, dispatch] = useReducer(rowListReducer, initialState, (initState) => initState);
    const { items, loading, error, fetchRequest } = state;

    useEffect(() => {
        if (fetchRequest && (items.length === 0 && loading === false && error === false)) {
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

    useEffect(() => {
        let flickityHandler = undefined;
        if (flickityRef.current && flickityRef.current.querySelector('.list')) {
            flickityHandler = new Flickity(flickityRef.current.querySelector('.list'), {
                contain: true,
                pageDots: false,
                prevNextButtons: true,
                cellAlign: 'right',
                rightToLeft: true,
                groupCells: true
            });
        }
        // موقع نابودی درخواست (باید نابود شوند )
        return () => {
            if (flickityHandler) {
                flickityHandler.remove();
            }
        }
    }, [flickityRef, items.length]);

    const [previewState, setPreviewState] = useState({
        id: undefined,
        active: false
    });

    const togglePreview = (id) => {
        setPreviewState(oldState => {
            let newState = { ...oldState };
            if (id !== oldState.id) {
                newState.id = id;
                newState.active = true;
            } else {
                newState.active = !oldState.active
            }
            return newState;
        });
    }

    // برای زمانی که دیتایی نیامده و میخواهیم چیزی نشان دهیم
    const getItems = () => {
        let content = [];
        if (placeholder || (placeholder === false && items.length === 0)) {
            return <></>
        } else {
            content = items.map(item => (<ItemComponent className={((item.id || item.episodId) === previewState.id) && previewState.active ? "active" : ""} togglePreview={togglePreview} key={`row-item-${payloadType}-${payloadKey}-${item['id'] || item['episodId']}`} item={item} />))
        }
        return content;
    };

    if (placeholder) {
        return (
            <div ref={ref} className="list">
                {getItems()}
            </div>
        )
    }

    let canIRender = items.length > 0 && error === false && loading === false;

    return (
        <div ref={ref} className={`row-list col-12 p-0 ${className}`}>
            {
                placeholder || (placeholder === false && items.length === 0) ? (
                    <></>
                ) : (
                    <div className='row-title'>

                        <h3>{title}</h3>
                        <Link className='more-link'>
                            <span>مشاهده همه</span>
                        </Link>
                    </div>
                )
            }
            <div className='list-container' ref={flickityRef}>
                <RealLazyLoad forceVisible={canIRender} placeholder={<RowList placeholder={true} data={{ payloadKey, payloadType }} ItemComponent={ItemComponent} />}
                    componentEntryCallback={() => {
                        if (fetchRequest === false && loading === false) {
                            dispatch({ type: types.SET_FETCH_REQUEST });
                        }
                        return false;
                    }}>
                    <div className='list'>
                        {(items.length > 0 && loading === false) && (getItems())}
                    </div>
                </RealLazyLoad>
            </div>
            {(preview === true && canIRender) && (
                <PreviwItem id={previewState['id']} isActive={previewState['active']} />
            )}
        </div >
    )

});

export default RowList;