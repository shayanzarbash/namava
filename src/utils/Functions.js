import Config from '../Config';
import Guide from './Guide';

export function getNamavaUrl(url) {
    return `https://www.namava.ir${url}`;
}

export const fetchData = async (payloadType, payloadKey, onSuccess, onError, setLoading,) => {

    if (setLoading) {
        setLoading(true);
    }
    let section = Config.sections[payloadType];

    if (section === undefined || section.url === null) {
        if (setLoading) {
            setLoading(false)
        }

        onError(`error${payloadType}`);

        return;
    }

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

    if (succeeded === true) {
        onSuccess(result);

    } else {
        onError(error);
    }
}