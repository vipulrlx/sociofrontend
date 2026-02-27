"use client";

import { useState } from "react";
import LeadsList from "@/components/leads/LeadsList";
import AddLeadModal from "@/components/leads/AddLeadModal";
import { Plus, Upload } from "lucide-react";

export default function LeadsPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleLeadAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header Actions */}
            <div className="flex items-center gap-4 mb-8">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
                    <Upload size={16} />
                    Import Leads
                </button>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Add New Lead
                </button>
            </div>

            <div className="mb-6">
                <h1 className="text-lg font-bold text-gray-800 mb-1">Leads List</h1>
            </div>

            <LeadsList key={refreshTrigger} />

            <AddLeadModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onLeadAdded={handleLeadAdded}
            />
        </div>
    );
}
