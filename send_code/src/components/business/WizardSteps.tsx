import { Building2, Target, DollarSign, Users } from "lucide-react";

// --- Types ---
export interface BusinessFormData {
    companyName: string;
    website: string;
    description: string;
    usp: string;
    averageDealSize: string;
    dealSizeTier: string;
    targetRegions: string[];
    gtmChannels: string[];
    teamSize: string;
    monthlyBudget: string;
}

interface StepProps {
    formData: BusinessFormData;
    updateData: (data: Partial<BusinessFormData>) => void;
}

// --- Step 1: Company Info ---
export function Step1Company({ formData, updateData }: StepProps) {
    return (
        <div className="flex flex-col items-center max-w-xl mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Building2 size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your company</h2>
            <p className="text-gray-500 mb-8">We'll use this information to create your personalized GTM strategy</p>

            <div className="w-full space-y-6 text-left">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="e.g. Acme Corp"
                        value={formData.companyName}
                        onChange={(e) => updateData({ companyName: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website *</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="e.g. acme.com"
                        value={formData.website}
                        onChange={(e) => updateData({ website: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

// --- Step 2: Offer Details ---
export function Step2Offer({ formData, updateData }: StepProps) {
    return (
        <div className="flex flex-col items-center max-w-xl mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <Target size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you offer?</h2>
            <p className="text-gray-500 mb-8">Help us understand your product and what makes it unique</p>

            <div className="w-full space-y-6 text-left">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product/Service Description *</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none min-h-[100px]"
                        placeholder="Describe what you sell..."
                        value={formData.description}
                        onChange={(e) => updateData({ description: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unique Selling Proposition (USP) *</label>
                    <textarea
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none min-h-[80px]"
                        placeholder="What makes your offer unique?"
                        value={formData.usp}
                        onChange={(e) => updateData({ usp: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );
}

// --- Step 3: Deal Size ---
export function Step3DealSize({ formData, updateData }: StepProps) {
    const tiers = [
        { label: "$5K", sub: "Small deals", val: "5k" },
        { label: "$25K", sub: "Mid-market", val: "25k" },
        { label: "$100K", sub: "Enterprise", val: "100k" },
        { label: "$500K+", sub: "Large enterprise", val: "500k" },
    ];

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <DollarSign size={48} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">What's your deal size?</h2>
            <p className="text-gray-500 mb-8">This helps us calculate revenue projections and GTM strategies</p>

            <div className="w-full text-left mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Deal Size / Ticket Size *</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        placeholder="5000"
                        value={formData.averageDealSize}
                        onChange={(e) => updateData({ averageDealSize: e.target.value })}
                    />
                </div>
                <p className="text-xs text-gray-400 mt-2">Enter your average contract value or typical deal size</p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {tiers.map((tier) => (
                    <button
                        key={tier.val}
                        onClick={() => updateData({ dealSizeTier: tier.val })}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${formData.dealSizeTier === tier.val
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-600"
                            }`}
                    >
                        <span className="font-bold text-lg">{tier.label}</span>
                        <span className="text-xs opacity-70">{tier.sub}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

// --- Step 4: Additional Details ---
export function Step4Additional({ formData, updateData }: StepProps) {
    const regions = ["North America", "Europe", "MENA", "Asia Pacific", "Latin America", "Global"];
    const channels = ["Direct Sales", "Inbound Marketing", "Outbound Sales", "Partner Channel", "Content Marketing", "Paid Advertising"];

    const toggleSelection = (key: 'targetRegions' | 'gtmChannels', value: string) => {
        const current = formData[key];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];
        updateData({ [key]: updated });
    };

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Users size={48} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Additional details</h2>
            <p className="text-gray-500 mb-8">These optional details help us create more accurate recommendations</p>

            <div className="w-full text-left space-y-8">
                {/* Regions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Target Regions (Optional)</label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                        {regions.map((region) => (
                            <label key={region} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.targetRegions.includes(region)}
                                    onChange={() => toggleSelection('targetRegions', region)}
                                />
                                <span className="text-gray-600 text-sm group-hover:text-gray-900">{region}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* GTM Channels */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Existing GTM Channels (Optional)</label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                        {channels.map((channel) => (
                            <label key={channel} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.gtmChannels.includes(channel)}
                                    onChange={() => toggleSelection('gtmChannels', channel)}
                                />
                                <span className="text-gray-600 text-sm group-hover:text-gray-900">{channel}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Selects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Size (Optional)</label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                            value={formData.teamSize}
                            onChange={(e) => updateData({ teamSize: e.target.value })}
                        >
                            <option value="">Select team size</option>
                            <option value="1-10">1-10</option>
                            <option value="11-50">11-50</option>
                            <option value="51-200">51-200</option>
                            <option value="200+">200+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly GTM Budget (Optional)</label>
                        <select
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500"
                            value={formData.monthlyBudget}
                            onChange={(e) => updateData({ monthlyBudget: e.target.value })}
                        >
                            <option value="">Select budget range</option>
                            <option value="<1k">&lt;$1k</option>
                            <option value="1k-5k">$1k-$5k</option>
                            <option value="5k-20k">$5k-$20k</option>
                            <option value="20k+">$20k+</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
