import moment from 'moment';
// return all audio books with prefixed in all filde "es-Mx"

export const mapData = items => items.map((item) =>{
    const fields = renameData(item.fields);
    return {
        ...fields,
        key : item.sys.id
    }
})

function renameData(field){

    let  newField= null;

    for (const prop in field) {
       
        if (prop === 'duration') {
            const duration =  moment(Object.values(field[prop])[0]).format('HH:mm');
            newField={
                ...newField,
                [prop] : duration,
            }
            continue;
        }
        // if(prop === 'street_date'){

        // }

        newField={
            ...newField,
            [prop] : Object.values(field[prop]),
        }

    }
    return newField;
}

