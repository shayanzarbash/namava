import './Slider.scss';
import SliderItem from './SliderItem';
import axios from 'axios';
import { useEffect } from 'react';

const request = async () => {
    const url = await axios.get("https://www.namava.ir/api/v1.0/medias/sliders/1316");
    console.log(url['data']);
}
export const Slider = () => {

    useEffect(() => {
        request();
    });

    return (
        <div className='col-12 p-0 slider'>
            <SliderItem />
        </div>
    )
}


export default Slider;