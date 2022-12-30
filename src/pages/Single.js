import React, { useEffect, useState } from 'react'
import '../style.scss';
import { useParams } from 'react-router-dom';
import { fetchData } from '../utils/Functions';

// in this page : show data from api and routes page
const Single = () => {

    const { type, id, name } = useParams();
    const [state, setState] = useState({
        id: undefined,
        data: [],
        error: false,
        loading: false
    });

    useEffect(() => {

        if (state.loading === false && state.error === false && state.data === [] && state.id !== id) {
            const payloadType = type === "series" ? "SinglePageSeries" : "SinglePageMovie";
            fetchData(id, payloadType, (result) => {
                setState({ ...state, id: id, data: result, error: false, loading: false });
            }, () => { }, (isLoading) => {
                if (isLoading) {
                    setState({ ...state, loading: true });
                }
            })

        }
    }, [state, id, type]);

    console.log(type, id, name, state);

    console.log("sisngle")
    return (
        <div className="namess">bggggggggggggggggggggggg
            thththh
            bhfhfth
        </div>
    )
}

export default Single;
