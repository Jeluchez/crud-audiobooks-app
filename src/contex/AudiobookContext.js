import { createContext,  useState } from 'react';
import {loadAudiobooks } from '../helper/fetch';



export const AudiobookContext = createContext();

export const AudioBookProvider = ({ children }) => {

    const [audioBooks, setAudioBooks] = useState({ audiobooksData: null, loading: true });
    const [selectedAudioBook, setSelectedAudioBook] = useState({
        selected: null,
        isAdded: false,
    });
    const searchAudioobooks = async (search, filter = null, callback) => {
        const currentBooks = await loadAudiobooks();
        // console.log(arra);
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
            function removeProperties(array, arrElements, filter) {
                // list to delete from phrase array
                arrElements.push('key', 'sys');

                filter = filter==='cost' ? 'cost_per_play' : filter;

                if (filter) {
                    array = { [filter]: [array[filter]] };
                    console.log(array);
                    return array;
                }
                for (const key in array) {
                    if (arrElements.includes(key)) {
                        delete array[key];
                    }
                }
                return array;
            }
            // copiar array
            const newArray = [...recurObjToArray(obj)];
            // remover las propiedades
            return removeProperties(...newArray, filter);
        }
        /* ----------------- // end function convert object to array ---------------- */

        // this function chek if variable is object. Only object, no arrays
        function isObject(el) {
            return (typeof el === 'object' && el !== null && !Array.isArray(el)) ? true : false;
        }
        const resAbSearch = currentBooks
            .filter(phrase => Object.values(objToArray(phrase))
                .some(val => val.toString().toLocaleLowerCase('es')
                    .includes(search)));

        return resAbSearch;
    }

    return (
        <AudiobookContext.Provider value={{
            audioBooks,
            setAudioBooks,
            setSelectedAudioBook,
            selectedAudioBook,
            searchAudioobooks,
            loadAudiobooks
        }}>
            { children}
        </AudiobookContext.Provider>
    )

}