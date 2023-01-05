import React from 'react'
import TrailerItem from '../TrailerItem';
import RowList from './RowList';
import './TrailerList.scss';

const TrailerLists = ({ id, images }) => {

    let items = [];
    images.forEach((image, index) => {
        items.push({
            id: `${id}-${index}`,
            imageUrl: image.url + "?anchor=middlecenter&crop=auto&scale=both&w=546&h=411",
        })
    });


    return (
        <div className='trailer-list'>
            <h3 className='trailer-list title'>تصاویر</h3>
            <div className='row'>
                <div className='col-12 p-0'>
                    <RowList ItemComponent={TrailerItem} data={{ payloadType: "TrailerList", payloadKey: id, items: items }} placeholder={false} />
                </div>
            </div>
        </div>
    )
}

export default TrailerLists;