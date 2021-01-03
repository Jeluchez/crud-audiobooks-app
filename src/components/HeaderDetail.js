import { ArrowLeftOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { AudiobookContext } from '../contex/AudiobookContext';

export const HeaderDetail = () => {

    const { abDetail } = useContext(AudiobookContext);

    const authorLen =  abDetail?.authors.length;

    const history = useHistory();
    const detaielRef = useRef()

    useEffect(() => {
        detaielRef.current = document.querySelector('.detail__container');
    }, [])

    const handleZoomOut = () => {
        console.log('click');
        detaielRef.current.classList.add('animate__zoomOut');
        detaielRef.current.classList.remove('animate__zoomInt');
        setTimeout(() => {
            history.replace('/');
        }, 0.00001);
    }

    return (
        <div className="detail__header container-fluid">
            <div className="row pt-3">
                <button className="btn__return" onClick={handleZoomOut}>
                    <ArrowLeftOutlined />
                </button>
                <div className="col-12 col-md-3">
                    <div className="detail__container-cover">
                        <img src={abDetail?.cover} alt="algo" />
                    </div>
                </div>
                <div className="col-12 col-md-9 detail__cover-info mt-2">
                    <div className="detail__cover-info-inner">
                        <h1>{abDetail?.title}</h1>
                        <p>{abDetail?.street_date}</p>
                        <p className="detail__other-info">
                        {
                            abDetail?.authors.map((a,i)=>{

                                if(i === (authorLen-1)){
                                    return <span key={i}>{a}</span>
                                }
                                if( authorLen === 1){
                                    return <span key={i}>{a}</span>
                                }

                                return <span key={i}>{a} & </span>
                            })
                        }
                         - Duration <span>{abDetail?.duration} </span>-Cost <span>{abDetail?.cost_per_play}</span></p>
                    </div>  

                </div>
            </div>

            <hr className="detail__divider-line" />


        </div>
    )
}
