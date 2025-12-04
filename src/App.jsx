import React, { useState } from 'react';
import Sidebar from './components/Navigation/Sidebar';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import ChallengesPage from './pages/ChallengesPage';
import './App.css';

function App() {
  const [activeMode, setActiveMode] = useState('home');

  const renderPage = () => {
    switch (activeMode) {
      case 'home':
        return <HomePage onNavigate={setActiveMode} />;
      case 'editor':
        return <EditorPage />;
      case 'challenges':
        return <ChallengesPage />;
      default:
        return <HomePage onNavigate={setActiveMode} />;
    }
  };

  return (
    <div className="app-container halloween-bg">
      <Sidebar activeMode={activeMode} onModeChange={setActiveMode} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
