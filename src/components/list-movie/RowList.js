import { createRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieItem from '../MovieItem';
import './RowList.scss';
import Flickity from 'flickity';


const RowList = () => {

    const flickityRef = createRef();

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
        <div className='row-list col-12 p-0'>
            <div className='row-title'>
                <h3>فیلم ویژه</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='list-container' ref={flickityRef}>
                <div className='d-flex list'>
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />

                </div>
            </div>
        </div>
    )

}

export default RowList;