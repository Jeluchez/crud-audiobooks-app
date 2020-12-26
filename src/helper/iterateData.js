
// return all audio books with prefixed in all filde "es-Mx"

export const mapData = items => items.map((item) =>{

    // rename data
    const fields = renameData(item.fields);
    
    return {
        ...fields,
        key : item.sys.id
    }
})

function renameData(field){

    const newField= null;

    for (const prop in field) {
        newField={
            
        }

    }
    return field.map( fieldAttr => Object.keys(fieldAttr));
}

