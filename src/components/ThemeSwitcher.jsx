import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const { isMuted, toggleMute } = useSound();

    const themes = [
        { id: 'spring', icon: '🌸', label: 'Spring' },
        { id: 'summer', icon: '☀️', label: 'Summer' },
        { id: 'autumn', icon: '🍂', label: 'Autumn' },
        { id: 'winter', icon: '❄️', label: 'Winter' },
    ];

    return (
        <div className={styles.container}>
            {themes.map((t) => (
                <button
                    key={t.id}
                    className={`${styles.themeBtn} ${theme === t.id ? styles.active : ''}`}
                    onClick={() => setTheme(t.id)}
                    title={t.label}
                >
                    {t.icon}
                </button>
            ))}
            <div className={styles.divider}></div>
            <button
                className={styles.themeBtn}
                onClick={toggleMute}
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
