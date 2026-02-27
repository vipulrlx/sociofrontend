"use client";

import { Mail, Inbox } from "lucide-react";
import { Modal } from "@/components/ui/custom-modal";
import { Lead } from "@/services/leadsService";
import { useState } from "react";

interface SendEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
}

export default function SendEmailModal({ isOpen, onClose, lead }: SendEmailModalProps) {
    const [template, setTemplate] = useState("Follow-Up Email");

    if (!lead) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Send Email"
            icon={<Mail className="ml-auto w-5 h-5 text-gray-400" />}
        >
            <div className="space-y-4">
                {/* Template Select */}
                <div className="relative">
                    <select
                        title="Select Template"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                    >
                        <option>Follow-Up Email</option>
                        <option>Introductory Email</option>
                        <option>Proposal Email</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                    <label className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900">
                        Select Template
                    </label>
                </div>

                {/* Subject - Using flex to avoid overlap */}
                <div className="relative flex items-center border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 bg-white">
                    <span className="pl-3 text-sm text-gray-500 font-medium whitespace-nowrap select-none">Subject:</span>
                    <input
                        type="text"
                        defaultValue="Follow Up"
                        className="w-full text-gray-900 py-2.5 px-2 border-0 focus:ring-0 text-sm font-medium rounded-r-lg outline-none"
                    />
                </div>

                {/* Message */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message:</label>
                    <textarea
                        rows={6}
                        className="w-full bg-white border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 rounded-lg p-3 resize-none font-sans"
                        defaultValue={`Hi ${lead.name.split(' ')[0]},\n\nJust checking in as discussed. Let me know if you have any questions.\n\nBest,\nSarah`}
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                    ← Send Email
                </button>
                <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 border border-gray-200 rounded-lg transition-colors">
                    <Inbox className="w-5 h-5 text-gray-600" />
                    Save a Draft
                </button>
            </div>
        </Modal>
    );
}
