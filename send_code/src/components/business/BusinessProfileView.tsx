import { BusinessFormData } from "./WizardSteps";
import {
    Building2,
    Target,
    Pencil,
    Globe,
    Layout,
    Camera,
    Type,
    Palette,
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Mail,
    Phone,
    User,
    Settings,
    MessageSquare,
    Box,
    Bell,
    Search as SearchIcon,
    ChevronRight,
    LucideIcon
} from "lucide-react";

interface BusinessProfileViewProps {
    data: any; // Using any to accommodate the rich API structure
    onEdit: () => void;
}

export default function BusinessProfileView({ data, onEdit }: BusinessProfileViewProps) {
    const styles = data.styles || {};

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 pb-12">
            {/* Banner Section */}
            <div className="relative h-[280px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-90">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-black/10" />

                {/* Header Overlay */}
                <div className="relative z-10 px-8 pt-6 flex items-center justify-between text-white" />
            </div>

            {/* Profile Card Overlay */}
            <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 -mt-24 relative z-20">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 transition-all hover:shadow-2xl">
                    <div className="flex items-center gap-5 w-full md:w-auto">
                        <div className="relative group">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-4 ring-blue-50 transition-transform duration-300 group-hover:scale-105 bg-gray-50 flex items-center justify-center">
                                <img
                                    src={data.website ? `https://www.google.com/s2/favicons?domain=${data.website.replace(/^https?:\/\//, '').split('/')[0]}&sz=128` : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80"}
                                    alt="Brand Avatar"
                                    className="w-full h-full object-cover p-3"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format&fit=crop&q=80";
                                        e.currentTarget.classList.remove('p-3');
                                    }}
                                />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-none mb-2">
                                {data.companyName}
                            </h1>
                            <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase tracking-wider">
                                    {data.industry || "Brand"}
                                </span>
                                <span className="opacity-40">•</span>
                                <span className="truncate">{data.website?.replace('https://', '')}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        <ActionButton icon={Box} label="App" active />
                        <ActionButton icon={MessageSquare} label="Message" />
                        <ActionButton icon={Settings} label="Settings" onClick={onEdit} />
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Left Column: Style Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Palette size={18} className="text-blue-500" />
                                STYLE SETTINGS
                            </h2>
                            <div className="space-y-6">
                                <StyleItem
                                    icon={Camera}
                                    label="Photography Style"
                                    value={styles.photography_style || "N/A"}
                                    color="text-purple-500"
                                    bg="bg-purple-50"
                                />
                                <StyleItem
                                    icon={Type}
                                    label="Font Style"
                                    value={styles.font_style || "N/A"}
                                    color="text-blue-500"
                                    bg="bg-blue-50"
                                />
                                <StyleItem
                                    icon={Layout}
                                    label="Filter Style"
                                    value={styles.filter_style || "N/A"}
                                    color="text-pink-500"
                                    bg="bg-pink-50"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">APPLICATION</h3>
                            <div className="space-y-4">
                                <ToggleSetting label="Auto-improve photos" defaultChecked />
                                <ToggleSetting label="Suggest content pillars" defaultChecked />
                                <ToggleSetting label="Weekly performance reports" />
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Profile Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full animate-in fade-in scale-in-95 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                <Building2 size={18} className="text-blue-500" />
                                PROFILE INFORMATION
                            </h2>
                            <button onClick={onEdit} className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-500 transition-all">
                                <Pencil size={14} />
                            </button>
                        </div>

                        <div className="flex-grow space-y-8">
                            <div>
                                <p className="text-gray-500 text-sm leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                                    {data.description || "No brand summary available."}
                                </p>
                            </div>

                            <div className="space-y-5 pt-4">
                                <InfoRow label="Full Name" value={data.companyName} />
                                <InfoRow label="Industry" value={data.industry || "Not specified"} />
                                <InfoRow
                                    label="Website"
                                    value={data.website}
                                    isLink
                                />
                                <InfoRow label="Brand Tone" value={data.brand_tone || "Not specified"} />
                                <InfoRow label="Target Audience" value={data.target_audience || "Not specified"} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Social Connection */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Layout size={18} className="text-blue-500" />
                            SOCIAL CONNECTION
                        </h2>

                        <div className="space-y-4">
                            <SocialItem
                                icon={Facebook}
                                name="Facebook Page"
                                handle="@logixinfosys"
                                status="Connected"
                                color="text-blue-600"
                                bg="bg-blue-50"
                            />
                            <SocialItem
                                icon={Linkedin}
                                name="LinkedIn Business"
                                handle="logix-infosystems"
                                status="Connected"
                                color="text-blue-700"
                                bg="bg-blue-50"
                            />
                            <SocialItem
                                icon={Instagram}
                                name="Instagram"
                                handle="@logix_digital"
                                status="Disconnected"
                                color="text-pink-600"
                                bg="bg-pink-50"
                            />
                            <SocialItem
                                icon={Twitter}
                                name="Twitter / X"
                                handle="@logixsystems"
                                status="Connected"
                                color="text-gray-900"
                                bg="bg-gray-50"
                            />
                        </div>

                        <div className="mt-8 p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-200/50">
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">PRO TIP</p>
                            <p className="text-sm font-medium leading-snug">
                                Connecting all social platforms improves AI alignment by 45%.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper Components
