import React from 'react'
import { AudioBookProvider } from './contex/AudiobookContext';
import { FormProvider } from './contex/FormContext';
import { AudiobookPage } from './pages/AudiobookPage';

const AudiobooksCrudApp = () => {
  return (
      <AudioBookProvider>
        <FormProvider>
          <AudiobookPage />
        </FormProvider>
      </AudioBookProvider>

  )
}


export default AudiobooksCrudApp;
