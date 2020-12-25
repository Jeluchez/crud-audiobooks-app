import React from 'react'
import { AudioBooksTable } from '../components/AudioBooksTable'
import { OwnTable } from '../components/OwnTable'
import { SearchForm } from '../components/SearchForm'

export const AudiobookPage = () => {
    return (
        <div className="audiobook__container">
           <SearchForm/>
           {/* <AudioBooksTable/> */}
           <OwnTable/>
        </div>
    )
}
