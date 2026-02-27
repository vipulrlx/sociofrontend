"use client";

import { useState } from "react";
import { Plus, Twitter } from "lucide-react";
import SocialCard from "./SocialCard";
import ConnectModal from "./ConnectModal";

export default function Socials() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dummy data matching the user's request
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            name: "Vipul Khare",
            handle: "vipulkhare25",
            avatar: "https://ui-avatars.com/api/?name=Vipul+Khare&background=0D8ABC&color=fff",
            platformIcon: <Twitter />,
            timeAgo: "14 hours ago"
        }
    ]);

    const handleConnect = (platformId: string) => {
        console.log("Connecting to:", platformId);
        // Here you would typically initiate the oauth flow
        setIsModalOpen(false);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Social Accounts</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your connected social media profiles</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Render Connected Accounts */}
                {accounts.map((account) => (
                    <SocialCard
                        key={account.id}
                        name={account.name}
                        handle={account.handle}
                        avatar={account.avatar}
                        platformIcon={account.platformIcon}
                        timeAgo={account.timeAgo}
                    />
                ))}

                {/* Add New Button Card */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-start p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group h-full text-left cursor-pointer"
                >
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Plus className="text-blue-500" size={24} />
                    </div>
                    <div className="ml-4">
                        <span className="block font-medium text-gray-900">Connect Profile</span>
                        <span className="text-xs text-gray-400 mt-0.5">Add a new social account</span>
                    </div>
                </button>
            </div>

            <ConnectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConnect={handleConnect}
            />
        </div>
    );
}
