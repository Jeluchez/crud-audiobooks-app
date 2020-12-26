import React from 'react'
import { Provider } from 'react-redux';
import { FormProvider } from './contex/FormContext';
import { AudiobookPage } from './pages/AudiobookPage';
import { store } from './store/store';

const AudiobooksCrudApp = () => {
  return (
    <Provider store={store}>
      <FormProvider>
        <AudiobookPage />
      </FormProvider>
    </Provider>

  )
}


export default AudiobooksCrudApp;
