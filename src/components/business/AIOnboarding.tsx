"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Globe,
    Layout,
    Activity,
    ChevronDown,
    Instagram,
    Facebook,
    Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessFormData } from "./WizardSteps";

type Step = "landing" | "url_input" | "analyzing" | "review" | "photography_source" | "photography_style" | "brand_font";

interface AIOnboardingProps {
    onComplete: (data: BusinessFormData) => void;
}

export default function AIOnboarding({ onComplete }: AIOnboardingProps) {
    const [step, setStep] = useState<Step>("landing");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [selectedSource, setSelectedSource] = useState("Person");
    const [selectedStyle, setSelectedStyle] = useState("Executive Warmth");
    const [selectedFont, setSelectedFont] = useState("Gotham");

    const startAnalysis = () => {
        setStep("analyzing");
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
            }
        }, 150);
    };

    const handleFinalize = () => {
        // Dummy JSON data for now
        const dummyData: BusinessFormData = {
            companyName: "Radiant Eyewear",
            website: url || "radiant-eyewear.com",
            description: "Premium, eco-friendly eyewear designed for modern professionals. We focus on sustainable materials and timeless design.",
            usp: "Eco-friendly materials combined with artisanal craftsmanship.",
            averageDealSize: "150",
            dealSizeTier: "mid",
            targetRegions: ["US", "Europe"],
            gtmChannels: ["Instagram", "Google Ads"],
            teamSize: "10-50",
            monthlyBudget: "5000",
        };
        onComplete(dummyData);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col">
            {step === "landing" && (
                <LandingStep onStart={() => setStep("url_input")} />
            )}
            {step === "url_input" && (
                <UrlInputStep
                    url={url}
                    setUrl={setUrl}
                    onContinue={startAnalysis}
                />
            )}
            {step === "analyzing" && (
                <AnalyzingStep
                    progress={progress}
                    onContinue={() => setStep("photography_source")}
                    onBack={() => setStep("url_input")}
                />
            )}
            {step === "review" && (
                <ReviewStep onContinue={() => setStep("photography_source")} />
            )}
            {step === "photography_source" && (
                <PhotographySourceStep
                    selected={selectedSource}
                    onSelect={setSelectedSource}
                    onBack={() => setStep("review")}
                    onContinue={() => setStep("photography_style")}
                />
            )}
            {step === "photography_style" && (
                <PhotographyStyleStep
                    selected={selectedStyle}
                    onSelect={setSelectedStyle}
                    onBack={() => setStep("photography_source")}
                    onContinue={() => setStep("brand_font")}
                />
            )}
            {step === "brand_font" && (
                <BrandFontStep
                    selected={selectedFont}
                    onSelect={setSelectedFont}
                    onBack={() => setStep("photography_style")}
                    onFinalize={handleFinalize}
                />
            )}
        </div>
    );
}

function LandingStep({ onStart }: { onStart: () => void }) {
    return (
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                    Get extraordinary marketing in <span className="text-blue-600">7 minutes</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                    Simple setup, powerful results. Define your preferences and watch Socio create and publish content daily.
                </p>
                <Button
                    onClick={onStart}
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-6 text-lg h-auto"
                >
                    Get Started
                </Button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
                <FeatureCard
                    title="Content transformation"
                    icon={<Layout className="text-blue-500" />}
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Multi-channel distribution"
                    icon={<Globe className="text-green-500" />}
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Approval workflows"
                    icon={<CheckCircle2 className="text-purple-500" />}
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Data driven actions"
                    icon={<Activity className="text-orange-500" />}
                    className="bg-gray-50"
                />
            </div>
        </div>
    );
}

