import React, { useState } from 'react';
import styles from './AddHabitForm.module.css';

const AddHabitForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [icon, setIcon] = useState('🌱');
    const [plantType, setPlantType] = useState('classic');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name, icon, plantType);
        setName('');
        setIcon('🌱');
        setPlantType('classic');
    };

    const emojis = ['🌱', '💧', '🏃', '📚', '🧘', '🍎', '💤', '🎸', '🎨', '🧹'];
    const types = [
        { id: 'classic', label: 'Classic 🌱' },
        { id: 'sunflower', label: 'Sunflower 🌻' },
        { id: 'succulent', label: 'Succulent 🌵' },
        { id: 'cherry', label: 'Cherry 🌸' },
    ];

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

                <select
                    className={styles.typeSelect}
                    value={plantType}
                    onChange={(e) => setPlantType(e.target.value)}
                >
                    {types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
            </div>
            <button type="submit" className={styles.addButton}>
                Add
            </button>
        </form>
    );
};

export default AddHabitForm;
