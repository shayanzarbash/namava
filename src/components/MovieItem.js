import React from 'react';
import './MovieItem.scss';

const MovieItem = () => {
    return (
        <div className='movie-item'>
            <div className='item-image'>
                <img src="https://static.namava.ir/Content/Upload/Images/597ee6af-55eb-4a52-9f61-63885da5e15f.jpg?anchor=middlecenter&crop=auto&scale=both&w=200&h=294" alt="movie" />
            </div>
            <div className='item-title'>
                <span>مریخی ها</span>
            </div>
        </div>
    )
}


export default MovieItem;
