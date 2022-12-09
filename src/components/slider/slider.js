import './Slider.scss';
import SliderItem from './SliderItem';
import axios from 'axios';
import { useEffect } from 'react';
import { types, useSlider } from '../../context/SliderContext';


const fetchSlider = async (dispatch, sliderId) => {
    dispatch({
        type: types.SET_LOADING
    });
    const { data: { succeeded, result, errors } } = await axios.get(`https://www.namava.ir/api/v1.0/medias/sliders/${sliderId}`);
    dispatch({
        type: types.SET_ITEMS,
        item: result,
        id: sliderId
    })
}
export const Slider = ({ sliderId }) => {

    const { state, dispatch } = useSlider();

    console.log("gfgg", state)

    useEffect(() => {
        fetchSlider(dispatch, sliderId);
    }, [dispatch, sliderId]);

    return (
        <div className='col-12 p-0 slider'>
            <SliderItem />
        </div>
    )
}


export default Slider;