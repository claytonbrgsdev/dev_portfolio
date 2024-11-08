import React from 'react';
import './App.css'
import MainLayout from './components/layout/mainLayout/MainLayout';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <MainLayout/>
    </div>
  );
};

export default App;