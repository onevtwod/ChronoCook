export interface Post {
    id: string;
    authorId: string; // User ID
    title: string;
    content: string;
    imageUrls?: string[];
    tags: string[];
    relatedRecipes?: string[]; // Recipe IDs
    relatedEras?: string[]; // Era names
    likes: string[]; // User IDs
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string; // User ID
    content: string;
    imageUrl?: string;
    likes: string[]; // User IDs
    replyTo?: string; // Comment ID, for nested comments
    createdAt: Date;
    updatedAt: Date;
} 