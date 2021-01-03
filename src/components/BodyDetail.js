import React, { useContext } from 'react'
import { AudiobookContext } from '../contex/AudiobookContext';
import { TapeDetail } from './TapeDetail'

export const BodyDetail = () => {

    const { abDetail, audioBooks } = useContext(AudiobookContext);

    const { audiobooksData } = audioBooks;
    return (
        <div className="detail__body container-fluid ">
            <div className="row">
                <div className="col-12 mt-2">
                    <h3>Information</h3>
                    <ul className="detail__body-list">
                        {
                            abDetail?.narrators.map((n, i) => (
                                <li key={i}><span>Narrator: </span>{n}</li>
                            ))

                        }
                        <li><span>Stree Date: </span>{abDetail?.dateToSort}</li>
                        <li></li>
                    </ul>
                </div>
                <div className="col-12 detail__more mt-2">
                    <h3>More AudioBooks</h3>
                    <div id="aubooks-tape" className="detail__tape">
                        <div className="tape-content">
                            {
                                audiobooksData?.slice(0,5).map(ab => (
                                    <TapeDetail key={ab.key} audiobook={ab} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
