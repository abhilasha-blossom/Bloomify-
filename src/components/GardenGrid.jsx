import React from 'react';
import PlantCard from './PlantCard';
import styles from './GardenGrid.module.css';

const GardenGrid = ({ habits, onToggle, onDelete }) => {
    if (habits.length === 0) {
        return (
            <div className={styles.emptyState}>
                <p>Your garden is empty. Plant your first habit! 🌱</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {habits.map(habit => (
                <PlantCard
                    key={habit.id}
                    habit={habit}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default GardenGrid;
