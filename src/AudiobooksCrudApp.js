import React from 'react'
import { AudioBookProvider } from './contex/AudiobookContext';
import { FormProvider } from './contex/FormContext';
import { AudiobookPage } from './pages/AudiobookPage';
import { AppRouter } from './router/AppRouter';

const AudiobooksCrudApp = () => {
  return (
    <AudioBookProvider>
      <FormProvider>
        <AppRouter />
      </FormProvider>
    </AudioBookProvider>

  )
}


export default AudiobooksCrudApp;
