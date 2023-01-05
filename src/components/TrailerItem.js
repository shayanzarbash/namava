import { getNamavaUrl } from '../utils/Functions';
import './TrailerItem.scss'

const TrailerItem = ({ item, placeholder = false, click }) => {


    console.log(click)

    return (
        <div className='trailer-item' onClick={click}>
            <div className='trailer-image'>
                {placeholder === false && (
                    <img src={getNamavaUrl(item.imageUrl)} alt="" />
                )}
            </div>
        </div>
    )
}

export default TrailerItem;