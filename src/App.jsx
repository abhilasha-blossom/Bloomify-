import { useHabits } from './hooks/useHabits';
import AddHabitForm from './components/AddHabitForm';
import GardenGrid from './components/GardenGrid';
import ThemeSwitcher from './components/ThemeSwitcher';
import BackgroundEffects from './components/BackgroundEffects';
import './App.css';

function App() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();

  return (
    <div className="app-container">
      <BackgroundEffects />
      <header className="app-header">
        <div className="header-top">
          <h1><span className="title-text">Bloomify</span> 🌸</h1>
          <ThemeSwitcher />
        </div>
        <p>Grow your habits, grow your garden.</p>
      </header>

      <main className="app-main">
        <AddHabitForm onAdd={addHabit} />
        <GardenGrid
          habits={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
        />
      </main>

      <footer className="app-footer">
        <p>Keep going! Every day counts.</p>
      </footer>
    </div>
  );
}

export default App;
