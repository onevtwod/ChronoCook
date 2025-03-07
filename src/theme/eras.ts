import { EraTheme } from '../models';

export const ANCIENT_ROME_THEME: EraTheme = {
    primaryColor: '#8B0000', // Dark red
    secondaryColor: '#F5DEB3', // Wheat
    accentColor: '#DAA520', // Goldenrod
    backgroundColor: '#F5F5DC', // Beige
    textColor: '#4B3621', // Dark brown
    fontFamily: 'Times New Roman',
    navigationIconSet: 'roman',
    backgroundTexture: '/assets/textures/roman-marble.png',
    soundEffect: '/assets/sounds/roman-marketplace.mp3',
};

export const MEDIEVAL_THEME: EraTheme = {
    primaryColor: '#4B0082', // Indigo
    secondaryColor: '#8B4513', // Saddle brown
    accentColor: '#FFD700', // Gold
    backgroundColor: '#E6CCB2', // Light brown
    textColor: '#2F4F4F', // Dark slate gray
    fontFamily: 'Old English Text MT',
    navigationIconSet: 'medieval',
    backgroundTexture: '/assets/textures/medieval-parchment.png',
    soundEffect: '/assets/sounds/medieval-tavern.mp3',
};

export const RENAISSANCE_THEME: EraTheme = {
    primaryColor: '#800020', // Burgundy
    secondaryColor: '#CD853F', // Peru
    accentColor: '#B8860B', // Dark goldenrod
    backgroundColor: '#F5F5F5', // White smoke
    textColor: '#000000', // Black
    fontFamily: 'Garamond',
    navigationIconSet: 'renaissance',
    backgroundTexture: '/assets/textures/renaissance-fabric.png',
    soundEffect: '/assets/sounds/renaissance-court.mp3',
};

export const VICTORIAN_THEME: EraTheme = {
    primaryColor: '#00008B', // Dark blue
    secondaryColor: '#A0522D', // Sienna
    accentColor: '#C0C0C0', // Silver
    backgroundColor: '#F0F8FF', // Alice blue
    textColor: '#2F4F4F', // Dark slate gray
    fontFamily: 'Georgia',
    navigationIconSet: 'victorian',
    backgroundTexture: '/assets/textures/victorian-wallpaper.png',
    soundEffect: '/assets/sounds/victorian-parlor.mp3',
};

export const MODERN_THEME: EraTheme = {
    primaryColor: '#1E90FF', // Dodger blue
    secondaryColor: '#F8F8FF', // Ghost white
    accentColor: '#FF4500', // Orange red
    backgroundColor: '#FFFFFF', // White
    textColor: '#333333', // Dark gray
    fontFamily: 'Helvetica',
    navigationIconSet: 'modern',
};

export const getThemeByEra = (eraName: string): EraTheme => {
    switch (eraName.toLowerCase()) {
        case 'ancient rome':
            return ANCIENT_ROME_THEME;
        case 'medieval':
            return MEDIEVAL_THEME;
        case 'renaissance':
            return RENAISSANCE_THEME;
        case 'victorian':
            return VICTORIAN_THEME;
        case 'modern':
            return MODERN_THEME;
        default:
            return MODERN_THEME;
    }
}; 