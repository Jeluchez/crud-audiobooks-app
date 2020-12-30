import { createContext, useState } from 'react';


export const AudiobookContext = createContext();

export const AudioBookProvider = ({ children }) => {

    const [audioBooks, setAudioBooks] = useState(null);
    const [selectedAudioBook, setSelectedAudioBook] = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    
    return(
        <AudiobookContext.Provider value={{
            setIsAdded,
            audioBooks,
            isAdded,
            setAudioBooks,
            setSelectedAudioBook,
            selectedAudioBook,
        }}>
            { children }
        </AudiobookContext.Provider>
    )
    
}