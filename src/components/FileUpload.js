import { UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useRef } from 'react'

export const FileUpload = () => {

    const fileRef = useRef();
    const fileUpload = useRef();

    // show filereader
    const openFileUpload = () => fileRef.current.click();
    const reader = new FileReader();

    const handleFile = () => {
        const img = document.createElement("img");
        img.src = reader.result;
    }
    // if (file) {
    //     reader.readAsDataURL(file);
    // }
    // convert image file to base64 string

    return (
        <div className="file_upload" ref={fileUpload}>
            <Button type="dashed" ghost id="fileSelect" onClick={openFileUpload} className=" w-50 d-flex justify-content-center align-items-center">
                <UploadOutlined /> Upload
                </Button>
            {/* <img src="" alt="" srcset=""> */}
                <input ref={fileRef} type="file" accept="image/*" className="d-none" onChange={handleFile}/>
        </div>
    )
}
