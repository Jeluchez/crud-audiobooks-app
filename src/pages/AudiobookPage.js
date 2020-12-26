import { ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useContext, useState } from 'react'
import { AudioBooksTable } from '../components/AudioBooksTable'
// import { OwnTable } from '../components/OwnTable'
import { SearchForm } from '../components/SearchForm'

import { FormAdd } from '../components/FormAdd';
import confirm from 'antd/lib/modal/confirm';
import { FormContext } from '../contex/FormContext';


export const AudiobookPage = () => {
    const { showModal, handleOk, handleCancel, isModalVisible, setIsModalVisible } = useContext(FormContext);

    function showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    return (
        <div className="audiobook__container">
            <SearchForm />
            <AudioBooksTable showConfirm={showConfirm} />
            {/* <OwnTable/> */}

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <FormAdd />
            </Modal>

        </div>
    )
}
