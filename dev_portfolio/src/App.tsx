import React, {useEffect} from 'react';
import './styles/App.css'
import MainLayout from './components/layout/mainLayout/MainLayout';
import { preloadModel } from './three';

const App: React.FC = () => {
  useEffect(() => {
    // Preload models on app startup
    preloadModel('/models/Crystal-jelly/Crystal-jelly.gltf');
    // Preload other models as needed
  }, []);
  return (
    <div className='app-container'>
      <MainLayout/>
    </div>
  );
};

export default App;