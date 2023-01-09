import React from 'react'
import { Link } from 'react-router-dom';
import { ImageRealLazyLoad } from 'real-react-lazyload';
import { getNamavaUrl } from '../utils/Functions';
import './BannerItem.scss';

const BannerItem = ({ item, placeholder = false }) => {
    return (
        <div className='banner-item'>
            <div className='banner-image'>
                <Link to="#">
                    {placeholder === false && (
                        <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])} alt={item.caption} />
                    )}
                </Link>
            </div>
            <div className='item-title'>
                {placeholder === false && item.caption}
            </div>
        </div>
    )
}


export default BannerItem;