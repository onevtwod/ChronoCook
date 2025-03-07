export interface User {
    id: string;
    username: string;
    email: string;
    profileImageUrl?: string;
    bio?: string;
    favoriteRecipes: string[]; // Recipe IDs
    favoriteEras: string[]; // Era names
    createdRecipes: string[]; // Recipe IDs
    ratings: {
        recipeId: string;
        accuracyRating?: number;
        flavorRating?: number;
        comment?: string;
    }[];
    joinedAt: Date;
    lastActive: Date;
} 