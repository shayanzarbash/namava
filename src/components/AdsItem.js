import React from 'react'
import { Link } from 'react-router-dom';
import { ImageRealLazyLoad } from 'real-react-lazyload';
import { getNamavaUrl } from '../utils/Functions';
import './AdsItem.scss';

const AdsItem = ({ item, placeholder = false }) => {
    return (
        <div className='ads-item'>
            <Link to="#">
                {placeholder === false && (
                    <ImageRealLazyLoad src={getNamavaUrl(item['imageUrl'])} alt={item.caption} />
                )}
            </Link>
        </div>
    )
}


export default AdsItem;