import { BusinessFormData } from "./WizardSteps";
import { Building2, Target, DollarSign, Users, Pencil, Globe, Wallet } from "lucide-react";

interface BusinessProfileViewProps {
    data: any; // Using any to accommodate the rich API structure
    onEdit: () => void;
}

export default function BusinessProfileView({ data, onEdit }: BusinessProfileViewProps) {
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-6">
            <div className="max-w-4xl w-full mx-auto space-y-4 md:space-y-6">

                {/* Header Section */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                            <Building2 size={28} className="md:w-8 md:h-8" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{data.companyName}</h1>
                            {data.website && (
                                <a
                                    href={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 mt-1 truncate"
                                >
                                    <Globe size={14} className="shrink-0" />
                                    <span className="text-sm font-medium truncate">{data.website}</span>
                                </a>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onEdit}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors text-sm md:text-base"
                    >
                        <Pencil size={18} />
                        Update Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Brand Core */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Target size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Brand Identity</h2>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Industry</h3>
                                    <p className="text-gray-800 font-medium">{data.industry || "Not specified"}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Tone of Voice</h3>
                                    <p className="text-gray-800 font-medium">{data.brand_tone || "Not specified"}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Brand Summary</h3>
                                <p className="text-gray-800 leading-relaxed text-sm md:text-base">{data.description}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Value Proposition</h3>
                                <p className="text-gray-800 leading-relaxed text-sm md:text-base">{data.usp}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Strategy */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                <Pencil size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Content Pillars</h2>
                        </div>

                        <ul className="space-y-3">
                            {data.content_pillars && data.content_pillars.length > 0 ? (
                                data.content_pillars.map((pillar: string, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-sm md:text-base text-gray-700">
                                        <span className="text-purple-500 font-bold">•</span>
                                        {pillar}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400 italic">No content pillars defined</li>
                            )}
                        </ul>
                    </div>

                    {/* Audience Insights */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <Users size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Audience Insights</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Target Audience</h3>
                                <p className="text-gray-800 text-sm leading-relaxed">{data.target_audience || "Not specified"}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Pain Points</h3>
                                <ul className="space-y-2">
                                    {data.audience_pain_points && data.audience_pain_points.length > 0 ? (
                                        data.audience_pain_points.map((point: string, idx: number) => (
                                            <li key={idx} className="flex gap-2 text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                                                <span className="text-red-400 min-w-[4px] mt-1">•</span>
                                                {point}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-400 italic">No pain points identified</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
