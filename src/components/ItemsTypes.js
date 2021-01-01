import React, { useEffect, useRef } from 'react';

export const ItemsTypes = ({ item, setItem = null, }) => {

    const type = useRef();
    const container = useRef();
    const inputSearch = useRef();
    useEffect(() => {
        container.current = document.querySelector('.selected-item-container');
        inputSearch.current = document.querySelector('.input-search input[type="text"]');
    }, []);

    const handleClick = () => {
        setItem && setItem(item);
        container.current.style.flexBasis = type.current.clientWidth + 6 + 'px';
        container.current.classList.remove('hideWith');
        inputSearch.current.focus();
    }
    return (

        <div ref={type} className={"typeitem"} onClick={handleClick}>
            <span>{item}</span>
        </div>

    )
}