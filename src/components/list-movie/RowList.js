/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RowList.scss';
import Flickity from 'flickity';
import { fetchData } from '../../utils/Functions';
import { RealLazyLoad } from 'real-react-lazyload';



const RowList = React.forwardRef(({ className, data: { payloadType, payloadKey, title }, ItemComponent, placeholder = false }, ref) => {

    const flickityRef = createRef();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        if (items.length === 0 && loading === false && error === false) {
            fetchData(payloadType, payloadKey, (result) => {
                setItems(result);
            }, (error) => {
                setError(error);
            }, (isLoading) => {
                setLoading(isLoading);
            });
        }
    }, [loading, items]);

    useEffect(() => {
        let flickityHandler = undefined;
        let elem = flickityRef.current.querySelector('.list');
        if (flickityRef.current && elem) {
            flickityHandler = new Flickity(elem, {
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
    });

    // برای زمانی که دیتایی نیامده و میخواهیم چیزی نشان دهیم
    const getItems = () => {
        let content = [];

        if (placeholder || placeholder === false && items.length === 0) {
            let count = 8;
            if (typeof placeholder === 'number') {
                count = placeholder;
            }
            for (let i; i < count; i++) {
                content.push(<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${i}`} placeholder={true} />)
            }
        } else {
            content = items.map(item => (<ItemComponent key={`row-item-${payloadType}-${payloadKey}-${item.id}`} item={item} />))
        }
        return content;
    };


    if (placeholder) {
        return (
            <div ref={ref} className="row">
                {getItems()}
            </div>
        )
    }





    return (
        <div ref={ref} className={`row-list col-12 p-0 ${className}`}>
            <div className='row-title'>
                <h3>{title}</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='list-container' ref={flickityRef}>
                <RealLazyLoad placeholder={
                    <div></div>
                } componentEntryCallback={() => {
                    console.log("fff")
                    return false;
                }}>
                    {/* <div>
                        {(items.length > 0 && loading === false) && (getItems())}
                    </div> */}
                </RealLazyLoad>
            </div>
        </div>
    )

});

export default RowList;