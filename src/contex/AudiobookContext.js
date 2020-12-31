import { createContext, useContext, useEffect, useState } from 'react';
import { FormContext } from './FormContext';


export const AudiobookContext = createContext();

export const AudioBookProvider = ({ children }) => {

   
    
    const [audioBooks, setAudioBooks] = useState({audiobooksData:null,loading:true});
    const [selectedAudioBook, setSelectedAudioBook] = useState({
        selected:null,
        isAdded: false,
    });


    return (
        <AudiobookContext.Provider value={{
            audioBooks,
            setAudioBooks,
            setSelectedAudioBook,
            selectedAudioBook,
        }}>
            { children}
        </AudiobookContext.Provider>
    )

}