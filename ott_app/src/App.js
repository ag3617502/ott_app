import React from 'react';
import HomePage from './pages/HomePage';
import './styles/styles.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

const App = () => {
  return (
    <Provider store={store}>
    <div className="App">
       <HomePage />
       </div>
    </Provider>
  );
};

export default App;
