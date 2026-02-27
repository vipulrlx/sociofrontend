import React from 'react';
import PlannerToolbar from './PlannerToolbar';
import PlannerCard from './PlannerCard';

const DUMMY_POSTS = [
    {
        id: 1,
        status: 'failed' as const,
        date: '24 Feb',
        platforms: ['facebook', 'linkedin', 'instagram'] as any[],
        title: 'Boost Engagement:...',
        description: 'Learn how to add mu...',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Elevate your...'
    },
    {
        id: 2,
        status: 'completed' as const,
        date: '23 Feb',
        platforms: ['facebook', 'linkedin'] as any[],
        title: 'Is Meta Verified Wort...',
        description: 'Discover if getting Me...',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Wondering if Meta...'
    },
    {
        id: 3,
        status: 'completed' as const,
        date: '22 Feb',
        platforms: ['facebook', 'linkedin'] as any[],
        title: 'Reset Instagram...',
        description: 'Learn how to reset yo...',
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Ready for a fresh start...'
    },
    {
        id: 4,
        status: 'completed' as const,
        date: '21 Feb',
        platforms: ['facebook', 'linkedin'] as any[],
        title: 'Boost Your Brand...',
        description: 'Unlock the potential o...',
        imageUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: "Unlock your brand's..."
    },
    {
        id: 5,
        status: 'completed' as const,
        date: '20 Feb',
        platforms: ['facebook', 'linkedin'] as any[],
        title: 'Content Strategy 2026',
        description: 'How to dominate social...',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Strategize for success'
    },
    {
        id: 6,
        status: 'failed' as const,
        date: '19 Feb',
        platforms: ['facebook', 'linkedin', 'tiktok'] as any[],
        title: 'TikTok Viral Tips',
        description: 'Secrets to going viral...',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Trending sound...'
    },
    {
        id: 7,
        status: 'scheduled' as const,
        date: '18 Feb',
        platforms: ['facebook'] as any[],
        title: 'Facebook Ads Guide',
        description: 'Optimizing your ROI...',
        imageUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Ads masterclass'
    },
    {
        id: 8,
        status: 'completed' as const,
        date: '17 Feb',
        platforms: ['linkedin'] as any[],
        title: 'LinkedIn Networking',
        description: 'Building professional...',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2959d13?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Connect and grow'
    },
    {
        id: 9,
        status: 'completed' as const,
        date: '16 Feb',
        platforms: ['facebook', 'instagram'] as any[],
        title: 'Instagram Reels Hack',
        description: '3 hacks for higher reach',
        imageUrl: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Viral beats'
    },
    {
        id: 10,
        status: 'scheduled' as const,
        date: '15 Feb',
        platforms: ['linkedin'] as any[],
        title: 'AI in Social Media',
        description: 'Automating your work...',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Future is now'
    },
    {
        id: 11,
        status: 'completed' as const,
        date: '14 Feb',
        platforms: ['facebook', 'linkedin'] as any[],
        title: 'Brand Consistency',
        description: 'Why it matters for you...',
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Identity matters'
    },
    {
        id: 12,
        status: 'failed' as const,
        date: '13 Feb',
        platforms: ['tiktok', 'instagram'] as any[],
        title: 'Short Form Content',
        description: 'The rise of micro-videos',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60',
        link: 'https://ocoya.com/blo...',
        musicInfo: 'Micro moments'
    }
];

export default function Planner() {
    return (
        <div className="p-4 md:p-8 min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Content Planner</h1>
                        <p className="text-gray-500 text-sm mt-1">Schedule and manage your social media posts</p>
                    </div>
                    <button className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold shadow-md shadow-gray-200 transition-all hover:-translate-y-0.5 active:translate-y-0">
                        + Create Post
                    </button>
                </div>

                <PlannerToolbar />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {DUMMY_POSTS.map((post) => (
                        <PlannerCard
                            key={post.id}
                            {...post}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
