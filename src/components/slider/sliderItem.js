import React from 'react'
import styled from 'styled-components';

const Slide = styled.div`
width: 100%;
height: 100%;
background-image: linear-gradient(rgba(18, 18, 18, 0) 10vw, rgb(18, 18, 18) 46.875vw),
 linear-gradient(to left, rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0) 50%),
 url(${props => props["imageUrl"]});
 min-height: 100%;
 background-size: contain;
 background-repeat: no-repeat;
 padding-bottom: 40px;
`;

const SliderItem = () => {

    return (
        <div className='slider-container'>
            <Slide imageUrl={"https://static.namava.ir/Content/Upload/Images/e81e22fe-f7d4-4781-81ad-d16b06bf8006.jpg?anchor=middlecenter&crop=auto&scale=both&w=1920&h=900"}>

            </Slide>
        </div>
    )
}

export default SliderItem;