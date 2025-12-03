import React, { useState } from 'react';
import { getPlantStage } from '../utils/growthLogic';
import styles from './GrowthLab.module.css';

const PLANT_TYPES = [
    { id: 'classic', name: 'Classic 🌱', icon: '🌱' },
    { id: 'sunflower', name: 'Sunflower 🌻', icon: '🌻' },
    { id: 'succulent', name: 'Succulent 🌵', icon: '🌵' },
    { id: 'cherry', name: 'Cherry Blossom 🌸', icon: '🌸' }
];

const GrowthLab = ({ onClose }) => {
    const [selectedType, setSelectedType] = useState('classic');
    const [streak, setStreak] = useState(0);
    const { stage, image } = getPlantStage(streak, selectedType);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>🧪 Growth Lab</h2>
                    <button className={styles.closeBtn} onClick={onClose}>×</button>
                </div>

                <div className={styles.content}>
                    <div className={styles.controls}>
                        <h3>Select Plant DNA</h3>
                        <div className={styles.typeGrid}>
                            {PLANT_TYPES.map(type => (
                                <button
                                    key={type.id}
                                    className={`${styles.typeBtn} ${selectedType === type.id ? styles.active : ''}`}
                                    onClick={() => setSelectedType(type.id)}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>

                        <h3>Time Travel (Streak: {streak} days)</h3>
                        <input
                            type="range"
                            min="0"
                            max="30"
                            value={streak}
                            onChange={(e) => setStreak(parseInt(e.target.value))}
                            className={styles.slider}
                        />
                    </div>

                    <div className={styles.preview}>
                        <div className={styles.stageLabel}>{stage}</div>
                        <img src={image} alt={stage} className={styles.plantImage} />
                        <div className={styles.shadow}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrowthLab;
