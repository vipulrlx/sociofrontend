import { BusinessFormData } from "./WizardSteps";
import { Building2, Target, DollarSign, Users, Pencil, Globe, Wallet } from "lucide-react";

interface BusinessProfileViewProps {
    data: BusinessFormData;
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
                    {/* Offer Details */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <Target size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Offer & USP</h2>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Product/Service</h3>
                                <p className="text-gray-800 leading-relaxed text-sm md:text-base">{data.description}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Unique Selling Proposition</h3>
                                <p className="text-gray-800 leading-relaxed text-sm md:text-base">{data.usp}</p>
                            </div>
                        </div>
                    </div>

                    {/* Deal & Budget */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <DollarSign size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Market & Finance</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Avg. Deal Size</h3>
                                <p className="text-lg md:text-xl font-bold text-gray-900 break-all">${Number(data.averageDealSize).toLocaleString()}</p>
                                <span className="inline-block mt-1 px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium capitalize">
                                    {data.dealSizeTier.replace('k', 'K')} Tier
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Budget</h3>
                                <p className="text-lg md:text-xl font-bold text-gray-900">{data.monthlyBudget || "Not specified"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                                <Users size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Targeting & Operations</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Target Regions</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.targetRegions.length > 0 ? (
                                        data.targetRegions.map(region => (
                                            <span key={region} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100">
                                                {region}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic">No regions selected</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">GTM Channels</h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.gtmChannels.length > 0 ? (
                                        data.gtmChannels.map(channel => (
                                            <span key={channel} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100">
                                                {channel}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 italic">No channels selected</span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Team Size</h3>
                                <p className="text-gray-900 font-medium flex items-center gap-2">
                                    <Users size={16} className="text-gray-400" />
                                    {data.teamSize || "Not specified"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
