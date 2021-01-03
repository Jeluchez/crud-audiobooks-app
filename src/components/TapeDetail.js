import React, {useEffect } from 'react'

import moment from 'moment';
export const TapeDetail = ({ audiobook }) => {

    let year = (audiobook?.dateToSort).split('-');
    year = year[year.length - 1]

    useEffect(() => {
        const tape = document.getElementById('aubooks-tape');
        tape.addEventListener('slide.bs.tape', carrousel);

        function carrousel() {

        }
        return () => tape.removeEventListener('slide.bs.tape', carrousel);
    }, []);

    return (
        <div className="tape-item">
            <div className="detail__audiobook-card">
                <img src={audiobook?.cover} alt="..." />
                <p className="tape__ab-title">{audiobook?.title}</p>
                <p><span>{year} </span><span> {audiobook?.duration}</span></p>
            </div>
        </div>
    )
}
