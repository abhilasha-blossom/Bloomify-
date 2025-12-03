import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { getPlantStage } from '../utils/growthLogic';
import { useSound } from '../context/SoundContext';
import HabitHeatmap from './HabitHeatmap';
import styles from './PlantCard.module.css';

const PlantCard = ({ habit, onToggle, onDelete, onArchive }) => {
    const { stage, image } = getPlantStage(habit.streak, habit.plantType);
    const { playSound } = useSound();
    const [isFlipped, setIsFlipped] = useState(false);

    const isCompletedToday = habit.lastCompletedDate === new Date().toISOString().split('T')[0];
    const canHarvest = habit.streak >= 30;

    const handleToggle = (e) => {
        e.stopPropagation();
        if (!isCompletedToday) {
            playSound('water');
            setTimeout(() => playSound('success'), 200);

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#d48c9e', '#9fd3eb', '#fdf3a7']
            });
        } else {
            playSound('pop');
        }
        onToggle(habit.id);
    };

    const handleArchive = (e) => {
        e.stopPropagation();
        playSound('success');
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
        onArchive(habit.id);
    };

    return (
        <div className={`${styles.cardWrapper} ${isFlipped ? styles.flipped : ''}`}>
            <div className={styles.cardInner}>

                {/* FRONT */}
                <div className={`${styles.cardFace} ${styles.cardFront} ${isCompletedToday ? styles.completed : ''}`}>
                    <div className={styles.plantContainer}>
                        <img src={image} alt={stage} className={`${styles.plantImage} ${isCompletedToday ? styles.bounce : ''}`} />
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
                            {canHarvest ? (
                                <button className={styles.harvestBtn} onClick={handleArchive} title="Harvest">
                                    Harvest 🏆
                                </button>
                            ) : (
                                <button className={styles.toggleBtn} onClick={handleToggle}>
                                    {isCompletedToday ? 'Done! ✔' : 'Water 💧'}
                                </button>
                            )}

                            <button className={styles.iconBtn} onClick={() => setIsFlipped(true)} title="View Stats">
                                📊
                            </button>

                            <button className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); onDelete(habit.id); }} title="Delete">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.backHeader}>
                        <h3>{habit.name} Stats</h3>
                        <button className={styles.closeBtn} onClick={() => setIsFlipped(false)}>×</button>
                    </div>
                    <HabitHeatmap history={habit.history || []} />
                    <div className={styles.backStats}>
                        <p>Current Streak: <strong>{habit.streak}</strong></p>
                        <p>Total Check-ins: <strong>{habit.history ? habit.history.length : 0}</strong></p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PlantCard;
