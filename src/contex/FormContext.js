import { createContext, useState } from 'react';


export const FormContext = createContext();

export const FormProvider = ({ children }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    

    return(
        <FormContext.Provider value={{
            showModal,
            handleOk,
            handleCancel,
            isModalVisible,
            setIsModalVisible,
        }}>
            { children }
        </FormContext.Provider>
    )
    
}