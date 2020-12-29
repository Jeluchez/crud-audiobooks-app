import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Form, message, Row, Col, TimePicker, Upload } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AudiobookContext} from '../contex/AudiobookContext';
import { FormContext } from '../contex/FormContext';
import { fetchData } from '../helper/fetch';
import { revertMapData } from '../helper/iterateData';
import { fileUpload } from '../helper/upload';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20, offset: 4 },
    },
};
const formItemLayouDurationCost = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const normFile = e => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

// upload file



export const FormAdd = () => {

    const { setIsAdded, isAdded } = useContext(AudiobookContext);
    const {handleCancel} = useContext(FormContext);

    const [fileList, updateFileList] = useState([]);

    const signal = useRef(0);
    const coverUrlRef = useRef('');
    const [loadindImage, setLoadindImage] = useState(true)
    // console.log(signal.current);
    useEffect(() => {
        // save the image in cloudinar
        const cover = fileList[0]?.originFileObj;
        if (cover) {
            // este 3 lo coloqué porque el componente upload se renderiza 3 veces
            if (signal.current === 3) {
                const coverUrl = fileUpload(cover);
                coverUrl.then((url) => {
                    coverUrlRef.current = url;
                    signal.current = 0;
                    setLoadindImage(false);
                })
            }
        }

    }, [signal, fileList])

    const onFinish = values => {
        const { audiobook } = values;
        // add url cover
        audiobook.cover = coverUrlRef.current;

        const newAudiobook = revertMapData(audiobook);
        const fields = { "fields": { ...newAudiobook } };
        fetchData('POST', fields).then((res => {
            // update table;

            if (res) {
                handleCancel();
                setIsAdded(true);
            }

        }))
    };

    const props = {
        fileList,
        beforeUpload: file => {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                return message.error(`Must upload jpg or png images`);
            }
            return (file.type === 'image/png' || file.type === 'image/jpeg');
        },
        onChange: info => {
            signal.current += 1;
            info.fileList.length > 1
                ? updateFileList(info.fileList.splice(0, 1))
                : updateFileList(info.fileList.filter(file => !!file.status))
        },
    };
    return (


        <Form {...formItemLayout} name="form-add-update" onFinish={onFinish}
            className="form-add"

        >
            <Form.Item name={['audiobook', 'title']} label="Title"
                rules={[{ required: true, message: "Please input audiobook title" }]}
            >
                <Input />
            </Form.Item>
            {/* Add authors */}
            <Form.List
                name={['audiobook', 'authors']}
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 Author'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Authors' : ''}
                                required={true}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: "Please input author's name",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input placeholder="Author name" style={{ display: 'flex' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item wrapperCol={{ xs: { span: 24 }, sm: { span: 20, offset: 4 } }} className="outer-btn-add-author">
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '100%' }}
                                icon={<PlusOutlined />}
                            >
                                Add Author
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            {/* end authors */}
            <Row gutter={{ xs: 16 }}>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item name={['audiobook', 'duration']} label="duration" {...formItemLayouDurationCost}
                        labelAlign="right"
                        rules={[{ type: 'object', required: true, message: "Please input audiobook duration" }]}>
                        <TimePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={['audiobook', 'cost_per_play']} label="Cost per play" labelAlign="left"
                        labelCol={{ xs: { span: 12 } }} wrapperCol={{ span: 24 }}
                        rules={[{ type: 'number', min: 1, required: true, message: "Please input audiobook cost" }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name={['audiobook', 'cover']}
                label="Cover"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="upload the audiobook cover"
                style={{ display: 'flex', flexDirection: 'row' }}
                rules={[{ required: true, message: "Please load the audiobook cover" }]}
            >
                {/* upload */}
                <Upload {...props} name="logo"
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ ...formItemLayoutWithOutLabel.wrapperCol }}>
                <Button type="primary" htmlType="submit" style={{ width: '140px' }} disabled={loadindImage}>
                    Send
                </Button>
            </Form.Item>
        </Form>

    )
}
