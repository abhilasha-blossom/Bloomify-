import React, { useState } from 'react';
import styles from './AddHabitForm.module.css';

const AddHabitForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('🌱');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name, icon);
        setName('');
        setIcon('🌱');
    };

    const emojis = ['🌱', '💧', '🏃', '📚', '🧘', '🍎', '💤', '🎸', '🎨', '🧹'];

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <select
                    className={styles.iconSelect}
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                >
                    {emojis.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="New habit name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={20}
                />
            </div>
            <button type="submit" className={styles.addButton}>
                Add
            </button>
        </form>
    );
};

export default AddHabitForm;
