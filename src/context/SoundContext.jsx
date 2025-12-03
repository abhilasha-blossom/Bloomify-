import React, { createContext, useState, useContext, useEffect } from 'react';
import { audioSynth } from '../utils/audioSynth';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('bloomify-muted') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('bloomify-muted', isMuted);
    }, [isMuted]);

    const playSound = (type) => {
        console.log(`Attempting to play sound: ${type}, Muted: ${isMuted}`);
        if (isMuted) return;

        try {
            switch (type) {
                case 'water':
                    audioSynth.playWater();
                    break;
                case 'success':
                    audioSynth.playSuccess();
                    break;
                case 'pop':
                    audioSynth.playPop();
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.error("Audio playback failed:", e);
        }
    };

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
