"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Loader2, ArrowLeft, Mail, Phone, Building2,
    Calendar, CheckSquare, MessageSquare, Plus, Clock, ChevronDown, Link as LinkIcon, Users, Edit3, Reply, CornerUpLeft, MessageCircle, ChevronRight, Activity, FileText
} from "lucide-react";
import { getLeadDetails, Lead, addLeadFollowup, FollowUpPayload } from "@/services/leadsService";

// Mock interfaces for the feed since the API doesn't return them yet
interface FeedItem {
    id: string;
    type: 'note' | 'email' | 'call' | 'status_change' | 'creation';
    content: string;
    author: string;
    timestamp: Date;
    extraData?: any;
}

const timeAgo = (date: Date) => {
    const min = Math.round((new Date().getTime() - date.getTime()) / 60000);
    if (min < 1) return `just now`;
    if (min < 60) return `${min} minutes ago`;
    const hrs = Math.round(min / 60);
    if (hrs < 24) return `${hrs} hours ago`;
    const days = Math.round(hrs / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.round(days / 30);
    return `${months} months ago`;
};

export default function LeadDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const leadId = params.id as string;

    const [lead, setLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Follow up form state
    const [activeTab, setActiveTab] = useState<'Activity' | 'Emails' | 'Calls' | 'Tasks' | 'Notes'>('Activity');

    // Details collapsing state
    const [detailsOpen, setDetailsOpen] = useState(true);
    const [personOpen, setPersonOpen] = useState(true);

    // Mock local feed state
    const [feed, setFeed] = useState<FeedItem[]>([]);

    useEffect(() => {
        if (leadId) {
            fetchLeadDetails();
        }
    }, [leadId]);

    const fetchLeadDetails = async () => {
        setLoading(true);
        try {
            const data = await getLeadDetails(leadId);
            setLead(data);

            const initialFeed: FeedItem[] = [
                {
                    id: '1',
                    type: 'creation',
                    content: `created this lead`,
                    author: 'System Worker',
                    timestamp: new Date(Date.now() - 86400000 * 210) // 7 months ago
                },
                {
                    id: '2',
                    type: 'email',
                    content: `Good morning!`,
                    author: 'Timeless',
                    timestamp: new Date(Date.now() - 86400000 * 210), // 7 months ago
                    extraData: {
                        subject: 'Email from Agent',
                        to: data.email || 'unknown@example.com'
                    }
                }
            ];

            if (data.followup_note) {
                initialFeed.push({
                    id: '3',
                    type: 'note',
                    content: data.followup_note,
                    author: 'System',
                    timestamp: new Date(Date.now() - 86400000 * 5)
                });
            }

            initialFeed.push({
                id: '4',
                type: 'status_change',
                content: `changed Status from Contacted to Nurture`,
                author: 'System',
                timestamp: new Date(Date.now() - 7200000) // 2 hours ago
            });

            // Add a recent mock email
            initialFeed.push({
                id: '5',
                type: 'email',
                content: `Hi ${data.name || 'there'},\n\nGreetings for the day!\n\nThank you for your interest!`,
                author: 'System User',
                timestamp: new Date(Date.now() - 1020000), // 17 minutes ago
                extraData: {
                    subject: `${data.name} (#CRM-LEAD-2023-00023)`,
                    to: data.email || 'unknown@example.com'
                }
            });

            // Feed typically shows newest at top or bottom? The image shows oldest at top (7 months), newest at bottom (17 mins).
            setFeed(initialFeed.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
        } catch (err: any) {
            setError("Failed to load lead details. It might have been deleted.");
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 size={32} className="text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading lead details...</p>
            </div>
        );
    }

    if (error || !lead) {
        return (
            <div className="p-8 max-w-7xl mx-auto">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to Leads
                </button>
                <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl text-center">
                    {error || "Lead not found."}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation Tabs */}
            <div className="border-b border-gray-200 px-6 pt-4 flex gap-6 text-sm">
                {[
                    { id: 'Activity', icon: Activity },
                    { id: 'Emails', icon: Mail },
                    { id: 'Calls', icon: Phone },
                    { id: 'Tasks', icon: CheckSquare },
                    { id: 'Notes', icon: FileText }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`pb-3 flex items-center gap-2 font-medium transition-colors ${activeTab === tab.id
                            ? "text-gray-900 border-b-2 border-gray-900"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <tab.icon size={16} className="text-gray-400" />
                        {tab.id}
                    </button>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row h-[calc(100vh-61px)]">
                {/* LEFT COLUMN: Main Content Area */}
                <div className="flex-1 border-r border-gray-200 flex flex-col relative bg-white">
                    {/* Activity Tab */}
                    {activeTab === 'Activity' && (
                        <div className="p-6 overflow-y-auto pb-32">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-semibold text-gray-900">Activity</h2>
                                <button className="bg-gray-900 hover:bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors">
                                    <Plus size={16} /> New <ChevronDown size={14} className="ml-1 opacity-70" />
                                </button>
                            </div>

                            {/* Timeline Wrapper */}
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute top-4 bottom-0 left-[19px] w-px bg-gray-200"></div>

                                <div className="space-y-8 relative">
                                    {feed.map((item, idx) => {
                                        if (item.type === 'creation') {
                                            return (
                                                <div key={item.id} className="flex gap-4 items-start relative bg-white">
                                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 z-10 shrink-0">
                                                        <Users size={18} className="text-gray-500" />
                                                    </div>
                                                    <div className="flex flex-col pt-2.5 flex-1">
                                                        <div className="text-sm">
                                                            <span className="font-semibold text-gray-900">{item.author}</span> <span className="text-gray-500">{item.content}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-400 pt-2.5 whitespace-nowrap">
                                                        {timeAgo(item.timestamp)}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.type === 'status_change') {
                                            return (
                                                <div key={item.id} className="flex gap-4 items-center relative bg-white pl-[15px]">
                                                    {/* Node dot */}
                                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 z-10 shrink-0"></div>
                                                    <div className="flex items-center justify-between flex-1 py-1">
                                                        <div className="text-sm">
                                                            <span className="font-semibold text-gray-900">{item.author}</span> <span className="text-gray-500">{item.content}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-400">
                                                            {timeAgo(item.timestamp)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.type === 'email') {
                                            return (
                                                <div key={item.id} className="flex gap-4 items-start relative bg-white w-full">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600 z-10 shrink-0">
                                                        {getInitials(item.author)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-end items-center mb-2 text-sm">
                                                            <span className="font-semibold text-gray-900">{item.author}</span> <span className="text-gray-400 font-normal mx-2">·</span> <span className="text-gray-900 font-semibold">{timeAgo(item.timestamp)}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <div>
                                                                    <div className="text-xs text-gray-500 mb-1">{item.extraData?.subject}</div>
                                                                    <div className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-medium">
                                                                        TO: <span className="lowercase normal-case">{item.extraData?.to}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <button className="text-gray-400 hover:text-gray-600"><CornerUpLeft size={16} /></button>
                                                                    <button className="text-gray-400 hover:text-gray-600"><Reply size={16} /></button>
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (item.type === 'note') {
                                            return (
                                                <div key={item.id} className="flex gap-4 items-start relative bg-white w-full">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 z-10 shrink-0">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-end items-center mb-2 text-sm">
                                                            <span className="font-semibold text-gray-900">{item.author}</span> <span className="text-gray-400 font-normal mx-2">·</span> <span className="text-gray-900 font-semibold">{timeAgo(item.timestamp)}</span>
                                                        </div>
                                                        <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                                                            <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            </div>

                            {/* Bottom Sticky Action Bar inside scroll area */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-4">
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                    <CornerUpLeft size={16} /> Reply
                                </button>
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                                    <MessageCircle size={16} /> Comment
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Calls Tab */}
                    {activeTab === 'Calls' && (
                        <div className="flex flex-col h-full">
                            <div className="p-6 pb-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Call Logs</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                            List View <ChevronDown size={14} className="text-gray-500" />
                                        </button>
                                        <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                            <span className="text-lg leading-none pb-1">...</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                            <Activity size={14} />
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg> Filter
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> Sort
                                        </button>
                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg> Columns
                                        </button>
                                        <button className="p-1.5 bg-gray-50 border border-gray-200 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                                            <span className="text-lg leading-none pb-1">...</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50/80 text-gray-500 font-medium sticky top-0 z-10 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 w-10">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            </th>
                                            <th className="px-4 py-3 whitespace-nowrap">From</th>
                                            <th className="px-4 py-3 whitespace-nowrap">To</th>
                                            <th className="px-4 py-3 whitespace-nowrap">Type</th>
                                            <th className="px-4 py-3 whitespace-nowrap">Status</th>
                                            <th className="px-4 py-3 whitespace-nowrap">Duration</th>
                                            <th className="px-4 py-3 whitespace-nowrap">From (number)</th>
                                            <th className="px-4 py-3 whitespace-nowrap">To (number)</th>
                                            <th className="px-4 py-3 whitespace-nowrap">Created On</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { id: 1, from: "Suraj Shetty", fromImg: "S", to: "Ronald Richa...", toImg: "R", type: "Outgoing", status: "Completed", dur: "10m 23s", fNum: "+91 7655553323", tNum: "+1 (480) 555-0103", time: "7 months ago" },
                                            { id: 2, from: "Asif Mulani", fromImg: "A", to: "Savannah Ng...", toImg: "S", type: "Outgoing", status: "Completed", dur: "1m 43s", fNum: "+91 6732745664", tNum: "+1 (629) 555-0129", time: "7 months ago" },
                                            { id: 3, from: "Savannah Ng...", fromImg: "S", to: "Asif Mulani", toImg: "A", type: "Incoming", status: "Completed", dur: "12m 19s", fNum: "+1 (629) 555-0129", tNum: "+91 6732745664", time: "7 months ago" },
                                            { id: 4, from: "Faris Ansari", fromImg: "F", to: "Dianne Russell", toImg: "D", type: "Outgoing", status: "Completed", dur: "14s", fNum: "+91 6553788943", tNum: "+1 (303) 555-0105", time: "7 months ago" },
                                            { id: 5, from: "Kathryn Mur...", fromImg: "K", to: "Ankush Menat", toImg: "A", type: "Incoming", status: "Completed", dur: "36s", fNum: "+1 (225) 555-0118", tNum: "+1 (405) 555-0128", time: "7 months ago" },
                                            { id: 6, from: "Hussain Nag...", fromImg: "H", to: "Mrs Devon L...", toImg: "D", type: "Outgoing", status: "Completed", dur: "5m 32s", fNum: "+91 4562587690", tNum: "+1 (505) 555-0439", time: "7 months ago" },
                                            { id: 7, from: "Kristin Watson", fromImg: "K", to: "Shariq Ansari", toImg: "S", type: "Incoming", status: "Completed", dur: "11s", fNum: "+1 (302) 555-0107", tNum: "+91 7666980882", time: "7 months ago" },
                                            { id: 8, from: "Hussain Nag...", fromImg: "H", to: "Selena Delga...", toImg: "S", type: "Outgoing", status: "Missed Call", dur: "0s", fNum: "+91 4562587690", tNum: "+1 (316) 555-0116", time: "7 months ago", isMissed: true },
                                        ].map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50/50 group">
                                                <td className="px-4 py-3">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 shrink-0">{log.fromImg}</div>
                                                        <span className="font-medium text-gray-900 truncate max-w-[100px]">{log.from}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[10px] font-bold text-green-700 shrink-0">{log.toImg}</div>
                                                        <span className="font-medium text-gray-900 truncate max-w-[100px]">{log.to}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 flex items-center gap-1.5">
                                                    {log.type === 'Outgoing' ? <Phone size={14} className="opacity-60" /> : <Phone size={14} className="opacity-60 rotate-[135deg]" />}
                                                    {log.type}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${log.isMissed ? 'bg-red-50 text-red-700 h border-red-100 border' : 'bg-green-50 text-green-700 border-green-100 border'}`}>
                                                        {log.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600 flex items-center gap-1.5"><Clock size={14} className="opacity-50" /> {log.dur}</td>
                                                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{log.fNum}</td>
                                                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{log.tNum}</td>
                                                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{log.time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Footer */}
                            <div className="border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm text-gray-500 bg-white">
                                <div className="flex items-center bg-gray-50 rounded-md border border-gray-200 text-xs font-medium">
                                    <button className="px-3 py-1.5 hover:bg-gray-100 transition-colors">20</button>
                                    <button className="border-l border-r border-gray-200 px-3 py-1.5 hover:bg-gray-100 transition-colors">50</button>
                                    <button className="bg-white px-3 py-1.5 font-bold text-gray-900 shrink-0">100</button>
                                </div>
                                <div>58 of 58</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Contact Info */}
                {activeTab !== 'Calls' && (
                    <div className="w-full lg:w-[380px] bg-white overflow-y-auto">
                        <div className="p-6 pb-2">
                            <h3 className="text-base font-bold text-gray-900 mb-6">About this Lead</h3>

                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                    {/* Simulating avatar or initials */}
                                    <span className="text-xl font-bold text-purple-700">
                                        {getInitials(lead.name)}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                                        {(lead.name?.split(' ')[0] === 'Mr' || lead.name?.split(' ')[0] === 'Ms') ? lead.name : `Ms ${lead.name}`}
                                    </h2>
                                    <div className="flex items-center gap-2">
                                        <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                            <Phone size={14} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                            <Mail size={14} />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                                            <LinkIcon size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200">
                            {/* Details Accordion */}
                            <div>
                                <button
                                    onClick={() => setDetailsOpen(!detailsOpen)}
                                    className="w-full flex items-center gap-2 p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight size={16} className={`text-gray-400 transition-transform ${detailsOpen ? 'rotate-90' : ''}`} />
                                    Details
                                </button>

                                {detailsOpen && (
                                    <div className="px-6 pb-4 space-y-4">
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Organization</div>
                                            <div className="col-span-2 text-gray-900">{lead.company || "Unknown"}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Website</div>
                                            <div className="col-span-2 text-blue-600 hover:underline cursor-pointer">
                                                {lead.company ? `https://${lead.company.toLowerCase().replace(/\s/g, '')}.com` : "—"}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Industry</div>
                                            <div className="col-span-2 text-gray-900">Others</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Job Title</div>
                                            <div className="col-span-2 text-gray-900">COO</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Source</div>
                                            <div className="col-span-2 text-gray-900">Web</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Lead Owner</div>
                                            <div className="col-span-2 flex items-center gap-2 text-gray-900">
                                                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">SU</div>
                                                System User
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Person Accordion */}
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={() => setPersonOpen(!personOpen)}
                                    className="w-full flex items-center gap-2 p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronRight size={16} className={`text-gray-400 transition-transform ${personOpen ? 'rotate-90' : ''}`} />
                                    Person
                                </button>

                                {personOpen && (
                                    <div className="px-6 pb-4 space-y-4">
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Salutation</div>
                                            <div className="col-span-2 text-gray-900">Ms</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500 flex items-center gap-1">First Name <span className="text-red-500">*</span></div>
                                            <div className="col-span-2 text-gray-900">{lead.name?.split(' ')[0] || "—"}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Last Name</div>
                                            <div className="col-span-2 text-gray-900">{lead.name?.split(' ').slice(1).join(' ') || "—"}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Email</div>
                                            <div className="col-span-2 text-blue-600 truncate" title={lead.email}>{lead.email || "—"}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-sm">
                                            <div className="text-gray-500">Mobile No</div>
                                            <div className="col-span-2 text-gray-900">{lead.phone || "—"}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
