/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RowList.scss';
import Flickity from 'flickity';
import { fetchData } from '../../utils/Functions';
import { RealLazyLoad } from 'real-react-lazyload';


// به علت تعداد بالای استیت هاردیوسر قرار داد
// const types = {
//     "SET_LOADING": "SET_LOADING",
//     "SET_ITEMS": "SET_ITEMS",
//     "SET_ERROR": "SET_ERROR",
//     "SET_FETCH_REQUEST": "SET_FETCH_REQUEST",
// }

// let rowListReducer = (state, action) => {
//     switch (action.type) {
//         case types.SET_LOADING:
//             state = { ...state, loading: action.loading }
//             break;
//     }

//     return state;
// };



const RowList = React.forwardRef(({ className, data: { payloadType, payloadKey, title }, ItemComponent, placeholder = false }, ref) => {

    const flickityRef = createRef();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [fetchRequest, setFetchRequest] = useState(false);

    useEffect(() => {

        if (fetchRequest && (items.length === 0 && loading === false && error === false)) {
            fetchData(payloadType, payloadKey, (result) => {
                setItems(result);
            }, (error) => {
                setError(error);
            }, (isLoading) => {
                setLoading(isLoading);
            });
        }
    }, [payloadType, payloadKey, placeholder, fetchRequest]);

    useEffect(() => {
        let flickityHandler = undefined;
        if (flickityRef.current && flickityRef.current.querySelector('.list')) {
            flickityHandler = new Flickity(flickityRef.current.querySelector('.list'), {
                contain: true,
                pageDots: false,
                prevNextButtons: false,
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
    }, [flickityRef.current, items.length]);

    // برای زمانی که دیتایی نیامده و میخواهیم چیزی نشان دهیم
    const getItems = () => {
        let content = [];

        if (placeholder || placeholder === false && items.length === 0) {
            let count = 10;
            console.log(typeof placeholder);
            if (typeof placeholder === 'number') {
                count = placeholder;
            }
            for (let i = 0; i < count; i++) {
                content.push(<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${i}`} placeholder={true} />)
            }
        } else {
            content = items.map(item => (<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${item.id}`} item={item} />))
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
            <div className='row-title'>
                <h3>{title}</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='list-container' ref={flickityRef}>
                <RealLazyLoad forceVisible={canIRender} placeholder={<RowList placeholder={true} data={{ payloadKey, payloadType }} ItemComponent={ItemComponent} />}
                    componentEntryCallback={() => {
                        if (fetchRequest === false) {
                            setFetchRequest(true);
                        }
                        return false;
                    }}>
                    <div className='list'>
                        {(items.length > 0 && loading === false) && (getItems())}
                    </div>
                </RealLazyLoad>
            </div>
        </div>
    )

});

export default RowList;