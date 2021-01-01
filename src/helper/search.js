export const searchPhrases = (search, filter, callback) => {
    const curPhrases = loadPhrases();
    const onePhrase = curPhrases[0];
    const arra = objToArray(onePhrase);
    console.log(arra);
    // function to conver object to array
    function objToArray(obj) {
        let resArray = [];
        function recurObjToArray(obj) {
            const arrObjecKey = [];
            if (isObject(obj)) {

                const fArr = [...resArray, ...Object.entries(obj)];
                fArr.forEach(([key, value]) => {
                    resArray[key] = value;
                    if (isObject(value)) {
                        arrObjecKey.push(key);
                    }
                    // repeat the same function to foudn other object inside to Array
                    for (let i = 0; i < arrObjecKey.length; i++) {

                        const ind = arrObjecKey[i];
                        // si encuentra un objecto entonces recorra de nuevo la funcion
                        recurObjToArray(resArray[ind]);
                    }
                });
            }

            return [resArray, arrObjecKey];
        }
        // remover propieades de un array, teniendo las propieadaes a borrar en otro arrray
        function removeProperties(array, arrElements) {
            // list to delete from phrase array
            arrElements.push('autAvatar','autId','id','regular','thumb');
            for (const key in array) {
                if (arrElements.includes(key)){
                    delete array[key];
                } 
            }
            return array;
        }
        // copiar array
        const newArray = [...recurObjToArray(obj)];
        // remover las propiedades
        return removeProperties(...newArray);
    }
    /* ----------------- // end function convert object to array ---------------- */

    // this function chek if variable is object. Only object, no arrays
    function isObject(el) {
        return (typeof el === 'object' && el !== null && !Array.isArray(el)) ? true : false;
    }

    const phrases = curPhrases.filter(phrase => Object.values(objToArray(phrase)).some(val => val.toString().toLocaleLowerCase('es').includes(search)));
    return {
        type: types.phrasesSearch,
        payload: phrases
    }
}