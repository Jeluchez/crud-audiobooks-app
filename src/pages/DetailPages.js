import React from 'react'
import { BodyDetail } from '../components/BodyDetail'
import { HeaderDetail } from '../components/HeaderDetail'

export const DetailPages = () => {
    return (
        <div className="detail__container animate__animated  animate__zoomIn">
            <HeaderDetail />
            <BodyDetail />
        </div>
    )
}
