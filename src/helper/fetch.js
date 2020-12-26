const baseUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc' ;

export const fetchData = async (method = 'GET', data) => {

    const contentType = "content_type=audiocontent-v7";

    const url = data ? `${baseUrl}${data}&${contentType}` : `${baseUrl}&${contentType}` ;

    if (method === 'GET') {
        const resp = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        })

        return await resp.json();
    }

}