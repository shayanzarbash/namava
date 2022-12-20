import React from 'react';
import { getNamavaUrl } from '../utils/Functions';
import './MovieItem.scss';
import { ImageRealLazyLoad } from 'real-react-lazyload';

const MovieItem = ({ item, placeholder = false }) => {
    return (
        <div className='movie-item'>
            <div className='item-image'>
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])} alt={item.caption} />
                )}
            </div>
            <div className='item-title'>
                <span> {placeholder === false && item.caption} </span>
            </div>
        </div>
    )
}


export default MovieItem;
