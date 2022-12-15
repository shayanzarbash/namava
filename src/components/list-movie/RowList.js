/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieItem from '../MovieItem';
import './RowList.scss';
import Flickity from 'flickity';
import Guide from '../../utils/Guide';

const fetchData = async (setItems, setLoading, setError) => {
    setLoading(true);
    let { data } = await Guide.get('api/v1.0/post-groups/1263/medias?pi=1&ps=20');
    setLoading(false);
    if (data['succeeded'] === true) {
        setItems(data['result']);
    }
}


const RowList = ({ className, data }) => {

    const flickityRef = createRef();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (items.length === 0 && loading === false && error === false) {
            fetchData(setItems, setLoading, setError);
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

        return () => {
            if (flickityHandler) {
                flickityHandler.remove();
            }
        }

    });

    return (
        <div className={`row-list col-12 p-0 ${className}`}>
            <div className='row-title'>
                <h3>فیلم ویژه</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='list-container' ref={flickityRef}>
                {(items.length > 0 && loading === false) && (
                    <div className='d-flex list'>
                        {items.map(item => (<MovieItem key={`row-list-${item.id}`} item={item} />))}
                    </div>
                )}
            </div>
        </div>
    )

}

export default RowList;