import './Slider.scss';
import SliderItem from './SliderItem';
import { useEffect } from 'react';
import { types, useSlider } from '../../context/SliderContext';
import Guide from '../../utils/Guide';
import Config from '../../Config';

const fetchSlider = async (dispatch, sliderID) => {
    dispatch({ type: types.SET_LOADING });
    let url = (Config.Slider.url).replace('{{SLIDER_ID}}', sliderID);
    let { data: { succeeded, result, errors } } = await Guide.get(url);
    if (succeeded) {
        dispatch({
            type: types.SET_ITEMS,
            items: result,
            id: sliderID,
        });
    } else {
        dispatch({
            type: types.SET_ERRORS,
            errors,
        });
    }
}


const Slider = ({ sliderID }) => {

    const { state, dispatch, nextSlide } = useSlider();

    console.log("state", state)

    useEffect(() => {
        fetchSlider(dispatch, sliderID);
    }, [dispatch, sliderID]);

    useEffect(() => {
        let sliderTimeHandler = undefined;
        sliderTimeHandler = setTimeout(() => {
            nextSlide();
        }, 3000);

        return () => {
            clearTimeout(sliderTimeHandler);
        }
    });

    return (
        <div className='col-12 p-0 slider'>
            {(state.succeeded && state.items.length > 0) && state.items.map((sliderItem, index) => (
                <SliderItem key={sliderItem['id']} slider={sliderItem}
                    className={state.currentSlide == index ? 'active' : (state.previousSlide == index ? 'previous' : '')}
                />
            ))};
        </div>
    )
}


export default Slider;