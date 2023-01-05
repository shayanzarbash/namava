import React, { useEffect, useState } from 'react'
import '../style.scss';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/Functions';
import MovieDetail from '../components/movie/MovieDetail';
import TrailerLists from '../components/list-movie/TrailerList';

// in this page : show data from api and routes page
const Single = () => {

    const { type, id, name } = useParams();
    const [state, setState] = useState({
        id: undefined,
        data: null,
        error: false,
        loading: false
    });

    useEffect(() => {
        if (state.loading === false && state.error === false && (state.data === null && state.id !== id)) {
            const payloadType = type === "series" ? "SinglePageSeries" : "SinglePageMovie";
            fetchData(payloadType, id, (result) => {
                setState({ ...state, id: id, data: result, error: false, loading: false });
            }, () => { }, (isLoading) => {
                if (isLoading) {
                    setState({ ...state, loading: true });
                }
            })

        }
    }, [state, id, type]);

    return (
        <div className='single'>
            {
                state.loading === false && state.data !== null && (
                    <>
                        <div className='p-0'>
                            <MovieDetail data={state.data} topMedia={true} />
                        </div>
                        {
                            state.data.slideImageList && (
                                <div className='row px-2'>
                                    <div className='col-12'>
                                        <TrailerLists id={id} images={state.data.slideImageList} />
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }

        </div>
    )
}

export default Single;
