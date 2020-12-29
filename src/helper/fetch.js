const baseUrl = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries?select=fields,sys.id,sys.version&locale=es-MX';
const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc' ;
const urlEntries = 'https://api.contentful.com/spaces/1t4hjzo7y0kb/environments/master/entries'
export const fetchData = async (method = 'GET', data) => {

    const contentType = "content_type=audiocontent-v7";

    let url;
    if(method === 'GET') url = `${baseUrl}&${contentType}` ;
    if(method === 'DELETE') url = `${urlEntries}/${data.id}`
    if(method === 'POST') url = `${urlEntries}`

    
    if (method === 'GET') {
        const resp = await fetch(url, {
            headers: {
                'Authorization': token
            }
        });
        return await resp.json();
    } else {
        try {
            console.log(JSON.parse(data));
            const resp = await fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': token,
                    'X-Contentful-Content-Type': 'audiocontent-v7'
                },
                body: JSON.parse(data)
            })
    
            return resp;
            
        } catch (error) {
            console.log(error);
        }
       
    }

}