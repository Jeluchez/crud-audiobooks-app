import React, { useEffect, useRef, useState } from 'react'
import { calcBreakPoint } from '../helper/table';

// const data = ["hello", "bye", "good", "well", "see"];


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

    const [colsHide, setColsHide] = useState([]);
    const counterRef = useRef(1);
    // const [last, setlast] = useState(null);
    const tdDivs = useRef();
    const thDiv = useRef();
    const bookTable = useRef();

    const onceResize = useRef(true);

    useEffect(() => {

        tdDivs.current = document.querySelectorAll(`.row-table > td:nth-last-child(${counterRef.current}) > div`);
        thDiv.current = document.querySelector(`thead th:nth-last-child(${counterRef.current}) > div`);
        bookTable.current = document.querySelector('.book-table') 
        // console.log(tdDivs.current);


        const resizeTable = (e = null) => {

            onceResize.current = e ? false : true;


            const DivMaxwidth = [...tdDivs.current, thDiv.current].sort((a, b) => (b.offsetWidth - a.offsetWidth))[0];
            const percentBreakPoint = calcBreakPoint(DivMaxwidth);
            // console.log(percentBreakPoint);
            if (percentBreakPoint >= 90) {
                // break point to serve to again show the column
                const breakPoint = bookTable.current.offsetWidth + DivMaxwidth.parentNode.offsetWidth;
                hideCol(breakPoint);
            }
            if (percentBreakPoint < 90) {
                // check there are cols hide
                if (colsHide.length > 0) {
                    if (window.innerWidth > colsHide[0].breakPoint) {
                        showCol();
                    }
                }
            }

            function hideCol(br) {
                const tdsLastlist = document.querySelectorAll(`.row-table > td:nth-last-child(${counterRef.current})`);
                const thLast = document.querySelector(`thead th:nth-last-child(${counterRef.current})`);
                // hide last col
                thLast.classList.add('d-none');
                tdsLastlist.forEach(td => td.classList.add('d-none'));

                counterRef.current += 1;
                setColsHide([{ tdsLastlist, thLast, breakPoint: br }, ...colsHide]);
            }
            function showCol() {
                // add th
                colsHide[0].thLast.classList.remove('d-none');
                const tdsList = colsHide[0].tdsLastlist;
                tdsList.forEach(td => td.classList.remove('d-none'))

                counterRef.current -= 1;
                setColsHide(colsHide => colsHide.splice(1));
            }

        }
        // redimensionar al inicio
        onceResize.current && resizeTable();

        window.addEventListener('resize', resizeTable);

        return () => window.removeEventListener('resize', resizeTable);
    }, [colsHide]);


    return (
        <table className="book-table">
            <thead>
                <tr>
                    <th><div><input type="checkbox" /></div></th>
                    <th><div>First Name</div></th>
                    <th><div>Last Name adasdasdasdasdasdasd</div></th>
                    <th><div>Job Title</div></th>
                    <th><div>cyty</div></th>
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
                    <td>
                        <div>bucaran Sandwich Eater</div>
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
                        <div>Chief Sandwich</div>
                    </td>
                    <td>
                        <div>tngama as sdasda sd as d</div>
                    </td>
                </tr>
                {/* {
                    data.map((row, ind) => <TableRow key={ind} row={row} />)
                } */}
            </tbody>
        </table>
    )
}
