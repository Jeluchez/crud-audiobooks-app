import React from 'react'
import { AudioBooksTable } from '../components/AudioBooksTable'
import { EditRow } from '../components/Buttons'
import { OwnTable } from '../components/OwnTable'
import { SearchForm } from '../components/SearchForm'

export const AudiobookPage = () => {
    return (
        <div className="audiobook__container">
           <SearchForm/>
           <AudioBooksTable/>
           {/* <OwnTable/> */}
           <EditRow/>
        </div>
    )
}
