import { useState } from 'react';
import { useHabits } from './hooks/useHabits';
import AddHabitForm from './components/AddHabitForm';
import GardenGrid from './components/GardenGrid';
import ThemeSwitcher from './components/ThemeSwitcher';
import BackgroundEffects from './components/BackgroundEffects';
import BackgroundMusic from './components/BackgroundMusic';
import Greenhouse from './components/Greenhouse';
import './App.css';

function App() {
  const { habits, archivedHabits, addHabit, toggleHabit, deleteHabit, archiveHabit } = useHabits();
  const [showGreenhouse, setShowGreenhouse] = useState(false);

  return (
    <div className="app-container">
      <BackgroundEffects />
      <BackgroundMusic />

      {showGreenhouse && (
        <Greenhouse
          archivedHabits={archivedHabits}
          onClose={() => setShowGreenhouse(false)}
        />
      )}

      <header className="app-header">
        <div className="header-top">
          <h1><span className="title-text">Bloomify</span> 🌸</h1>
          <ThemeSwitcher />
        </div>
        <p>Grow your habits, grow your garden.</p>
        <button
          className="greenhouse-btn"
          onClick={() => setShowGreenhouse(true)}
        >
          🏆 View Greenhouse
        </button>
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
