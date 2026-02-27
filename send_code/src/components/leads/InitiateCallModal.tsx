"use client";

import { Phone, User } from "lucide-react";
import { Modal } from "@/components/ui/custom-modal";
import { Lead } from "@/services/leadsService";
import { Button } from "@/components/ui/button"; // Assuming I can use or I'll just use standard tailwind classes if Button is not compatible, but let's try standard classes for now to match exactly.

interface InitiateCallModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
}

export default function InitiateCallModal({ isOpen, onClose, lead }: InitiateCallModalProps) {
    if (!lead) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Initiate Call"
            icon={<Phone className="ml-auto w-5 h-5 text-gray-400" />} // The icon is actually on the right in the screenshot
        >
            {/* Custom Header approach matching screenshot more closely: Icon is on right */}

            <div className="flex items-center gap-4 py-4 border-b border-gray-50 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500">
                    {/* Placeholder Avatar */}
                    <User size={24} />
                    {/* If we had an image: <img src={lead.avatar} /> */}
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-500">{lead.phone}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                    <Phone size={18} />
                    Call Lead
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 border border-gray-200 rounded-lg transition-colors">
                    <div className="w-2 h-2 rotate-45 border-2 border-current rounded-sm"></div> {/* Mocking the diamond icon */}
                    Schedule Call
                </button>
            </div>
        </Modal>
    );
}
