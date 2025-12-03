import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from './BackgroundEffects.module.css';

const BackgroundEffects = () => {
    const { theme } = useTheme();
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles
        const particleCount = 15;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position 0-100%
            delay: Math.random() * 10, // Random animation delay
            duration: 15 + Math.random() * 10, // Slower duration 15-25s
            size: 1.5, // Smaller uniform size
        }));
        setParticles(newParticles);
    }, [theme]);

    const getThemeEmojis = () => {
        switch (theme) {
            case 'spring': return ['🌸', '🌼', '🌷', '🌱'];
            case 'summer': return ['🦋', '☀️', '🐝', '✨'];
            case 'autumn': return ['🍂', '🍁', '🌰', '🍄'];
            case 'winter': return ['❄️', '🌨️', '☃️', '✨'];
            default: return ['✨'];
        }
    };

    const emojis = getThemeEmojis();

    return (
        <div className={styles.container}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={styles.particle}
                    style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        fontSize: `${p.size}rem`,
                    }}
                >
                    {emojis[p.id % emojis.length]}
                </div>
            ))}
        </div>
    );
};

export default BackgroundEffects;
