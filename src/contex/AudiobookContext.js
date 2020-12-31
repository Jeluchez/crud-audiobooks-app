import { createContext, useState } from 'react';


export const AudiobookContext = createContext();

export const AudioBookProvider = ({ children }) => {

    const [audioBooks, setAudioBooks] = useState(null);
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