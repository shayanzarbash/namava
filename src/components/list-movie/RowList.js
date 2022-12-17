/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RowList.scss';
import Flickity from 'flickity';
import { fetchData } from '../../utils/Functions';



const RowList = ({ className, data: { payloadType, payloadKey, title }, ItemComponent }) => {

    const flickityRef = createRef();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        if (items.length === 0 && loading === false && error === false) {
            fetchData(payloadType, (result) => {
                console.log("res", result);
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

    return (
        <div className={`row-list col-12 p-0 ${className}`}>
            <div className='row-title'>
                <h3>{title}</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='list-container' ref={flickityRef}>
                {/* برای نمایش دیتا درون آرایه ای باید مپ کرد و توسط شرط هایی  */}
                {(items.length > 0 && loading === false) && (
                    <div className='d-flex list'>
                        {items.map(item => (<ItemComponent key={`row-list-${item.id}`} item={item} />))}
                    </div>
                )}
            </div>
        </div>
    )

}

export default RowList;