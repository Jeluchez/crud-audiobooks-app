import React, { useContext } from 'react';
import { PlusSquareOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, TimePicker, Form, InputNumber } from 'antd';


import { AudiobookContext } from '../contex/AudiobookContext';
import { toast } from 'react-toastify';
import { FileUpload } from './FileUpload';


export const FormAdd = () => {

    const { setIsAdded, selectedAudioBook, setSelectedAudioBook } = useContext(AudiobookContext);

    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (


        <form className="form-add-update">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title:</label>
                <input type="text" className="form-control" name="title" placeholder="Title" />
            </div>
            {/* Author list */}
            <div className="form-group authors">
                <label htmlFor="exampleInputPassword1">Authors:</label>
                <div className="container-add-author">
                    <input type="text" className="form-control" placeholder="Author" />
                </div>
            </div>
            <div className="form-group plus-authors">
                <label htmlFor="plus-authors"></label>
                <Button type="dashed" ghost className="w-100 d-flex justify-content-center align-items-center">
                    <PlusSquareOutlined /> <span>Author</span>
                </Button>
            </div>
            {/* narrator list */}
            <div className="form-group authors">
                <label htmlFor="narrator">Narrators:</label>
                <div className="container-add-author">
                    <input type="text" className="form-control" placeholder="Author" />
                </div>
            </div>
            <div className="form-group plus-narrators">
                <label htmlFor="plus-narrator"></label>
                <Button type="dashed" ghost className="w-100 d-flex justify-content-center align-items-center">
                    <PlusSquareOutlined /> <span>Narrator</span>
                </Button>
            </div>
            {/* DURATION  and COST PER PLAY*/}
            <div className="duration_cost mb-2">
                <div className="form__duration">
                    <label htmlFor="duration">Duration:</label>
                    <TimePicker name="duration" className="form-control" />
                </div>
                <div className="form__cost">
                    <label htmlFor="cost">Cost:</label>
                    <input type="text" min="1" name="cost_per_play" className="form-control" />
                </div>

            </div>
            <div className="form-group form__cover-upload">
                <label htmlFor="cover">Cover:</label>
                <div className="d-grid">
                    <FileUpload />
                    <button type="submit" className="btn btn-primary">create</button>
                </div>

            </div>
        </form>

    )
}
