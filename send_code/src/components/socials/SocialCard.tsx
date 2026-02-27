"use client";

import { MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface SocialCardProps {
    name: string;
    handle: string;
    avatar: string; // URL or placeholder
    platformIcon: React.ReactNode;
    timeAgo: string;
}

export default function SocialCard({ name, handle, avatar, platformIcon, timeAgo }: SocialCardProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="bg-white rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative group">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 relative">
                    {/* Using a placeholder if no real image is provided for now */}
                    <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="48px"
                    />
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        <MoreHorizontal size={20} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 animate-in fade-in slide-in-from-top-1 duration-200">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                <Edit2 size={14} />
                                Edit
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 mb-1">
                <span className="text-black [&>svg]:w-4 [&>svg]:h-4">
                    {platformIcon}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm truncate">{handle}</h3>
            </div>
            <p className="text-xs text-gray-400">{timeAgo}</p>
        </div>
    );
}
