export interface OriginalIngredient {
    name: string;
    quantity: string;
    historicalNote: string;
}

export interface ModernSubstitute {
    original: string;
    substitute: string;
    substitutionReason: string;
}

export interface CookingStep {
    description: string;
    duration: number; // in minutes
    toolSuggestion: string;
    historicalVideo?: string; // URL to video
    image?: string; // URL to image
}

export interface Recipe {
    id: string;
    title: string;
    era: string[]; // e.g., ["Ancient Rome", "Renaissance"]
    description: string;
    originalIngredients: OriginalIngredient[];
    modernSubstitutes: ModernSubstitute[];
    cookingSteps: CookingStep[];
    accuracyRating: number; // 0-5 stars
    flavorRating: number; // 0-5 stars
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
} 