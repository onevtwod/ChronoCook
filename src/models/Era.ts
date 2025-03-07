export interface Era {
    id: string;
    name: string;
    startYear: number;
    endYear: number;
    description: string;
    imageUrl: string;
    theme: EraTheme;
    commonIngredients: string[];
    commonTechniques: string[];
    funFacts: string[];
}

export interface EraTheme {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    backgroundTexture?: string; // URL to texture image
    navigationIconSet: string; // Name of icon set to use
    soundEffect?: string; // URL to ambient sound
} 