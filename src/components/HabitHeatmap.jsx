import React from 'react';
import styles from './HabitHeatmap.module.css';

const HabitHeatmap = ({ history }) => {
    const days = [];
    const today = new Date();

    // Generate last 28 days (4 weeks)
    for (let i = 27; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        days.push(dateStr);
    }

    return (
        <div className={styles.container}>
            <h4>Last 4 Weeks</h4>
            <div className={styles.grid}>
                {days.map(date => {
                    const isCompleted = history.includes(date);
                    return (
                        <div
                            key={date}
                            className={`${styles.cell} ${isCompleted ? styles.completed : ''}`}
                            title={date}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HabitHeatmap;
