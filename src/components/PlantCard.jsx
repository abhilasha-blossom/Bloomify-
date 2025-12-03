import React from 'react';
import { getPlantStage } from '../utils/growthLogic';
import styles from './PlantCard.module.css';

const PlantCard = ({ habit, onToggle, onDelete }) => {
    const { stage, image } = getPlantStage(habit.streak);
    const isCompletedToday = habit.lastCompletedDate === new Date().toISOString().split('T')[0];

    return (
        <div className={`${styles.card} ${isCompletedToday ? styles.completed : ''}`}>
            <div className={styles.plantContainer}>
                <img src={image} alt={stage} className={styles.plantImage} />
            </div>

            <div className={styles.info}>
                <div className={styles.header}>
                    <span className={styles.icon}>{habit.icon}</span>
                    <h3 className={styles.name}>{habit.name}</h3>
                </div>

                <div className={styles.stats}>
                    <span className={styles.streak}>🔥 {habit.streak} days</span>
                    <span className={styles.stageLabel}>{stage}</span>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => onToggle(habit.id)}
                    >
                        {isCompletedToday ? 'Done! ✔' : 'Water 💧'}
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(habit.id)}
                        title="Delete Habit"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlantCard;
