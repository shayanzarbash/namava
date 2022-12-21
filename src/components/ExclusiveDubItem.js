import React from 'react';
import { getNamavaUrl } from '../utils/Functions';
import './ExclusiveDubItem.scss';
import { ImageRealLazyLoad } from 'real-react-lazyload';

const getCaption = (info) => {
    let caption = info['caption'] || info['seriesCaption'];
    if (info['episodCaption']) {
        let partsCaption = info['episodCaption'].split('-');
        caption = <>
            <span className='serious-title'>{partsCaption[0]}</span>
            <span className='episode-title'>{partsCaption[1]}</span>
        </>
    }
    return caption;
}

const ExclusiveDubItem = ({ item, placeholder = false }) => {
    return (
        <div className='exclusive-dub-item'>
            <div className='item-image'>
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'] || item['seriesImageUrl'])} alt={item.caption} />
                )}
            </div>
            <div className='item-title'>
                <div className='item-list-title'>{placeholder === false && getCaption(item)}</div>
            </div>
        </div>
    )
}


export default ExclusiveDubItem;
