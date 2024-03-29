import './Slider.scss';
import SliderItem from './SliderItem';
import { useEffect } from 'react';
import { types, useSlider } from '../../context/SliderContext';
import Guide from '../../utils/Guide';
import Config from '../../Config';
import DarkMode from '../DarkMode';

const fetchSlider = async (dispatch, sliderID) => {
    dispatch({ type: types.SET_LOADING, });
    let url = (Config.sections.Slider.url).replace('{{SLIDER_ID}}', sliderID);
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

    const { state, dispatch, nextSlide, previousSlide } = useSlider();

    // for fetch data useEffet
    useEffect(() => {
        fetchSlider(dispatch, sliderID);
    }, [dispatch, sliderID]);

    useEffect(() => {
        let sliderTimeHandler = undefined;
        sliderTimeHandler = setTimeout(() => {
            nextSlide();
        }, 6000);

        return () => {
            clearTimeout(sliderTimeHandler);
        }
    });

    return (
        <div className='col-12 p-0 slider'>
            <DarkMode />
            {(state.succeeded && state.items.length > 0) && state.items.map((sliderItem, index) => (
                <SliderItem key={sliderItem['id']}
                    slider={{ ...sliderItem, title: sliderItem.caption }}
                    className={state.currentSlide === index ? 'active' : (state.previousSlide === index ? 'previous' : '')}
                />
            ))};
            <div className="slider-arrowBox">
                <div className="slider-arrow slider-arrow-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="#fff"
                        className="slider-arrow--chevron" onClick={previousSlide}>
                        <path d="M0 0h25c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0z" opacity=".3"></path>
                        <path
                            d="M28.65 25.042c.001-.55-.218-1.078-.607-1.466l-6.906-6.906c-.812-.795-2.113-.788-2.916.016s-.8 2.104-.015 2.916l5.444 5.44-5.44 5.44c-.56.515-.795 1.296-.61 2.035s.762 1.316 1.5 1.503 1.52-.046 2.035-.606l6.906-6.906c.39-.388.607-.915.607-1.465z"
                            opacity=".404"></path>
                    </svg>
                </div>
                <div className="slider-arrow slider-arrow-right" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="#fff"
                        className="slider-arrow--chevron">
                        <path d="M0 0h25c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0z" opacity=".3"></path>
                        <path
                            d="M28.65 25.042c.001-.55-.218-1.078-.607-1.466l-6.906-6.906c-.812-.795-2.113-.788-2.916.016s-.8 2.104-.015 2.916l5.444 5.44-5.44 5.44c-.56.515-.795 1.296-.61 2.035s.762 1.316 1.5 1.503 1.52-.046 2.035-.606l6.906-6.906c.39-.388.607-.915.607-1.465z"
                            opacity=".404"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}


export default Slider;