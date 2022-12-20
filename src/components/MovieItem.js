import React from 'react';
import { getNamavaUrl } from '../utils/Functions';
import './MovieItem.scss';
import { ImageRealLazyLoad } from 'real-react-lazyload';

const getCaption = (info) => {
    let caption = info['caption'] || info['seriesCaption'];
    if (info['episodeCaption']) {
        let partsCaption = info['episodeCaption'].split('-');
        caption = <>
            <div className='serious-title'>{partsCaption[0]}</div>
            <div className='episode-title'>{partsCaption[1]}</div>
        </>

    }
    return caption;
}


const MovieItem = ({ item, placeholder = false }) => {
    return (
        <div className='movie-item'>
            <div className='item-image'>
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl']) || item['seriesImageUrl']} alt={item.caption} />
                )}
            </div>
            <div className='item-title'>
                <span> {placeholder === false && getCaption(item)} </span>
            </div>
        </div>
    )
}


export default MovieItem;
