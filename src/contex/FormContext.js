import { createContext, useState } from 'react';
import { Form } from 'antd';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <FormContext.Provider value={{
            showModal,
            handleOk,
            handleCancel,
            isModalVisible,
            setIsModalVisible,
            form,
        }}>
            { children}
        </FormContext.Provider>
    )

}