import React, { useEffect, useRef, useState } from 'react'

const data = ["hello", "bye", "good", "well", "see"];


const TableRow = ({ row }) => {

    // const tRow = useRef();

    // useEffect(() => {
    //     tRow.current = document.querySelector('.row-table');
    //     const row = tRow.current;
    //     console.log(row.cells[1].offsetWidth);
    // }, [])


    return (
        <tr /*ref={tRow}*/ className="row-table">
            <td><input type="checkbox" /></td>
            <td>
                <div>{row}</div>
            </td>
            <td>
                <div>Matman</div>
            </td>
            <td>
                <div>Chief Sandwich Eater</div>
            </td>
        </tr>
    )
}
export const OwnTable = () => {

    const [width, setWidthLast] = useState(0);

    const divs = useRef();

    const calcWidthhMax = (lastTd) => {
        const cellWith = lastTd.parentNode.offsetWidth;
        const cellMinWith = lastTd.offsetWidth;
        // se añadirá un porcentaje a lo mínimo ya que no llega a ser igual, percent = 0.5%
        const percent = ((cellWith - cellMinWith)/cellMinWith) * 100;
        const rounded  = Math.round((percent + Number.EPSILON) * 100) / 100;
       
        if (rounded <= 3 ) {
            console.log('hide col');
        }
    }

    useEffect(() => {
        divs.current = document.querySelectorAll('.book-table th:last-child ');
        divs.current = document.querySelectorAll('.row-table > td:last-child > div');

        const width = [...divs.current].sort((a, b) => (b.offsetWidth - a.offsetWidth))[0];

        window.addEventListener('resize', function(){calcWidthhMax(width)});

        return () =>  window.removeEventListener('resize',function(){calcWidthhMax(width)});
        // width
        // phrases.sort((a, b) => (new Date(b.date) - new Date(a.date)));
        // tds.current.forEach((value, index, array) => {})
        // const row = tRow.current;
        // console.log(row.cells[1].querySelector('div').offsetWidth);
        // console.log(row.cells[2].offsetWidth);
        // console.log(row.cells[3].offsetWidth);


    }, [])

  
    return (
        <table className="book-table">
            <thead>
                <tr>
                    <th><div><input type="checkbox" /></div></th>
                    <th><div>First Name</div></th>
                    <th><div>Last Name</div></th>
                    <th><div>Job Title</div></th>
                </tr>
            </thead>
            <tbody>
                <tr /*ref={tRow}*/ className="row-table">
                    <td><input type="checkbox" /></td>
                    <td>
                        <div>Rosa</div>
                    </td>
                    <td>
                        <div>Matman</div>
                    </td>
                    <td>
                        <div>Chief Sandwich Eater</div>
                    </td>
                </tr>
                <tr /*ref={tRow}*/ className="row-table">
                    <td><input type="checkbox" /></td>
                    <td>
                        <div>Daniel</div>
                    </td>
                    <td>
                        <div>Matman</div>
                    </td>
                    <td>
                        <div>Chief Sandwich Eaterasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</div>
                    </td>
                </tr>
                {/* {
                    data.map((row, ind) => <TableRow key={ind} row={row} />)
                } */}
            </tbody>
        </table>
    )
}