function FeatureCard({ title, icon, className }: { title: string, icon: React.ReactNode, className?: string }) {
    return (
        <Card className={`border-none shadow-none rounded-2xl overflow-hidden ${className}`}>
            <CardContent className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {icon}
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <div className="h-20 bg-white/50 rounded-lg flex items-center justify-center">
                    {/* Minimal placeholder for card content visual */}
                    <div className="w-1/2 h-2 bg-gray-200 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

function UrlInputStep({ url, setUrl, onContinue }: { url: string, setUrl: (v: string) => void, onContinue: () => void }) {
    return (
        <div className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        Enter your website to get started
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Socio scans your website to understand what makes your brand unique
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                        <input
                            type="text"
                            placeholder="Enter your website..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 px-4 py-4 outline-none text-lg"
                        />
                        <div className="px-4 py-2 border-l border-gray-100 flex items-center gap-2 text-gray-500 cursor-pointer">
                            <span>English (US)</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                    <Button
                        onClick={onContinue}
                        disabled={!url}
                        className="bg-gray-400 hover:bg-gray-500 text-white rounded-xl px-8 h-auto font-semibold"
                    >
                        Build My Profile
                    </Button>
                </div>

                <p className="text-sm text-gray-400">
                    Don&apos;t have a website? <span className="text-gray-900 font-medium cursor-pointer">Set up manually &gt;</span>
                </p>
            </div>

            <div className="flex-1 hidden md:block">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden aspect-[4/3]">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-orange-500" />
                            <div className="h-4 w-32 bg-gray-200 rounded-full" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-8 w-64 bg-gray-900 rounded-lg" />
                            <div className="h-4 w-48 bg-gray-200 rounded-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="h-32 bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                                <div className="h-4 w-16 bg-gray-100 rounded-full" />
                                <div className="h-12 w-full bg-blue-50 rounded-lg" />
                            </div>
                            <div className="h-32 bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                                <div className="h-4 w-16 bg-gray-100 rounded-full" />
                                <div className="h-12 w-full bg-green-50 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyzingStep({ progress, onContinue, onBack }: { progress: number, onContinue: () => void, onBack: () => void }) {
    const isDone = progress >= 100;

    const steps = [
        { label: "Analyzing your website", delay: 0 },
        { label: "Locating business...", delay: 33 },
        { label: "Looking for competitors", delay: 66 },
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 space-y-12 max-w-6xl mx-auto w-full">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Building your Business Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full items-start">
                {/* Timeline */}
                <div className="md:col-span-4 space-y-12 relative pt-8">
                    <div className="absolute left-[11px] top-12 bottom-0 w-[2px] bg-gray-100" />

                    {steps.map((s, i) => {
                        const isDone = progress > s.delay + 33;
                        const isCurrent = progress > s.delay && progress <= s.delay + 33;

                        return (
                            <div key={i} className={`flex items-start gap-6 relative transition-all duration-500 ${isDone || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                                <div className={`w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center ${isDone ? 'bg-green-500 border-green-500 text-white' :
                                    isCurrent ? 'bg-white border-blue-500' : 'bg-white border-gray-300'
                                    }`}>
                                    {isDone && <CheckCircle2 size={14} />}
                                    {isCurrent && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                                </div>
                                <div className="space-y-1">
                                    <p className={`font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>{s.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Preview Area */}
                <div className="md:col-span-4 flex items-center justify-center">
                    <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden relative shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
                        <div className="p-4 space-y-4 relative">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded bg-orange-500" />
                                <div className="h-3 w-20 bg-gray-200 rounded-full" />
                            </div>
                            <div className="w-full h-32 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden p-2">
                                <div className="w-full h-full bg-gray-50 rounded" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-900/10 rounded-full" />
                                <div className="h-4 w-3/4 bg-gray-900/10 rounded-full" />
                            </div>
                        </div>
                        {isScanning(progress) && (
                            <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px] animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Right Info Card */}
                <div className="md:col-span-4">
                    <Card className="rounded-2xl border-gray-100 shadow-xl shadow-gray-200/50">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-2">
                                <h4 className="font-bold text-gray-900 text-lg">Review your Brand Profile</h4>
                                <p className="text-gray-500 text-sm">
                                    We pulled this information from your website. Edit anything that needs adjustment before continuing.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h5 className="font-semibold text-gray-900 text-sm">What to check:</h5>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 size={18} className="text-green-500" />
                                        Core identity is accurate
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 size={18} className="text-green-500" />
                                        Market positioning makes sense
                                    </li>
                                    <li className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle2 size={18} className="text-green-500" />
                                        Competitive advantages are complete
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <h5 className="font-semibold text-gray-900 text-sm">Need to add or edit?</h5>
                                <p className="text-sm text-gray-500">Click any section to edit directly.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="w-full max-w-4xl fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 md:relative md:bg-transparent md:border-none md:p-0 flex justify-between items-center">
                <Button onClick={onBack} variant="ghost" className="text-gray-500">Back</Button>
                <Button
                    onClick={onContinue}
                    disabled={!isDone}
                    className={`rounded-xl px-8 h-12 transition-all ${isDone
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                        : "bg-gray-200 text-gray-400"
                        }`}
                >
                    Looks Good
                </Button>
            </div>
        </div>
    );
}

function isScanning(progress: number) {
    return progress > 0 && progress < 100;
}

function ReviewStep({ onContinue }: { onContinue: () => void }) {
    return (
        <div className="flex-1 flex flex-col p-6 md:p-12 max-w-4xl mx-auto w-full space-y-8">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Profile Built!</h2>
                <p className="text-gray-500">We&apos;ve generated your business profile based on your brand presence.</p>
            </div>

            <Card className="rounded-3xl border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-8 space-y-8">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">Radiant Eyewear</h3>
                                <p className="text-blue-600 font-medium">radiant-eyewear.com</p>
                            </div>
                            <Button variant="outline" className="rounded-full">Edit Profile</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Description</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    Premium, eco-friendly eyewear designed for modern professionals. We focus on sustainable materials and timeless design.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Core Identity</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["Sustainable", "Artisanal", "Professional", "Minimalist"].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Social Channels Detected</h4>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center border border-pink-100">
                                        <Instagram size={20} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Instagram</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                                        <Facebook size={20} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Facebook</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-2xl flex items-center justify-center border border-gray-200">
                                        <Twitter size={20} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium">Twitter</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 flex justify-center border-t border-gray-100">
                        <Button
                            onClick={onContinue}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-12 py-6 text-lg h-auto shadow-xl shadow-blue-600/20"
                        >
                            Continue
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function PhotographySourceStep({ selected, onSelect, onBack, onContinue }: { selected: string, onSelect: (v: string) => void, onBack: () => void, onContinue: () => void }) {
    const sourceImages: Record<string, string> = {
        "Person": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
        "Product": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
        "Place": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"
    };

    return (
        <div className="flex-1 flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="flex-1 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            Professional photography from any source
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Next, we&apos;ll create a professional visual style for all your content
                        </p>
                    </div>

                    <div className="relative group max-w-sm w-full">
                        {/* Placeholder for source image preview */}
                        <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative">
                            <img
                                src={sourceImages[selected]}
                                alt="Source"
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-black/10" />
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-medium uppercase tracking-wider">Source Image</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button className="bg-white hover:bg-gray-100 text-black rounded-xl px-4 py-6 shadow-xl border border-gray-100 flex items-center gap-2">
                                    <Activity size={18} />
                                    Try Your Own
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm font-medium">Examples</span>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            {["Person", "Product", "Place"].map(item => (
                                <button
                                    key={item}
                                    onClick={() => onSelect(item)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selected === item ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 hidden md:block">
                    <div className="aspect-[4/5] bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                        <img
                            src={sourceImages[selected]}
                            alt="Full Preview"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-medium uppercase tracking-wider">Generated Image</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-auto">
                <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0">Back</Button>
                <Button onClick={onContinue} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-12 font-semibold shadow-lg transition-all">Continue</Button>
            </div>
        </div>
    );
}

function PhotographyStyleStep({ selected, onSelect, onBack, onContinue }: { selected: string, onSelect: (v: string) => void, onBack: () => void, onContinue: () => void }) {
    const styles = [
        { name: "Executive Warmth", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop", recommended: true },
        { name: "Amber Glow", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" },
        { name: "Classic Mono", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" },
    ];

    return (
        <div className="flex-1 flex flex-col p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12">
            <div className="space-y-4 text-center md:text-left">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Select a photography style for your brand
                </h2>
                <p className="text-gray-500 text-lg">
                    We&apos;ll apply this style to all generated images to keep your content visually consistent
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                {styles.map(style => (
                    <div
                        key={style.name}
                        onClick={() => onSelect(style.name)}
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${selected === style.name ? 'ring-4 ring-blue-500/20 scale-[1.02]' : 'hover:scale-[1.01]'
                            }`}
                    >
                        <img
                            src={style.img}
                            alt={style.name}
                            className="w-full h-full object-cover aspect-[3/4]"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12">
                            <h3 className="text-white font-bold text-xl">{style.name}</h3>
                        </div>
                        {style.recommended && (
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-wider border border-white/20">Recommended</div>
                        )}
                        {selected === style.name && (
                            <div className="absolute top-4 left-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600">
                                <CheckCircle2 size={16} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0">Back</Button>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-xl px-12 h-12 font-medium border-gray-200">Browse All Styles</Button>
                    <Button onClick={onContinue} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-12 font-semibold shadow-lg">Looks Good</Button>
                </div>
            </div>
        </div>
    );
}

function BrandFontStep({ selected, onSelect, onBack, onFinalize }: { selected: string, onSelect: (v: string) => void, onBack: () => void, onFinalize: () => void }) {
    const fonts = [
        { name: "Gotham", sub: "Droid Serif Pro" },
        { name: "Axiforma", sub: "Neue Haas Unica W1G" },
        { name: "DM Sans", sub: "Neue Haas Unica W1G" },
    ];

    return (
        <div className="flex-1 flex flex-col md:flex-row p-0 md:p-0 max-w-full mx-auto w-full h-full">
            <div className="flex-1 flex flex-col p-6 md:p-12 space-y-12 bg-white md:max-w-xl">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        Select a brand font
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Based on your brand, we recommend:
                    </p>
                </div>

                <div className="space-y-4 flex-1">
                    {fonts.map(font => (
                        <div
                            key={font.name}
                            onClick={() => onSelect(font.name)}
                            className={`p-8 rounded-3xl cursor-pointer border-2 transition-all relative ${selected === font.name ? 'border-gray-900 bg-white' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex flex-col items-center">
                                <p className="text-4xl font-bold tracking-tight text-gray-900 mb-1">{font.name}</p>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">{font.sub}</p>
                            </div>
                            {selected === font.name && (
                                <div className="absolute top-6 left-6 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center text-white">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <Button variant="secondary" className="rounded-xl px-8 bg-gray-100 hover:bg-gray-200 text-gray-700">Browse all fonts</Button>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-8">
                    <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0">Back</Button>
                    <Button onClick={onFinalize} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-12 font-semibold shadow-lg">Looks Good!</Button>
                </div>
            </div>

            <div className="flex-1 bg-black p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />

                {/* Simulated Social Post Preview */}
                <Card className="max-w-md w-full rounded-[2.5rem] border-none shadow-2xl relative z-10 bg-black overflow-hidden aspect-[4/5]">
                    <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-500" />
                            <div className="space-y-0.5">
                                <p className="text-white text-xs font-bold">Logix Infosystems</p>
                                <p className="text-gray-500 text-[10px]">Just now</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                            alt="Post Preview"
                            className="w-full h-full object-cover grayscale-[0.2]"
                        />
                        <div className="absolute bottom-8 left-6 right-6 space-y-2">
                            <div className="bg-blue-600 p-2 rounded-lg inline-block transition-all duration-300">
                                <p className="text-white font-bold leading-tight" style={{ fontFamily: selected === 'Gotham' ? "'Inter', sans-serif" : selected === 'Axiforma' ? 'Arial Black, sans-serif' : 'DM Sans, sans-serif' }}>
                                    How to Master A Stand Out Brand
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-5 h-5 border-2 border-white/80 rounded-full" />
                            <div className="w-5 h-5 border-2 border-white/80 rounded-full" />
                            <div className="w-5 h-5 border-2 border-white/80 rounded-full" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-white text-[10px] font-bold">Logix Infosystems</p>
                            <div className="h-2 w-full bg-white/10 rounded-full" />
                            <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
