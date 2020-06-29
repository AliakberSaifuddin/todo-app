import React from 'react';
import Todo from './components/TodoComponent' 
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store} >
      <div className="container">
        <Todo />
      </div>
    </Provider>
  );
}

export default App;
