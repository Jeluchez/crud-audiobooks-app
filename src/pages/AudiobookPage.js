import { Modal } from 'antd';
import React, { useContext} from 'react'
import { AudioBooksTable } from '../components/AudioBooksTable'
// import { OwnTable } from '../components/OwnTable'
import { SearchForm } from '../components/SearchForm'

import { FormAdd } from '../components/FormAdd';

import { FormContext } from '../contex/FormContext';


export const AudiobookPage = () => {
    const { showModal, handleOk, handleCancel, isModalVisible, setIsModalVisible } = useContext(FormContext);

    return (
        <div className="audiobook__container">
            <SearchForm />
            <AudioBooksTable />
            {/* <OwnTable/> */}

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} 
            onCancel={handleCancel}
            >
                <FormAdd />
            </Modal>

        </div>
    )
}
