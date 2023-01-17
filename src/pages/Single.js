import React, { useEffect, useState } from 'react'
import '../style.scss';
import { useParams } from 'react-router-dom';
import { fetchData, getMediaDetailText } from '../utils/Functions';
import MovieDetail from '../components/movie/MovieDetail';
import TrailerLists from '../components/list-movie/TrailerList';
import Config from '../Config';
import PersonItem from '../components/PersonItem';
import MultiLineList from '../components/list-movie/MultiLineList';
import MovieItem from '../components/MovieItem';
import Comments from '../components/movie/Comments';

// in this page : show data from api and routes page
const Single = () => {

    const { type, id } = useParams();
    const [state, setState] = useState({
        id: undefined,
        data: null,
        error: false,
        loading: false
    });

    console.log(useParams());

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

    console.log(state.data);

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
                                <div className=''>
                                    <div className=''>
                                        <TrailerLists id={id} images={state.data.slideImageList} />
                                    </div>
                                </div>
                            )
                        }
                        <div className="single-row">
                            <div className="col-12 px-5">
                                {state['data']['movieLatinName'] && (
                                    <div className="media-detail-latin-name">
                                        {state['data']['movieLatinName']}
                                    </div>
                                )}
                                {state['data']['caption'] && (
                                    <div className="media-detail-title">
                                        درباره {(() => {
                                            return state['data']['type'] === Config.itemTypes.Series ? 'سریال ' : 'فیلم '
                                        })()}
                                        {state['data']['caption']}
                                    </div>
                                )}
                                {state['data']['about'] && (
                                    <div className="media-detail-description" dangerouslySetInnerHTML={{ __html: state['data']['about'] }}></div>
                                )}
                                {state['data']['categories'] && (
                                    getMediaDetailText('دسته بندی', state['data']['categories'], 10, 'category', ' ، ')
                                )}
                                {state['data']['voiceList'] && (
                                    getMediaDetailText('صدا', state['data']['voiceList'], 10, 'language', ' ، ')
                                )}
                                {state['data']['subtitleList'] && (
                                    getMediaDetailText('زیرنویس', state['data']['subtitleList'], 10, 'language', ' ، ')
                                )}
                            </div>
                        </div>
                        <div className=''>
                            {(state['data']['casts'] && state['data']['casts'].length > 0) && (
                                <MultiLineList data={{
                                    payloadType: 'PersonList',
                                    payloadKey: id,
                                    items: state.data.casts,
                                    key: "castId",

                                }} preview={false} ItemComponent={PersonItem} placeholder={false} />
                            )}
                        </div>
                        {/* <MultiLineList data={{
                            payloadType: "SinglePageRelated",
                            payloadKey: id,
                            options: {
                                categoryId: (state['data']['categories'] && state['data']['categories'].length > 0) ? state['data']['categories'][0]['categoryId'] : undefined,
                            },
                            maxItems: 14
                        }} preview={true} placeholder={false} ItemComponent={MovieItem} /> */}
                        <Comments mediaId={id} />
                    </>
                )
            }
        </div>
    )
}

export default Single;
