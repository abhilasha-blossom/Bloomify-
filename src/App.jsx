import { useHabits } from './hooks/useHabits';
import AddHabitForm from './components/AddHabitForm';
import GardenGrid from './components/GardenGrid';
import './App.css';

function App() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Bloomify 🌸</h1>
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
