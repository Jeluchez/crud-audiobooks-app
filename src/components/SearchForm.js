import React, { useContext, useEffect, useState } from 'react';
import { AudiobookContext } from '../contex/AudiobookContext';
import { ItemsTypes } from './ItemsTypes';

export const SearchForm = () => {

    const {setSelectedAudioBook,searchAudioobooks, setAudioBooks } = useContext(AudiobookContext);

    const [items, setItems] = useState(["title", "authors", "cost", "duration"]);
    const [item, setitem] = useState(null)

    useEffect(() => {
        const contentType = document.querySelector('.searchform__contentype');

        const hideContentType = ({ target }) => {
            if (!target.closest('.searchform__container')) {
                contentType.classList.add('moveDown');
            }
        }

        window.addEventListener('click', hideContentType);

        return () => window.removeEventListener('click', hideContentType);
    }, []);


    const handleCloseSearch = (e) => {
        e.preventDefault();
        const selectedItemContainer = document.querySelector('.selected-item-container');
    
        selectedItemContainer.style.flexBasis = 0;
        selectedItemContainer.classList.add('hideWith');

        // clean input search
        cleanInput();
    }
    const cleanInput = () => {
        const input = document.querySelector('.input-search input[type="text"]');
        input.value='';
        // show all audiobooks
        setSelectedAudioBook(s=>({...s, isAdded:true}));
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        const query = e.target.value;

        const search = await searchAudioobooks(query,item);
        setAudioBooks(s=>({...s, audiobooksData:search}))
        // si está vacio retorneme todos los audio libros
        if(e.target.value === '') setSelectedAudioBook(s=>({...s, isAdded:true}))
    }

    const handleFocus = () => {
        const contentType = document.querySelector('.searchform__contentype');
        contentType.classList.remove('moveDown');
    }
    return (
        <div className="searchform__container">
            <form action="" onSubmit={handleSearch} className="searchform__form">
                <div className="outer-search">
                    <div className="searchform__search d-flex align-items-center p-2">
                        <div className="selected-item-container hideWith">
                            {
                                item && <ItemsTypes key={item.toString()} item={item} />
                            }
                        </div>
                        <div className="input-search">
                            <input type="text" placeholder="Search" className=" pl-1 w-100"
                                onFocus={handleFocus}
                                onChange={handleSearch}
                            />
                            <button className="btnclose" onClick={handleCloseSearch}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="outer-contentype">
                    <div className="searchform__contentype moveDown">
                        {
                            items.map((item, ind) => (
                                <ItemsTypes key={ind} item={item} setItem={setitem} />
                            ))
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}
