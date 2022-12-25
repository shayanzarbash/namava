import './PreviewItem.scss';
import MovieDetail from './MovieDetail';

const PreviwItem = ({ id, isActive }) => {
    return (
        <div className={`preview-item ${isActive === true ? 'active' : ''}`}>
            <MovieDetail />
        </div>
    )
}

export default PreviwItem;
