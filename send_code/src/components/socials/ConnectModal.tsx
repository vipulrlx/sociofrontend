import { X } from "lucide-react";
import {
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    MessageCircle, // Placeholder for Discord/Telegram
    Video, // Placeholder for Tiktok/Shorts
    MapPin, // Placeholder for Google Business
    Share2, // Generic placeholder
} from "lucide-react";

interface SocialPlatform {
    id: string;
    name: string;
    category: string;
    icon: React.ReactNode;
    color: string;
}

const platforms: SocialPlatform[] = [
    { id: "facebook", name: "Facebook Page", category: "Social", icon: <Facebook />, color: "text-blue-600" },
    { id: "instagram", name: "Instagram Business", category: "Social", icon: <Instagram />, color: "text-pink-600" },
    { id: "twitter", name: "X (Twitter)", category: "Social", icon: <Twitter />, color: "text-black" },
    { id: "linkedin", name: "LinkedIn", category: "Social", icon: <Linkedin />, color: "text-blue-700" },
    { id: "pinterest", name: "Pinterest", category: "Social", icon: <Share2 />, color: "text-red-600" },
    { id: "threads", name: "Threads", category: "Social", icon: <Share2 />, color: "text-black" },
    { id: "tiktok", name: "Tiktok", category: "Social", icon: <Video />, color: "text-black" },
    { id: "google", name: "Google Business", category: "Social", icon: <MapPin />, color: "text-blue-500" },
    { id: "youtube", name: "Youtube Shorts", category: "Social", icon: <Youtube />, color: "text-red-500" },
    { id: "discord", name: "Discord", category: "Community", icon: <MessageCircle />, color: "text-indigo-600" },
    { id: "telegram", name: "Telegram", category: "Community", icon: <MessageCircle />, color: "text-sky-500" },
];

interface ConnectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (platformId: string) => void;
}

export default function ConnectModal({ isOpen, onClose, onConnect }: ConnectModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Connect profiles</h2>
                        <p className="text-xs text-gray-500 mt-1">Connect social media profiles by clicking below.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* List */}
                <div className="overflow-y-auto p-2 space-y-1">
                    {platforms.map((platform) => (
                        <button
                            key={platform.id}
                            onClick={() => onConnect(platform.id)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center ${platform.color} group-hover:scale-110 transition-transform`}>
                                    {/* Icon Wrapper */}
                                    <div className="[&>svg]:w-5 [&>svg]:h-5">
                                        {platform.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{platform.name}</h3>
                                    <p className="text-xs text-gray-500">{platform.category}</p>
                                </div>
                            </div>
                            <span className="text-gray-300 group-hover:text-gray-600 transition-colors">
                                →
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
