import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

export const FileUpload = () => {

    const fileRef = useRef();
    const [file, setFile] = useState(null)
    // show filereader
    const openFileUpload = () => fileRef.current.click();

    const handleChange = (e) => {
        setFile({
            oiriginFile: e.target.files[0],
            blobUrl: URL.createObjectURL(e.target.files[0])
        });
    }
    return (
        <div className="file_upload">
            <Button type="dashed" ghost id="fileSelect" onClick={openFileUpload} className=" w-50 d-flex justify-content-center align-items-center">
                <UploadOutlined /> Upload
                </Button>
            <div>
                <img src={file?.blobUrl} alt="preview images" className="form__img-file" />
            </div>

            <input ref={fileRef} type="file" accept="image/*" className="d-none" onChange={handleChange} />
        </div>
    )
}
