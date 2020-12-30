import moment from 'moment';
// return all audio books with prefixed in all filde "es-Mx"

export const mapData = items => items.map((item) => {
    const fields = renameData(item.fields);
    return {
        ...fields,
        key: item.sys.id,
        sys: item.sys
    }
})

export function renameData(field) {

    let newField = null;

    for (const prop in field) {

        if (prop === 'duration') {
            const duration = moment(Object.values(field[prop])[0]).format('HH:mm:ss');
            newField = {
                ...newField,
                [prop]: duration,
            }
            continue;
        }
        if (prop === 'street_date') {
            const streetDate = moment(Object.values(field[prop])[0], "YYYYMMDD").fromNow();
            newField = {
                ...newField,
                [prop]: streetDate,
                dateToSort: moment(Object.values(field[prop])[0]).format('DD-MM-YYYY')
            }
            continue;
        }
        newField = {
            ...newField,
            [prop]: Object.values(field[prop])[0],
        }

    }
    return newField;
}
export function renameDataToForm(field) {


    field['duration']= moment(field['duration'], 'HH:mm:ss')
    field['street_date'] = field['dateToSort']
          
    return field;
}

export const revertMapData = (audiobook) => {

    let newAudioBook = null;
    // convert to milisecondst
    audiobook.duration = moment(audiobook.duration).valueOf();
    audiobook.street_date = moment().format('YYYY-MM-DD');
    // console.log(audiobook.street_date);
    audiobook.is_original = false;

    for (const prop in audiobook) {
        newAudioBook = {
            ...newAudioBook,
            [prop]: { 'es-MX': audiobook[prop] }
        }

    }
    return newAudioBook;
}