"use client";

import { useEffect, useState } from "react";
import { Check, Mail, Plus, Eye, Edit2 } from "lucide-react";
import { getLeads, Lead } from "@/services/leadsService";
import InitiateCallModal from "./InitiateCallModal";
import SendEmailModal from "./SendEmailModal";
import ViewLeadModal from "./ViewLeadModal";
import EditLeadModal from "./EditLeadModal";

export default function LeadsList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [viewLeadId, setViewLeadId] = useState<string | number | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLeads().then((data) => {
            setLeads(data);
            setLoading(false);
        });
    }, []);

    const handleCall = (lead: Lead) => {
        setSelectedLead(lead);
        setIsCallModalOpen(true);
    };

    const handleEmail = (lead: Lead) => {
        setSelectedLead(lead);
        setIsEmailModalOpen(true);
    };

    const handleView = (leadId: string | number) => {
        setViewLeadId(leadId);
        setIsViewModalOpen(true);
    };

    const handleEdit = (lead: Lead) => {
        setSelectedLead(lead);
        setIsEditModalOpen(true);
    };

    const handleLeadUpdated = (updatedLead: Lead) => {
        setLeads((prevLeads) => prevLeads.map((l) => (l.id === updatedLead.id ? updatedLead : l)));
    };

    const getStatusColor = (status: string) => {
        if (!status) return "bg-gray-100 text-gray-700";
        const s = status.toLowerCase();
        switch (s) {
            case "new":
                return "bg-green-100 text-green-700";
            case "contacted":
                return "bg-blue-100 text-blue-700";
            case "qualified":
                return "bg-purple-100 text-purple-700";
            case "lost":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50 text-sm font-semibold text-gray-500">
                    <div>Name</div>
                    <div>Phone</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading leads...</div>
                    ) : leads.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No leads found.</div>
                    ) : (
                        leads.map((lead, index) => (
                            <div key={lead.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors">
                                <div className="font-medium text-gray-900">{lead.name}</div>
                                <div className="text-gray-600 font-mono text-sm">{lead.phone}</div>
                                <div>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium capitalize ${getStatusColor(lead.status)}`}
                                    >
                                        {lead.status || 'New'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleView(lead.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors"
                                    >
                                        <Eye size={14} className="text-gray-500" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(lead)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors"
                                    >
                                        <Edit2 size={14} className="text-gray-500" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleCall(lead)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                    >
                                        <Check size={14} />
                                        Call
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <InitiateCallModal
                isOpen={isCallModalOpen}
                onClose={() => setIsCallModalOpen(false)}
                lead={selectedLead}
            />
            <SendEmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                lead={selectedLead}
            />
            <ViewLeadModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                leadId={viewLeadId}
            />
            <EditLeadModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onLeadUpdated={handleLeadUpdated}
                lead={selectedLead}
            />
        </>
    );
}
