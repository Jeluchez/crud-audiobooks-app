import React, { useEffect, useRef, useState } from 'react';

// component of item from content type
const TypesItem = ({ item, setItem = null,}) => {

    const type = useRef();
    const container = useRef();
    useEffect(() => {
        container.current = document.querySelector('.selected-item-container');
    }, []);

    const handleClick = () => {
        setItem && setItem(item);
        container.current.style.flexBasis= type.current.clientWidth + 5 + 'px' ;
        container.current.classList.remove('hideWith');
    }
    return (

        <div ref={type} className={"typeitem"} onClick={handleClick}>
            <span>{item}</span>
        </div>

    )
}
//searchform
export const SearchForm = () => {

    const [items, setItems] = useState(["hello", "bye", "good", "well", "see"]);
    const [item, setitem] = useState(null)

    const handleCloseSearch = (e) => {
        e.preventDefault();
        const selectedItemContainer = document.querySelector('.selected-item-container');
        selectedItemContainer.style.flexBasis= 0;
        selectedItemContainer.classList.add('hideWith');

    }

    const handleSearch = (e) => {
        e.preventDefault();
    }
    return (
        <div className="searchform__container">
            <form action="" onSubmit={handleSearch}>
                <div className="searchform__search d-flex align-items-center p-2">
                    <div className="selected-item-container hideWith">
                        {
                            item && <TypesItem key={item.toString()} item={item}/>
                        }
                    </div>
                    <div className="input-search">
                        <input type="text" placeholder="Search" className=" pl-1 w-100" />
                        <button className="btnclose" onClick={handleCloseSearch}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <div className="searchform__contentype d">
                    {
                        items.map((item, ind) => (
                            <TypesItem key={ind} item={item} setItem={setitem} />
                        ))
                    }
                </div>
            </form>
        </div>
    )
}
