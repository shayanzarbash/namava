import Config from '../Config';
import Guide from './Guide';

export function getNamavaUrl(url) {
    return `https://www.namava.ir${url}`;
}


export const fetchData = async (payloadKey, payloadType, setLoading, onSuccess, onError) => {
    if (setLoading) {
        setLoading(true);
    }
    console.log("onError", onError);
    let section = Config.sections[payloadType];

    if (section === undefined || section.url === null) {
        if (setLoading) {
            setLoading(false)
        }
        else {
            onError(`error${payloadType}`);
        }
        return;
    }

    console.log("payloadKey", payloadKey);
    let url = section.url.replace('{{PEYLOAD_KEY}}', payloadKey);

    let { data: { succeeded, result, error } } = await Guide.get(url, {
        params: {
            pi: Config.sections[payloadType].pi || undefined,
            ps: Config.sections[payloadType].ps || undefined,
        }
    });


    if (setLoading) {
        setLoading(false);
    };

    if (succeeded === true && error === null) {
        onSuccess(result);
    } else {
        onError(error);
    }
}