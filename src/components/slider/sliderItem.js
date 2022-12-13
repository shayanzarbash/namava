import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getNamavaUrl } from '../../utils/Functions';
import ActionButton from '../ActionButton';

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

const SliderItem = ({ slider, className }) => {

    return (
        <div className={`slider-container ${className}`}>
            <Slide imageUrl={getNamavaUrl(slider['coverLandscape'])}>
                <div className="slide-info-container">
                    {slider['logoImageUrl'] && (
                        <Link to="#">
                            <img src={getNamavaUrl(slider['logoImageUrl'])} alt={slider.title} className="logo-image" />
                        </Link>
                    )}
                    {slider['title'] && (
                        <h2 className='title'>
                            {slider.title}
                        </h2>
                    )}
                    <ActionButton item={slider} />
                </div>
            </Slide>
        </div>
    )
}

export default SliderItem;