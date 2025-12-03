import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bloomify-habits';

export const useHabits = () => {
    const [habits, setHabits] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits]);

    // Check for missed days on load
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];

        setHabits(prevHabits => prevHabits.map(habit => {
            if (!habit.lastCompletedDate) return habit;

            const lastDate = new Date(habit.lastCompletedDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // If more than 1 day has passed (meaning they missed yesterday), reset streak
            if (diffDays > 1) {
                return { ...habit, streak: 0 };
            }
            return habit;
        }));
    }, []);

    const addHabit = (name, icon, plantType = 'classic') => {
        const newHabit = {
            id: crypto.randomUUID(),
            name,
            icon: icon || '🌱',
            plantType,
            streak: 0,
            lastCompletedDate: null,
            history: []
        };
        setHabits(prev => [...prev, newHabit]);
    };

    const toggleHabit = (id) => {
        const today = new Date().toISOString().split('T')[0];

        setHabits(prev => prev.map(habit => {
            if (habit.id !== id) return habit;

            const isCompletedToday = habit.lastCompletedDate === today;

            if (isCompletedToday) {
                // Undo completion
                const newHistory = habit.history.filter(date => date !== today);
                const prevDate = newHistory.length > 0 ? newHistory[newHistory.length - 1] : null;

                return {
                    ...habit,
                    streak: Math.max(0, habit.streak - 1),
                    lastCompletedDate: prevDate,
                    history: newHistory
                };
            } else {
                // Complete habit
                return {
                    ...habit,
                    streak: habit.streak + 1,
                    lastCompletedDate: today,
                    history: [...habit.history, today]
                };
            }
        }));
    };

    const deleteHabit = (id) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    return { habits, addHabit, toggleHabit, deleteHabit };
};
