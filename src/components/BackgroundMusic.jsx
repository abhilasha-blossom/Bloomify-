import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';
import { audioSynth } from '../utils/audioSynth';

const BackgroundMusic = () => {
    const { theme } = useTheme();
    const { isMuted } = useSound();

    useEffect(() => {
        if (isMuted) {
            audioSynth.stopMusic();
        } else {
            audioSynth.playMusic(theme);
        }

        return () => {
            audioSynth.stopMusic();
        };
    }, [theme, isMuted]);

    return null; // Invisible component, just logic
};

export default BackgroundMusic;
