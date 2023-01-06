import Config from '../Config';
import { getNamavaUrl } from '../utils/Functions';
import './PersonItem.scss';

const getRoleName = (role) => {
    switch (role) {
        case "Actor":
            return "بازیگر";

        case "Author":
            return "نویسنده";

        case "Director":
            return "کارکردان";

        default:
            return role;
    }
}

const PersonItem = ({ item, placeholder = false }) => {

    console.log("cast", item)

    let imageUrl = item.imageUrl || item.castImageUrl;
    if (imageUrl) {
        imageUrl = getNamavaUrl(imageUrl)
    } else {
        imageUrl = Config.defaultImage;
    }

    return (
        <div div className='person-item' >
            <a href='###'>
                <div className='person-image'>
                    {
                        placeholder === false && (
                            <img src={imageUrl} alt="" />
                        )
                    }
                </div>
                <div className='person-title'>
                    {item.castName}
                </div>
                <div className='person-role'>
                    {getRoleName(item.castRole)}
                </div>
            </a>
        </div>
    );
};

export default PersonItem;