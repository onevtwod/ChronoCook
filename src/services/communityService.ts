import { Platform } from 'react-native';

export interface Discussion {
    id: string;
    title: string;
    author: {
        name: string;
        avatar: string;
        level: number;
    };
    content: string;
    timestamp: string;
    replies: number;
    tags: string[];
    era: string;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    participants: number;
    image: string;
    era: string;
    tags: string[];
}

// Mock API functions - replace with actual API calls in production
export const communityService = {
    // Discussions
    getDiscussions: async (): Promise<Discussion[]> => {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        title: 'Authentic Roman Garum Recipe?',
                        author: {
                            name: 'Marcus',
                            avatar: 'https://example.com/avatar1.jpg',
                            level: 15,
                        },
                        content: 'Looking for historically accurate garum recipes...',
                        timestamp: '2h ago',
                        replies: 23,
                        tags: ['recipe-help', 'ancient-rome', 'fermentation'],
                        era: 'Ancient Rome',
                    },
                    // Add more mock discussions...
                ]);
            }, 500);
        });
    },

    createDiscussion: async (data: Partial<Discussion>): Promise<Discussion> => {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.random().toString(36).substr(2, 9),
                    title: data.title || '',
                    author: {
                        name: 'Current User',
                        avatar: 'https://example.com/default-avatar.jpg',
                        level: 1,
                    },
                    content: data.content || '',
                    timestamp: 'Just now',
                    replies: 0,
                    tags: data.tags || [],
                    era: data.era || '',
                });
            }, 500);
        });
    },

    // Challenges
    getChallenges: async (): Promise<Challenge[]> => {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        title: 'Medieval Feast Week',
                        description: 'Create an authentic medieval feast menu...',
                        startDate: '2024-03-01',
                        endDate: '2024-03-07',
                        participants: 128,
                        image: 'https://example.com/medieval-feast.jpg',
                        era: 'Medieval',
                        tags: ['challenge', 'medieval', 'feast'],
                    },
                    // Add more mock challenges...
                ]);
            }, 500);
        });
    },

    createChallenge: async (data: Partial<Challenge>): Promise<Challenge> => {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.random().toString(36).substr(2, 9),
                    title: data.title || '',
                    description: data.description || '',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: data.endDate || '',
                    participants: 0,
                    image: data.image || 'https://example.com/default-challenge.jpg',
                    era: data.era || '',
                    tags: data.tags || [],
                });
            }, 500);
        });
    },

    // Image Upload
    uploadImage: async (uri: string): Promise<string> => {
        // Simulated image upload
        return new Promise((resolve) => {
            setTimeout(() => {
                // In a real implementation, this would upload to a server
                // and return the URL of the uploaded image
                resolve(`https://example.com/uploaded-image-${Date.now()}.jpg`);
            }, 1000);
        });
    },
};

export default communityService; 