import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'spring', icon: '🌸', label: 'Spring' },
        { id: 'summer', icon: '☀️', label: 'Summer' },
        { id: 'autumn', icon: '🍂', label: 'Autumn' },
        { id: 'winter', icon: '❄️', label: 'Winter' },
    ];

    return (
        <div className={styles.switcher}>
            {themes.map(t => (
                <button
                    key={t.id}
                    className={`${styles.btn} ${theme === t.id ? styles.active : ''}`}
                    onClick={() => setTheme(t.id)}
                    title={t.label}
                >
                    {t.icon}
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