function ActionButton({ icon: Icon, label, active, onClick }: { icon: LucideIcon, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                ${active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 hover:shadow-sm shadow-sm'}
            `}
        >
            <Icon size={16} />
            {label}
        </button>
    );
}

function StyleItem({ icon: Icon, label, value, color, bg }: { icon: LucideIcon, label: string, value: string, color: string, bg: string }) {
    return (
        <div className="flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3">
                <div className={`p-2.5 ${bg} ${color} rounded-xl transition-transform group-hover:scale-110`}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold tracking-tight uppercase">{label}</p>
                    <p className="text-sm font-bold text-gray-800 tracking-tight">{value}</p>
                </div>
            </div>
            <ChevronRight size={14} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
        </div>
    );
}

function ToggleSetting({ label, defaultChecked }: { label: string, defaultChecked?: boolean }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 tracking-tight">{label}</span>
            <div className={`w-9 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${defaultChecked ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-3 h-3 bg-white rounded-full transition-all ${defaultChecked ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
        </div>
    );
}

function InfoRow({ label, value, isLink }: { label: string, value: string, isLink?: boolean }) {
    return (
        <div className="group">
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-1 group-hover:text-blue-500 transition-colors">{label}</p>
            {isLink ? (
                <a
                    href={value?.startsWith('http') ? value : `https://${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-extrabold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2 truncate block"
                >
                    {value}
                </a>
            ) : (
                <p className="text-sm font-extrabold text-gray-800 leading-tight">{value}</p>
            )}
        </div>
    );
}

function SocialItem({ icon: Icon, name, handle, status, color, bg }: { icon: LucideIcon, name: string, handle: string, status: string, color: string, bg: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-gray-50 hover:bg-gray-50/50 transition-all group">
            <div className="flex items-center gap-3">
                <div className={`p-2.5 ${bg} ${color} rounded-xl shadow-sm`}>
                    <Icon size={18} />
                </div>
                <div>
                    <h4 className="text-[13px] font-bold text-gray-900 leading-tight">{name}</h4>
                    <p className="text-[11px] text-gray-500 font-medium tracking-tight opacity-70">{handle}</p>
                </div>
            </div>
            <button className={`
                text-[10px] font-bold px-3 py-1 rounded-full border transition-all
                ${status === 'Connected'
                    ? 'border-green-100 text-green-600 bg-green-50'
                    : 'border-blue-100 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white hover:border-blue-600'}
            `}>
                {status === 'Connected' ? 'VIEW' : 'REPLY'}
            </button>
        </div>
    );
}
