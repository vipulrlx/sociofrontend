"use client";

import { Box, MessageSquare, Settings, Share2, Sparkles, Plus, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const TEMPLATES = [
    {
        id: "create-card",
        type: "create",
    },
    {
        id: 1,
        type: "template",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
        title: "Shopping is an art and I have mastered this skill.",
        userAvatar: "https://i.pravatar.cc/150?u=1",
        userName: "Gymshark",
        description: "Get Gymshark Adapt Camo Seamless Sports Bra - Savanna | Green for just $40.00",
        tags: ["#thigh", "#face", "#shoulder", "#trousers", "#active_pants"]
    },
    {
        id: 2,
        type: "template",
        image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60",
        title: "me trying Spanish AI Copy on Ocoya",
        userAvatar: "https://i.pravatar.cc/150?u=2",
        userName: "Travis",
        isPolyglot: true,
        description: "Ocoya's AI copy generator Travis is now available in 26 languages! You can now translate your content...",
        tags: ["#languages", "#globalisation", "#translations"]
    },
    {
        id: 3,
        type: "template",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
        title: "FoodTech IN WATER",
        userAvatar: "https://i.pravatar.cc/150?u=3",
        userName: "Hukou Store",
        description: "Join the revolution. We are a community that seeks to challenge the status quo. We believe we need to change our relationship with food...",
        tags: ["#community", "#foodtech", "#innovation"]
    },
    {
        id: 4,
        type: "template",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60",
        title: "Pick up a few - or all of them",
        userAvatar: "https://i.pravatar.cc/150?u=4",
        userName: "Fashion Brand",
        description: "New arrivals in stock! Check out the latest collection and find your perfect fit.",
        tags: ["#fashion", "#newarrivals", "#style"]
    },
    {
        id: 5,
        type: "template",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=60",
        title: "The Ultimate Guide to AI Marketing",
        userAvatar: "https://i.pravatar.cc/150?u=5",
        userName: "Marketing Guru",
        description: "Learn how to leverage AI to scale your business and automate your social media presence.",
        tags: ["#aimarketing", "#automation", "#growth"]
    },
    {
        id: 6,
        type: "template",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
        title: "Boost your Engagement with AI",
        userAvatar: "https://i.pravatar.cc/150?u=6",
        userName: "Social Ninja",
        description: "Discover the best practices for social media engagement in 2024 using AI tools.",
        tags: ["#engagement", "#socialmedia", "#strategy"]
    }
];

export default function ContentCreationGrid() {
    return (
        <div className="mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            {/* Header */}
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-2 mb-2">
                    <span className="text-3xl">👋</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Hey, let's create content!
                    </h2>
                </div>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
                    Here you can create & publish content quickly.
                    Get started by opening up our content editor with 10,000+ templates.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {TEMPLATES.map((item) => (
                    item.type === "create" ? (
                        <div
                            key={item.id}
                            className="bg-gray-50 border-2 border-dashed border-purple-400 rounded-[3px] p-6 flex flex-col items-center justify-center gap-3 min-h-[280px] transition-all hover:bg-purple-50 group shadow-sm hover:shadow-md"
                        >
                            <div className="w-14 h-14 bg-white rounded-[3px] flex items-center justify-center shadow-sm text-purple-600 mb-1 group-hover:scale-110 transition-transform">
                                <Sparkles size={28} />
                            </div>
                            <button className="w-full py-2.5 px-6 bg-white border border-gray-200 text-gray-800 font-bold rounded-[3px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-xs">
                                Create content
                            </button>
                            <button className="w-full py-2.5 px-6 bg-purple-600 text-white font-bold rounded-[3px] shadow-md hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 transition-all text-xs flex items-center justify-center gap-2">
                                <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-[8px]">C</span>
                                Create on Canva
                            </button>
                        </div>
                    ) : (
                        <div
                            key={item.id}
                            className="bg-white rounded-[3px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                        >
                            <div className="p-3 pb-0">
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 rounded-[3px] border border-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[3px]"
                                    />
                                    <div className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-md rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus size={14} className="text-gray-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 flex-grow flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <img
                                        src={item.userAvatar}
                                        alt={item.userName}
                                        className="w-5 h-5 rounded-full border border-gray-100"
                                    />
                                    <p className="text-[10px] font-bold text-gray-700 flex items-center gap-1">
                                        {item.userName}
                                        {item.isPolyglot && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex items-center justify-center text-[5px] text-white">✓</span>}
                                    </p>
                                </div>

                                <h4 className="text-[12px] font-extrabold text-gray-900 leading-tight mb-1 content-ellipsis line-clamp-2">
                                    {item.title}
                                </h4>

                                <p className="text-[10px] text-gray-400 line-clamp-2 mb-3 flex-grow leading-snug">
                                    {item.description}
                                </p>

                                <div className="flex flex-wrap gap-1">
                                    {item.tags?.map((tag, idx) => (
                                        <span key={idx} className="text-[9px] font-bold text-blue-500 hover:text-blue-600 cursor-pointer">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
