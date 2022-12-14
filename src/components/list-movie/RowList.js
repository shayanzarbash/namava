import { Link } from 'react-router-dom';
import MovieItem from '../MovieItem';
import './RowList.scss'

const RowList = () => {
    return (
        <div className='row-list col-12 p-0'>
            <div className='row-title'>
                <h3>فیلم ویژه</h3>
                <Link className='more-link'>
                    <span>مشاهده همه</span>
                </Link>
            </div>
            <div className='row-container'>
                <div className='d-flex'>
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    <MovieItem />
                    

                </div>
            </div>
        </div>
    )

}

export default RowList;