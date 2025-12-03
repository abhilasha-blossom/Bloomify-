import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('bloomify-theme') || 'spring';
    });

    useEffect(() => {
        localStorage.setItem('bloomify-theme', theme);
        // Remove all theme classes
        document.body.classList.remove('theme-autumn', 'theme-winter', 'theme-summer');

        // Add current theme class (unless it's default spring)
        if (theme !== 'spring') {
            document.body.classList.add(`theme-${theme}`);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
