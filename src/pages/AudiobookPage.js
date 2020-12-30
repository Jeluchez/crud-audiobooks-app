import { Modal } from 'antd';
import React, { useContext } from 'react'
import { AudioBooksTable } from '../components/AudioBooksTable'
// import { OwnTable } from '../components/OwnTable'
import { SearchForm } from '../components/SearchForm'

import { FormAdd } from '../components/FormAdd';

import { FormContext } from '../contex/FormContext';


export const AudiobookPage = () => {
    const { handleOk, handleCancel, isModalVisible, onReset } = useContext(FormContext);

    return (
        <div className="audiobook__container">
            <SearchForm />
            <AudioBooksTable />
            {/* <OwnTable/> */}

            <Modal title="Basic Modal"
               style={{ top: 20 }}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                afterClose={onReset}
            >
                <FormAdd />
            </Modal>

        </div>
    )
}


// {
//     "fields":
//     {
//         "title": {
//             "es-MX": "sdsds"
//         },
//         "authors": {
//             "es-MX": ["me"]
//         }, "duration": {
//             "es-MX": 1609153560425
//         }, "cost_per_play": {
//             "es-MX":
//             56
//         }, "cover": {
//             "es-MX": "https://res.cloudinary.com/jeluchez-devdor/image/upload/v1609217035/micoama5q4ymf4c1sjp4.jpg"
//         }, "street_date": {
//             "es-MX": "2020-12-28T23:47:31-05:00"
//         }, "is_original": {
//             "es-MX": false
//         },
//         "narrators": {
//             "es-MX": [
//                 "Mari Carmen Obregón"
//             ]
//         }
//     }
// }