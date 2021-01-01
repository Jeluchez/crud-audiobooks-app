import { mapData } from "./iterateData";

const baseUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';
const urlEntries = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries'
export const fetchData = async (method = 'GET', data, sys=null) => {

    const contentType = "content_type=audiocontent-v7";

    let url;
    if (method === 'GET') url = `${baseUrl}&${contentType}`;
    if (method === 'DELETE') url = `${urlEntries}/${data.id}`;
    if (method === 'POST') url = `${urlEntries}`;
    if (method === 'PUT') url = `${urlEntries}/${sys.id}`;

    if (method === 'GET') {
        const resp = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });
        return await resp.json();
    } else {
        try {
            const resp = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token,
                    'X-Contentful-Content-Type': 'audiocontent-v7',
                    'X-Contentful-Version': sys?.version || '1'
                },
                body: JSON.stringify(data)
            })
            if (method === 'DELETE') {
                return resp;
            }

            return await resp.json();

        } catch (error) {
            console.log(error);
        }

    }

}

export const loadAudiobooks = async () => {
    const { items } = await fetchData();
    //    mapea los datos para que la tabla pueda ordenarlos
    return mapData(items);
}