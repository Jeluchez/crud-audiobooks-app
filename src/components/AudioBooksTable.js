import React, { useContext, useState } from 'react'
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FormContext } from '../contex/FormContext';

const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.age - b.age, },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address', responsive: ['sm'], },
    // {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: () => <a href="/#">Delete</a>,
    // },
];

const data = [
    {
        key: 1,
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
        key: 2,
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
        key: 3,
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
    },
    {
        key: 4,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
];


export const AudioBooksTable = ({ showConfirm }) => {


    const { showModal, handleOk, handleCancel, isModalVisible, setIsModalVisible } = useContext(FormContext);
    
    const [stateSelect, setStateSelect] = useState({
        selectedRowKeys: []
    });

    const { selectedRowKeys } = stateSelect;

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setStateSelect({ selectedRowKeys });
        getRow(selectedRowKeys);
    }

    const getRow = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        const row = data.find((row) => row.key === selectedRowKeys[0]);
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
            <div className="table-info d-flex align-items-center justify-content-between">
                <div className="bnts-operations d-flex justify-content-center align-items-center">
                    <EditOutlined className="btn-edit-book" onClick={showModal} />

                    <DeleteOutlined className="btn-delete-book" onClick={showConfirm} />
                </div>

                <span className="table-row-selected">
                    1 row selected
                </span>
                <span className="table-usage-by-entry">
                    showing 1-5 of 1000
                </span>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                rowClassName={'table__row'}
            />;

        </div>
    )
}
