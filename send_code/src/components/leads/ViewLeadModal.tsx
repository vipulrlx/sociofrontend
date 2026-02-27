"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Building2, FileText, Loader2, Calendar } from "lucide-react";
import { getLeadDetails, Lead } from "@/services/leadsService";

interface ViewLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: string | number | null;
}

export default function ViewLeadModal({ isOpen, onClose, leadId }: ViewLeadModalProps) {
    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen && leadId) {
            const fetchDetails = async () => {
                setLoading(true);
                setError("");
                try {
                    const data = await getLeadDetails(leadId);
                    setLead(data);
                } catch (err: any) {
                    setError("Failed to load lead details. It might have been deleted or the server is unreachable.");
                } finally {
                    setLoading(false);
                }
            };
            fetchDetails();
        } else {
            setLead(null);
            setError("");
        }
    }, [isOpen, leadId]);

    if (!isOpen) return null;

    const getStatusColor = (status: string | undefined) => {
        if (!status) return "bg-gray-100 text-gray-700";
        const s = status.toLowerCase();
        if (s === "new") return "bg-green-100 text-green-700";
        if (s === "contacted") return "bg-blue-100 text-blue-700";
        if (s === "qualified") return "bg-purple-100 text-purple-700";
        if (s === "lost") return "bg-red-100 text-red-700";
        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Lead Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 space-y-4">
                            <Loader2 size={32} className="text-blue-600 animate-spin" />
                            <p className="text-sm text-gray-500 font-medium">Loading details...</p>
                        </div>
                    ) : error ? (
                        <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-center justify-center">
                            {error}
                        </div>
                    ) : lead ? (
                        <div className="space-y-6">
                            {/* Header / Basic Info */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <User size={20} className="text-gray-400" />
                                        {lead.name}
                                    </h3>
                                    {lead.company && (
                                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                            <Building2 size={14} />
                                            {lead.company}
                                        </p>
                                    )}
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                                    {lead.status || "Unknown"}
                                </span>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Information</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            <Mail size={16} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="font-medium text-gray-900">{lead.email || "Not provided"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="p-2 bg-gray-50 rounded-lg">
                                            <Phone size={16} className="text-gray-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-900">{lead.phone || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            {(lead.followup_note) && (
                                <>
                                    <hr className="border-gray-100" />
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notes & Details</h4>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-sm text-gray-700">
                                            <div className="flex items-start gap-2">
                                                <FileText size={16} className="text-gray-400 mt-0.5 shrink-0" />
                                                <p className="whitespace-pre-wrap">{lead.followup_note}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-8">No data available.</div>
                    )}
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
