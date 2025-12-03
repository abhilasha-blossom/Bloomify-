import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import AddHabitForm from './components/AddHabitForm';
import GardenGrid from './components/GardenGrid';
import ThemeSwitcher from './components/ThemeSwitcher';
import BackgroundEffects from './components/BackgroundEffects';
import BackgroundMusic from './components/BackgroundMusic';
import Greenhouse from './components/Greenhouse';
import GrowthLab from './components/GrowthLab';
import './App.css';

function App() {
  const { habits, archivedHabits, addHabit, toggleHabit, deleteHabit, archiveHabit } = useHabits();
  const [showGreenhouse, setShowGreenhouse] = useState(false);
  const [showGrowthLab, setShowGrowthLab] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20; // Move +/- 10px
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div className="app-container" onMouseMove={handleMouseMove}>
      <div style={{ transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`, transition: 'transform 0.1s ease-out', position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <BackgroundEffects />
      </div>
      <BackgroundMusic />

      {showGreenhouse && (
        <Greenhouse
          archivedHabits={archivedHabits}
          onClose={() => setShowGreenhouse(false)}
        />
      )}

      {showGrowthLab && (
        <GrowthLab onClose={() => setShowGrowthLab(false)} />
      )}

      <header className="app-header">
        <div className="header-top">
          <h1><span className="title-text">Bloomify</span> 🌸</h1>
          <ThemeSwitcher />
        </div>
        <p>Grow your habits, grow your garden.</p>
        <div className="header-actions">
          <button
            className="greenhouse-btn"
            onClick={() => setShowGreenhouse(true)}
          >
            🏆 Greenhouse
          </button>
          <button
            className="lab-btn"
            onClick={() => setShowGrowthLab(true)}
          >
            🧪 Growth Lab
          </button>
        </div>
      </header>

      <main className="app-main">
        <AddHabitForm onAdd={addHabit} />
        <GardenGrid
          habits={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          onArchive={archiveHabit}
        />
      </main>

      <footer className="app-footer">
        <p>Keep going! Every day counts.</p>
      </footer>
    </div>
  );
}

export default App;
