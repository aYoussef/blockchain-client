import React, { useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import { useAppDispatch } from './state/hooks';
import { getTransactions } from './state/slices/transactionsSlice';

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
