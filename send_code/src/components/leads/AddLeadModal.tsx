"use client";

import { useState } from "react";
import { X, User, Mail, Phone, Building2, FileText, Loader2 } from "lucide-react";
import { createLead, Lead } from "@/services/leadsService";

interface AddLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLeadAdded: (newLead: Lead) => void;
}

export default function AddLeadModal({ isOpen, onClose, onLeadAdded }: AddLeadModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "new",
        followup_note: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const newLead = await createLead(formData);
            onLeadAdded(newLead);
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                status: "new",
                followup_note: "",
            });
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.detail || err.response?.data?.message || err.message || "Failed to create lead");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Add New Lead</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Company</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building2 size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                placeholder="Acme Corp"
                            />
                        </div>
                    </div>

                    {/* Status Placeholder (Hidden or Preset as requested) */}
                    {/* The API requires a status field in the JSON, setting it visually to the user or keeping default */}
                    <div className="space-y-1.5 hidden">
                        <input type="hidden" name="status" value="new" />
                    </div>

                    {/* Follow up Note */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">Follow-up Note</label>
                        <div className="relative">
                            <div className="absolute top-2.5 left-3 pointer-events-none">
                                <FileText size={16} className="text-gray-400" />
                            </div>
                            <textarea
                                name="followup_note"
                                value={formData.followup_note}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors resize-none"
                                placeholder="Interested in..."
                            />
                        </div>
                    </div>


                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                        >
                            {loading && <Loader2 size={16} className="animate-spin" />}
                            {loading ? "Saving..." : "Create Lead"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
