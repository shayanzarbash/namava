import Config from '../Config';
import { getNamavaUrl, getItemUrl } from '../utils/Functions';
import './PersonItem.scss';
import { Link } from 'react-router-dom';

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

    let imageUrl = item['imageUrl'] || item['castImageUrl'];
    if (imageUrl) {
        imageUrl = getNamavaUrl(imageUrl);
    } else {
        imageUrl = Config.defaultImage;
    }
    return <div className="person-item">
        <Link to={placeholder === false ? getItemUrl(item, "Person") : "#"}>
            <div className="person-image">
                {placeholder === false && (
                    <img src={imageUrl} alt={item['castName']} />
                )}
            </div>
            <div className="person-title">
                {item['castName']}
            </div>
            <div className="person-role">
                {getRoleName(item['castRole'])}
            </div>
        </Link>
    </div>
}

export default PersonItem;