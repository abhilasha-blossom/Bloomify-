import React from 'react';
import { getPlantStage } from '../utils/growthLogic';
import styles from './Greenhouse.module.css';

const Greenhouse = ({ archivedHabits, onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>🏆 The Greenhouse</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                {archivedHabits.length === 0 ? (
                    <div className={styles.empty}>
                        <p>No harvested plants yet.</p>
                        <p className={styles.subtext}>Grow a habit to 30 days to harvest it here!</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {archivedHabits.map(habit => {
                            const { image } = getPlantStage(habit.finalStreak, habit.plantType);
                            return (
                                <div key={habit.id} className={styles.card}>
                                    <div className={styles.plantWrapper}>
                                        <img src={image} alt="Harvested Plant" className={styles.plantImage} />
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.icon}>{habit.icon}</span>
                                        <h3 className={styles.name}>{habit.name}</h3>
                                        <span className={styles.date}>Harvested: {habit.archivedDate}</span>
                                        <span className={styles.streak}>🔥 {habit.finalStreak} Days</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Greenhouse;
