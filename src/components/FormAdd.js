import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Form, Select, Space, Row, Col, TimePicker } from 'antd';
import React from 'react';

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

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};





export const FormAdd = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (


        <Form {...formItemLayout} name="form-add-update" onFinish={onFinish} validateMessages={validateMessages}
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
            <Row gutter={{ xs: 8, sm: 16}}>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Form.Item name={['audiobook', 'duration']} label="duration" {...formItemLayouDurationCost}
                        labelAlign="right"
                        rules={[{type: 'object', required: true, message: "Please input audiobook duration" }]}>
                         <TimePicker style={{width: '100%'}} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={['audiobook', 'cost_per_play']} label="Cost per play" labelAlign="left"
                    labelCol={{xs:{span:12}}} wrapperCol={{span:24}}
                        rules={[{ type: 'number', min: 1, required: true, message: "Please input audiobook cost" }]}
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item wrapperCol={{ ...formItemLayout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form.Item>
        </Form>

    )
}
