import React from 'react';
import { Facebook, Linkedin, Music, MoreHorizontal, Check, X, Link as LinkIcon } from 'lucide-react';

interface PlannerCardProps {
    status: 'completed' | 'failed' | 'scheduled';
    date: string;
    platforms: ('facebook' | 'linkedin' | 'instagram' | 'tiktok')[];
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    musicInfo?: string;
}

const PlannerCard: React.FC<PlannerCardProps> = ({
    status,
    date,
    platforms,
    title,
    description,
    imageUrl,
    link,
    musicInfo
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="p-2 flex items-center justify-between border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center gap-1.5">
                    {status === 'completed' ? (
                        <div className="w-4 h-4 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                            <Check size={10} strokeWidth={3} />
                        </div>
                    ) : status === 'failed' ? (
                        <div className="w-4 h-4 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                            <X size={10} strokeWidth={3} />
                        </div>
                    ) : (
                        <div className="w-4 h-4 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        </div>
                    )}
                    <span className="text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-gray-400">{date}</span>
                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={14} />
                    </button>
                </div>
            </div>

            {/* Content Preview */}
            <div className="flex flex-col flex-grow">
                <div className="px-3 py-2 flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                        {platforms.includes('facebook') && (
                            <Facebook size={14} className="text-blue-600 fill-blue-600" />
                        )}
                        {platforms.includes('linkedin') && (
                            <Linkedin size={14} className="text-blue-700 fill-blue-700" />
                        )}
                    </div>

                    {musicInfo && (
                        <div className="flex items-center gap-1 text-gray-500 text-[10px] italic">
                            <Music size={10} />
                            <span className="truncate max-w-[120px]">{musicInfo}</span>
                        </div>
                    )}

                    <h3 className="text-gray-400 text-[11px] font-medium line-clamp-1">
                        {title}
                    </h3>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 group border-y border-gray-100">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="p-3">
                    <h4 className="font-bold text-gray-800 text-[13px] leading-tight mb-1 line-clamp-1">
                        {title}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mb-1.5">
                        {description}
                    </p>
                    <div className="flex items-center gap-1 text-blue-500 text-[10px] hover:underline cursor-pointer">
                        <span className="truncate">{link}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlannerCard;
