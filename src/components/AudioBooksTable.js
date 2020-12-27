import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import { FormContext } from '../contex/FormContext';
import { fetchData } from '../helper/fetch';
import { mapData } from '../helper/iterateData';

const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title - b.title, },
    // { title: 'Conten Type', dataIndex: 'content-type', key: 'contentType', responsive: ['lg'] },
    { title: 'Updated', dataIndex: 'street_date', key: 'street_date', responsive: ['lg'], sorter: (a, b) => moment(a.dateToSort,'DD-MM-YYYY, h:mm:ss') - moment(b.dateToSort,'DD-MM-YYYY') },
    { title: 'Authors', dataIndex: 'authors', key: 'authors', responsive: ['sm'] },
    { title: 'Cost per play', dataIndex: 'cost_per_play', key: 'cost_per_play', responsive: ['md'], sorter: (a, b) => a.cost_per_play - b.cost_per_play },
    { title: 'Duration (h:m)', dataIndex: 'duration', key: 'duration', responsive: ['md'], sorter: (a, b) => moment(a.duration,'HH:mm:ss') - moment(b.duration,'HH:mm:ss') },
    { title: 'Cover', dataIndex: 'cover', key: 'cover', responsive: ['lg'], render: cover => <div className="outer-image"><img alt={cover} src={cover} className="imageTable" /></div>, },
];
export const AudioBooksTable = ({ showConfirm }) => {


    const { showModal, handleOk, handleCancel, isModalVisible, setIsModalVisible } = useContext(FormContext);

    const [stateSelect, setStateSelect] = useState({
        selectedRowKeys: []
    });
    const { selectedRowKeys } = stateSelect;

    const [audioBooks, setAudioBooks] = useState(null);

    useEffect(() => {
        fetchData().then(({ items }) => {
            const ab = mapData(items);
            console.log(ab);
            setAudioBooks(ab);
        })
    }, [])
    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setStateSelect({ selectedRowKeys });
        getRow(selectedRowKeys);
    }

    const getRow = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        const row = audioBooks.find((row) => row.key === selectedRowKeys[0]);
        console.log(row);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setStateSelect({ selectedRowKeys: newSelectedRowKeys });
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setStateSelect({ selectedRowKeys: newSelectedRowKeys });
                },
            },
        ],
    };

    /* -------------------------------------------------------------------------- */
    /*                                   button                                   */
    /* -------------------------------------------------------------------------- */

    return (
        <div className="m-table-container">
            <div className="table-info d-flex align-items-center">
                <div className="bnts-operations d-flex justify-content-center align-items-center">
                    <EditOutlined className="btn-edit-book" onClick={showModal} />

                    <DeleteOutlined className="btn-delete-book" onClick={showConfirm} />
                </div>

                <span className="table-row-selected">
                    1 row selected
                </span>
                <div className="table-usage-by-entry">
                    <span>showing</span> 1-5 of 1000
                </div>

                <div className="box-btn-add" onClick={showModal}>
                    <PlusOutlined className="btn-add-book" />
                </div>

            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={audioBooks}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>Hello</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                scroll={{ y:400 }}
                rowClassName={'table__row'}
            />;

        </div>
    )
}
