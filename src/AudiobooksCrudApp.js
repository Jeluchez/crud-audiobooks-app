import React from 'react'
import { Provider } from 'react-redux';
import { AudiobookPage } from './pages/AudiobookPage';
import { store } from './store/store';

const AudiobooksCrudApp = () => {
  return (
    <Provider store={store}>
      <AudiobookPage/>
    </Provider>
   
  )
}


export default AudiobooksCrudApp;
