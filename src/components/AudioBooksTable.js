import React, { useContext, useEffect, useState } from 'react'
import { Table, Image } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import confirm from 'antd/lib/modal/confirm';

import { FormContext } from '../contex/FormContext';
import { fetchData } from '../helper/fetch';
import { mapData } from '../helper/iterateData';
import { AudiobookContext } from '../contex/AudiobookContext';

const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title - b.title, },
    // { title: 'Conten Type', dataIndex: 'content-type', key: 'contentType', responsive: ['lg'] },
    { title: 'Updated', dataIndex: 'street_date', key: 'street_date', responsive: ['lg'], sorter: (a, b) => moment(a.dateToSort, 'DD-MM-YYYY, h:mm:ss') - moment(b.dateToSort, 'DD-MM-YYYY') },
    {
        title: 'Authors', dataIndex: 'authors', key: 'authors', responsive: ['sm'],
        render: authors => authors.map(author => (<div className="outer-author">{author}</div>))
    },
    { title: 'Cost per play', dataIndex: 'cost_per_play', key: 'cost_per_play', responsive: ['md'], sorter: (a, b) => a.cost_per_play - b.cost_per_play },
    { title: 'Duration (h:m)', dataIndex: 'duration', key: 'duration', responsive: ['md'], sorter: (a, b) => moment(a.duration, 'HH:mm:ss') - moment(b.duration, 'HH:mm:ss') },
    {
        title: 'Cover', dataIndex: 'cover', key: 'cover', responsive: ['lg'], render: cover => <div className="outer-image">
            <Image
                width={80}
                src={cover}
                className="imageTable"
                alt={cover}
            /></div>,
    },
];
export const AudioBooksTable = () => {


    const { showModal, form, onReset } = useContext(FormContext);
    const { audioBooks, setAudioBooks, setIsAdded, setSelectedAudioBook, selectedAudioBook } = useContext(AudiobookContext);

    const [stateSelect, setStateSelect] = useState({
        selectedRowKeys: []
    });
    const [loading, setLoading] = useState(true);

    const { selectedRowKeys } = stateSelect;
    const { isAdded, selected } = selectedAudioBook;
    // console.log(isAdded);


    useEffect(() => {
        fetchData().then(({ items }) => {
            const ab = mapData(items);
            setLoading(false);
            setAudioBooks(ab);
            console.log(ab)
            // is for indicate elementent add; when isAdded, indica that audiobook was addedd
            setSelectedAudioBook(s => ({ ...s, isAdded: false }));
        })
    }, [setAudioBooks, setSelectedAudioBook, isAdded, form]);


    useEffect(() => {
        setStateSelect({ selectedRowKeys: [] })
    }, [setIsAdded, isAdded])

    const onSelectChange = selectedRowKeys => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setStateSelect({ selectedRowKeys });
        setSelectedAudioBook(state => ({ ...state, selected: getRow(selectedRowKeys) }));
    }

    const getRow = (selectedRowKeys) => {
        // console.log(selectedRowKeys)
        const audibookRow = audioBooks.find((row) => row.key === selectedRowKeys[0]);
        return audibookRow;
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

    /* -------------------------------------------------------------------------- */
    /*                                    CRUD                                    */
    /* -------------------------------------------------------------------------- */

    // DELETE
    function showConfirm() {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                const id = selectedRowKeys[0];
                fetchData('DELETE', { id }).then((res) => {
                    if (res.ok) {
                        setStateSelect({
                            selectedRowKeys: []
                        })
                        onReset();
                        setSelectedAudioBook({ isAdded: true, selected: null });
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div className="m-table-container">
            <div className="table-info d-flex align-items-center">


                <span className="table-row-selected">
                    {selectedRowKeys.length} row selected
                </span>
                <div className="table-usage-by-entry">
                    <span>showing</span> 1-5 of 1000
                </div>

                {/* si no hay elemento seleccionado muestre el botton agregar */}
                {

                    selectedRowKeys.length === 0
                        ? (
                            <div className="box-btn-add" onClick={showModal}>
                                <PlusOutlined className="btn-add-book" />
                            </div>
                        )
                        : (
                            <div className="bnts-operations d-flex justify-content-center align-items-center" style={{ marginLeft: 'auto' }}>
                                {
                                    (selectedRowKeys.length === 1)
                                    && <EditOutlined className="btn-edit-book" onClick={showModal} />
                                }
                                {
                                    (selectedRowKeys.length > 0)
                                    && <DeleteOutlined className="btn-delete-book" onClick={showConfirm} />
                                }

                            </div>
                        )
                }

            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={audioBooks}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>Hello</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
                scroll={{ y: 400 }}
                rowClassName={'table__row'}
                loading={loading}
            />;

        </div>
    )
}
