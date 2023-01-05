import { getNamavaUrl } from '../utils/Functions';
import './TrailerItem.scss'

const TrailerItem = ({ item, placeholder = false, }) => {

    console.log("itmes", item)
    return (
        <div className='trailer-item'>
            <div className='trailer-image'>
                {placeholder === false && (
                    <img src={getNamavaUrl(item.imageUrl)} alt="" />

                )}
            </div>
        </div>
    )
}

export default TrailerItem;