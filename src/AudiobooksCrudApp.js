import React from 'react'
import { Provider } from 'react-redux';
import { AudioBookProvider } from './contex/AudiobookContext';
import { FormProvider } from './contex/FormContext';
import { AudiobookPage } from './pages/AudiobookPage';
import { store } from './store/store';

const AudiobooksCrudApp = () => {
  return (
    <Provider store={store}>
      <AudioBookProvider>
        <FormProvider>
          <AudiobookPage />
        </FormProvider>
      </AudioBookProvider>
    </Provider>

  )
}


export default AudiobooksCrudApp;
