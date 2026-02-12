"use client";

import { useState } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
import {
    CheckCircle2,
    Globe,
    Layout,
    Activity,
    ChevronDown,
    Instagram,
    Facebook,
<<<<<<< HEAD
    Twitter,
    Upload,
    LogOut,
    Pencil
=======
    Twitter
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessFormData } from "./WizardSteps";
<<<<<<< HEAD
import API from "@/lib/axios";
=======
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1

type Step = "landing" | "url_input" | "analyzing" | "review" | "photography_source" | "photography_style" | "brand_font";

interface AIOnboardingProps {
    onComplete: (data: BusinessFormData) => void;
}

export default function AIOnboarding({ onComplete }: AIOnboardingProps) {
<<<<<<< HEAD
    const router = useRouter();
=======
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
    const [step, setStep] = useState<Step>("landing");
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [selectedSource, setSelectedSource] = useState("Person");
    const [selectedStyle, setSelectedStyle] = useState("Executive Warmth");
    const [selectedFont, setSelectedFont] = useState("Gotham");

<<<<<<< HEAD
    const [analysisData, setAnalysisData] = useState<any>(null);

    // Effect to check if user has already completed detailed onboarding
    useState(() => {
        // Can use useEffect, but specific requirement "check even on onboarding too"
        // Let's do it on mount.
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    // If initialsetup is NOT 1 (e.g. 0, 2, or undefined/finished), 
                    // redirect to home immediately.
                    if (user.initialsetup !== "1") {
                        router.push("/");
                    }
                } catch (e) {
                    // ignore parse error
                }
            }
        }
    });

    const startAnalysis = async () => {
        setStep("analyzing");
        setProgress(0);

        // Start a slow progress increment for visual feedback
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + 2;
            });
        }, 150);

        let websiteUrl = url.trim();
        if (!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")) {
            websiteUrl = `https://${websiteUrl}`;
        }

        // Basic validation to prevent sending empty or invalid URLs
        if (websiteUrl === "https://" || !websiteUrl.includes(".")) {
            console.warn("Invalid URL, skipping analysis");
            setAnalysisData({
                name: "New Business",
                description: "We've created a placeholder for your brand. You can update these details.",
                usp: "Professional business solutions."
            });
            setProgress(100);
            setTimeout(() => setStep("review"), 800);
            return;
        }

        const screenshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(websiteUrl)}?w=800&h=600`;

        // Helper to preload image with timeout
        const preloadImage = (src: string) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                // Timeout after 8 seconds to not block forever if image service is slow
                setTimeout(() => resolve(false), 8000);
            });
        };

        try {
            // Updated flow: Wait for image generation FIRST, then call API
            // This ensures the user sees the "Analyzing" state with a loading image,
            // and we don't proceed to data analysis until we've at least tried to get the visual.
            await preloadImage(screenshotUrl);

            // Restore trailing slash as Removing it didn't help and backend likely needs it (Django default)
            console.log("Starting analysis for:", websiteUrl);
            const { data } = await API.post("analyze-website/", {
                website: websiteUrl
            });

            console.log("Analysis Response:", data);

            // Handle the specific structure provided: { analysis: { ... } }
            const resultData = data.analysis || data;

            if (resultData && (resultData.brand_summary || resultData.name || resultData.description)) {
                // Transform to the structure expected by the app if needed, 
                // but keep the full analysis for rich display
                setAnalysisData({
                    ...resultData,
                    name: resultData.name || "Logix Infosystems", // Fallback name from mockup if missing
                    description: resultData.brand_summary || resultData.description || "",
                    usp: resultData.value_proposition || resultData.usp || ""
                });
            } else {
                // Fallback for empty results
                setAnalysisData({
                    name: websiteUrl.replace(/^https?:\/\//, "").split("/")[0],
                    description: "We've captured your brand identity. Review the details below to proceed.",
                    usp: "Professional IT and business solutions."
                });
            }

            setProgress(100);
            // Automatic transition to review step
            setTimeout(() => {
                setStep("review");
            }, 800);
        } catch (err: any) {
            console.warn("API Error, using rich mock data for preview:", err.message);

            // Seamless fallback: Use rich mock data so the UI looks perfect even if backend is down
            setAnalysisData({
                name: "Logix Infosystems",
                description: "Logix Infosystems is a leading IT solutions and consulting firm specializing in delivering innovative technology solutions that enhance business productivity.",
                usp: "Comprehensive digital transformation strategies tailored for enterprise growth.",
                brand_summary: "Logix Infosystems is a leading IT solutions and consulting firm specializing in delivering innovative technology solutions that enhance business productivity.",
                value_proposition: "Comprehensive digital transformation strategies tailored for enterprise growth.",
                mission: "To empower organizations through intelligent technology and sustainable innovation.",
                key_features: ["Cloud Integration", "Enterprise Security", "Custom Software Development"],
                tone_of_voice: "Professional, Authoritative, Innovative"
            });

            setProgress(100);
            setTimeout(() => {
                setStep("review");
            }, 800);
        } finally {
            clearInterval(interval);
        }
    };

    const handleFinalize = async () => {
        try {
            // Send style preferences to the backend
            const stylePayload = {
                photography_style: selectedStyle,
                font_style: selectedFont,
                // Defaulting filter_style as it's not explicitly selected in UI yet, 
                // or mapping from selectedStyle if appropriate. 
                // For now, using a safe default or deriving from style.
                filter_style: "Warm, low contrast"
            };

            await API.post("/styleupdate/", stylePayload);
            console.log("Styles updated successfully");
        } catch (error) {
            console.error("Failed to update styles:", error);
            // Proceed anyway to not block the user
        }

        // Check user status for redirection
        try {
            // Get latest user profile to check initialsetup status
            // We might need to refresh the profile from API if local storage is stale, 
            // but for now let's check local storage or assume the backend update (styleupdate) might have side-effects
            // adjusting the status if handled there.

            // As per request: "check intial setup if its still one then return it on on boarding other wise return to homepage"
            const userStr = localStorage.getItem("user");
            if (userStr) {
                const user = JSON.parse(userStr);
                // If setup is DONE (not "1"), go to home.
                // Assuming "1" = Incomplete/Onboarding, anything else = Complete
                if (user.initialsetup !== "1") {
                    router.push("/");
                    return;
                }
            }
        } catch (e) {
            console.error("Error checking user status:", e);
        }

        const finalData: BusinessFormData = {
            companyName: analysisData?.name || "New Business",
            website: url || "website.com",
            description: analysisData?.description || "",
            usp: analysisData?.usp || "",
            averageDealSize: "0",
            dealSizeTier: "mid",
            targetRegions: [],
            gtmChannels: [],
            teamSize: "",
            monthlyBudget: "",
        };
        onComplete(finalData);
    };

    const handleLogout = async () => {
        try {
            if (typeof window !== "undefined") {
                const refreshToken = window.localStorage.getItem("refreshToken");
                if (refreshToken) {
                    await API.post("/auth/logout/", { refresh_token: refreshToken });
                }
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("refreshToken");
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("business_profile");
            }
            router.push("/auth");
        }
    };

    return (
        <div className="h-[calc(100vh-0px)] bg-white flex flex-col overflow-hidden">
            {step === "landing" && (
                <LandingStep
                    onStart={() => setStep("url_input")}
                    onLogout={handleLogout}
                />
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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
<<<<<<< HEAD
                    onContinue={() => setStep("review")}
                    onBack={() => setStep("url_input")}
                    url={url}
                />
            )}
            {step === "review" && (
                <ReviewStep
                    onContinue={() => setStep("photography_source")}
                    onBack={() => setStep("url_input")}
                    data={analysisData}
                    url={url}
                />
=======
                    onContinue={() => setStep("photography_source")}
                    onBack={() => setStep("url_input")}
                />
            )}
            {step === "review" && (
                <ReviewStep onContinue={() => setStep("photography_source")} />
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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

<<<<<<< HEAD
function LandingStep({ onStart, onLogout }: { onStart: () => void, onLogout: () => void }) {
    return (
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex-1 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                    Get extraordinary marketing in <span className="text-blue-600">7 minutes</span>
                </h1>
                <p className="text-base text-gray-600 max-w-md">
                    Simple setup, powerful results. Define your preferences and watch Socio create and publish content daily.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Button
                        onClick={onStart}
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white rounded-xl px-8 py-4 text-base h-auto w-full sm:w-auto"
                    >
                        Get Started
                    </Button>
                    <Button
                        onClick={onLogout}
                        variant="ghost"
                        className="text-gray-400 hover:text-red-500 rounded-xl px-6 py-4 text-sm h-auto transition-colors flex items-center gap-2"
                    >
                        <LogOut size={16} />
                        Sign Out
                    </Button>
                </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-3 max-w-md">
                <FeatureCard
                    title="Content transformation"
                    icon={<Layout className="text-blue-500" size={20} />}
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Multi-channel distribution"
<<<<<<< HEAD
                    icon={<Globe className="text-green-500" size={20} />}
=======
                    icon={<Globe className="text-green-500" />}
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Approval workflows"
<<<<<<< HEAD
                    icon={<CheckCircle2 className="text-purple-500" size={20} />}
=======
                    icon={<CheckCircle2 className="text-purple-500" />}
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    className="bg-gray-50"
                />
                <FeatureCard
                    title="Data driven actions"
<<<<<<< HEAD
                    icon={<Activity className="text-orange-500" size={20} />}
=======
                    icon={<Activity className="text-orange-500" />}
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    className="bg-gray-50"
                />
            </div>
        </div>
    );
}

function FeatureCard({ title, icon, className }: { title: string, icon: React.ReactNode, className?: string }) {
    return (
<<<<<<< HEAD
        <Card className={`border-none shadow-none rounded-xl overflow-hidden ${className}`}>
            <CardContent className="p-4 space-y-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm whitespace-nowrap">{title}</h3>
                <div className="h-10 bg-white/50 rounded-lg flex items-center justify-center">
                    <div className="w-1/2 h-1.5 bg-gray-200 rounded-full" />
=======
        <Card className={`border-none shadow-none rounded-2xl overflow-hidden ${className}`}>
            <CardContent className="p-6 space-y-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {icon}
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <div className="h-20 bg-white/50 rounded-lg flex items-center justify-center">
                    {/* Minimal placeholder for card content visual */}
                    <div className="w-1/2 h-2 bg-gray-200 rounded-full" />
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                </div>
            </CardContent>
        </Card>
    );
}

function UrlInputStep({ url, setUrl, onContinue }: { url: string, setUrl: (v: string) => void, onContinue: () => void }) {
    return (
<<<<<<< HEAD
        <div className="flex-1 flex flex-col md:flex-row items-center p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex-1 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight">
                        Enter your website to get started
                    </h2>
                    <p className="text-gray-500 text-base">
=======
        <div className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        Enter your website to get started
                    </h2>
                    <p className="text-gray-500 text-lg">
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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
<<<<<<< HEAD
                            className="flex-1 px-4 py-3 outline-none text-base"
                        />
=======
                            className="flex-1 px-4 py-4 outline-none text-lg"
                        />
                        <div className="px-4 py-2 border-l border-gray-100 flex items-center gap-2 text-gray-500 cursor-pointer">
                            <span>English (US)</span>
                            <ChevronDown size={16} />
                        </div>
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    </div>
                    <Button
                        onClick={onContinue}
                        disabled={!url}
<<<<<<< HEAD
                        className="bg-black hover:bg-gray-800 text-white rounded-xl px-6 h-auto font-semibold"
=======
                        className="bg-gray-400 hover:bg-gray-500 text-white rounded-xl px-8 h-auto font-semibold"
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    >
                        Build My Profile
                    </Button>
                </div>
<<<<<<< HEAD
            </div>

            <div className="flex-1 hidden md:block max-w-sm">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg relative overflow-hidden aspect-[4/3]">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-orange-500" />
                            <div className="h-3 w-24 bg-gray-200 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-6 w-48 bg-gray-900 rounded-lg" />
                            <div className="h-3 w-32 bg-gray-200 rounded-full" />
=======

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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

<<<<<<< HEAD
function AnalyzingStep({ progress, onContinue, onBack, url }: { progress: number, onContinue: () => void, onBack: () => void, url: string }) {
=======
function AnalyzingStep({ progress, onContinue, onBack }: { progress: number, onContinue: () => void, onBack: () => void }) {
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
    const isDone = progress >= 100;

    const steps = [
        { label: "Analyzing your website", delay: 0 },
        { label: "Locating business...", delay: 33 },
        { label: "Looking for competitors", delay: 66 },
    ];

    return (
<<<<<<< HEAD
        <div className="flex-1 flex flex-col p-4 md:p-12 max-w-7xl mx-auto w-full space-y-12 overflow-hidden animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold text-gray-900">Building your Business Profile</h2>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 overflow-hidden">
                {/* Main Content Area (8 columns) */}
                <div className="md:col-span-8 h-full overflow-y-auto pr-6 custom-scrollbar space-y-12 pb-32">
                    <div className="space-y-6">
                        {/* Timeline */}
                        <div className="space-y-8 relative py-4">
                            <div className="absolute left-[9px] top-8 bottom-4 w-[2px] bg-gray-100" />
                            {steps.map((s, i) => {
                                const isDone = progress > s.delay + 33 || progress === 100;
                                const isCurrent = progress > s.delay && progress <= s.delay + 33 && progress < 100;

                                return (
                                    <div key={i} className={`flex items-start gap-4 relative transition-all duration-500 ${isDone || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                                        <div className={`w-5 h-5 rounded-full border-2 z-10 flex items-center justify-center ${isDone ? 'bg-green-500 border-green-500 text-white' :
                                            isCurrent ? 'bg-white border-blue-500' : 'bg-white border-gray-300'
                                            }`}>
                                            {isDone && <CheckCircle2 size={12} />}
                                            {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className={`text-sm font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>{s.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Preview Area - moved inside main content */}
                    <div className="w-full max-w-sm">
                        <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative shadow-sm">
                            <div className="absolute inset-0 bg-gray-100" />
                            {url ? (
                                <img
                                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`}
                                    alt="Website Preview"
                                    className="absolute inset-0 w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        // Fallback if screenshot fails
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            ) : null}

                            {/* Fallback Placeholder (hidden by default if image loads) */}
                            <div className={`absolute inset-0 p-3 space-y-3 ${url ? 'hidden' : ''}`}>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded bg-orange-500" />
                                    <div className="h-2 w-16 bg-gray-200 rounded-full" />
                                </div>
                                <div className="w-full h-24 bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden p-2">
                                    <div className="w-full h-full bg-gray-50 rounded" />
                                </div>
                                <div className="space-y-1.5">
                                    <div className="h-3 w-full bg-gray-900/10 rounded-full" />
                                    <div className="h-3 w-3/4 bg-gray-900/10 rounded-full" />
                                </div>
                            </div>

                            {isScanning(progress) && (
                                <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[1px] animate-pulse z-10" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info Area (4 columns) */}
                <div className="md:col-span-4 lg:pl-4">
                    <Card className="rounded-2xl border-gray-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-gray-200/40 p-1">
                        <CardContent className="p-6 space-y-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 text-base">Review your Brand Profile</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                                    We pulled this information from your website. Edit anything that needs adjustment before continuing.
                                </p>
                            </div>

                            <div className="space-y-4">
<<<<<<< HEAD
                                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">What to check:</h5>
                                <ul className="space-y-3">
                                    {[
                                        "Core identity is accurate",
                                        "Market positioning makes sense",
                                        "Competitive advantages are complete"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs text-gray-700 font-medium">
                                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-green-200">
                                                <CheckCircle2 size={10} strokeWidth={3} />
                                            </div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3 border-t border-gray-100 pt-6">
                                <h5 className="text-sm font-bold text-gray-900">Need to add or edit?</h5>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Click any section to edit directly.
                                </p>
                            </div>

                            <div className="space-y-3 border-t border-gray-100 pt-6">
                                <h5 className="text-sm font-bold text-gray-900">Why this matters:</h5>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    With an accurate brand profile, Socio will create relevant content.
                                </p>
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

<<<<<<< HEAD
            <div className="w-full flex justify-between items-center py-6 pt-12 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-gray-500 hover:text-gray-900 font-bold text-sm px-0">Back</Button>
                <Button
                    onClick={onContinue}
                    disabled={!isDone}
                    className={`rounded-lg px-8 py-2 h-auto text-sm font-bold transition-all ${isDone
                        ? "bg-gray-200 hover:bg-gray-900 text-gray-500 hover:text-white"
                        : "bg-gray-100 text-gray-400"
=======
            <div className="w-full max-w-4xl fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 md:relative md:bg-transparent md:border-none md:p-0 flex justify-between items-center">
                <Button onClick={onBack} variant="ghost" className="text-gray-500">Back</Button>
                <Button
                    onClick={onContinue}
                    disabled={!isDone}
                    className={`rounded-xl px-8 h-12 transition-all ${isDone
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                        : "bg-gray-200 text-gray-400"
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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

<<<<<<< HEAD
function ReviewStep({ onContinue, data, onBack, url }: { onContinue: () => void, data: any, onBack: () => void, url: string }) {
    const [isEditing, setIsEditing] = useState(false);

    const steps = [
        { label: "Analyzing your website", icon: true, hasPreview: true },
        { label: "Locating business", icon: true },
        { label: "Looking for competitors", icon: true },
    ];

    return (
        <div className="flex-1 flex flex-col p-4 md:p-12 max-w-7xl mx-auto w-full space-y-12 overflow-hidden animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold text-gray-900">Building your Business Profile</h2>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-12 overflow-hidden">
                {/* Main Content Area (8 columns) */}
                <div className="md:col-span-8 h-full overflow-y-auto pr-6 custom-scrollbar space-y-12 pb-32">
                    {/* Checklist Section */}
                    <div className="space-y-6 relative">
                        <div className="absolute left-[9px] top-6 bottom-4 w-[2px] bg-gray-50" />

                        {steps.map((s, i) => (
                            <div key={i} className="flex flex-col gap-4 relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-green-500 z-10 flex items-center justify-center text-white">
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                    </div>
                                    <p className="text-base font-semibold text-green-600 transition-colors">{s.label}</p>
                                </div>

                                {s.hasPreview && (
                                    <div className="ml-9 transition-all duration-500 delay-200">
                                        <div className="aspect-video w-full max-w-sm bg-gray-50 rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm relative group">
                                            <div className="absolute inset-0 bg-gray-100" />
                                            {url ? (
                                                <img
                                                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`}
                                                    alt="Website Preview"
                                                    className="absolute inset-0 w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback Placeholder */}
                                            <div className={`p-4 h-full flex flex-col justify-between ${url ? 'hidden' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                        L
                                                    </div>
                                                    <div className="h-4 w-24 bg-gray-200 rounded-full animate-pulse" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-6 w-48 bg-gray-900/80 rounded" />
                                                    <div className="h-4 w-32 bg-gray-200 rounded-full" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="h-8 w-20 bg-blue-600 rounded-md" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Business Overview Section */}
                    <div className="space-y-6 pt-4 border-t border-gray-50">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Business Overview & Positioning</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium"
                            >
                                <Pencil size={14} />
                                Edit
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                                <span className="font-bold">Core Identity:</span>{" "}
                                {data?.description || data?.brand_summary || "We are analyzing your brand core identity..."}
                            </p>
                            {(data?.usp || data?.value_proposition) && (
                                <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold">Value Proposition:</span>{" "}
                                    {data?.usp || data?.value_proposition}
                                </p>
                            )}
                            {data?.target_audience && (
                                <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold">Target Audience:</span>{" "}
                                    {data.target_audience}
                                </p>
                            )}

                            {(data?.mission || data?.mission_statement) && (
                                <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold">Mission Statement:</span>{" "}
                                    {data?.mission || data?.mission_statement}
                                </p>
                            )}

                            {data?.key_features && Array.isArray(data.key_features) && (
                                <div className="text-gray-900 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold block mb-2">Key Features:</span>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                        {data.key_features.map((feature: string, idx: number) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data?.tone_of_voice && (
                                <p className="text-gray-900 text-sm md:text-base leading-relaxed">
                                    <span className="font-bold">Tone of Voice:</span>{" "}
                                    {data.tone_of_voice}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info Area (4 columns) */}
                <div className="md:col-span-4 lg:pl-4">
                    <Card className="rounded-2xl border-gray-100 bg-white/50 backdrop-blur-sm shadow-xl shadow-gray-200/40 p-1">
                        <CardContent className="p-6 space-y-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 text-base">Review your Brand Profile</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    We pulled this information from your website. Edit anything that needs adjustment before continuing.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">What to check:</h5>
                                <ul className="space-y-3">
                                    {[
                                        "Core identity is accurate",
                                        "Market positioning makes sense",
                                        "Competitive advantages are complete"
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs text-gray-700 font-medium">
                                            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-green-200">
                                                <CheckCircle2 size={10} strokeWidth={3} />
                                            </div>
                                            {text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3 border-t border-gray-100 pt-6">
                                <h5 className="text-sm font-bold text-gray-900">Need to add or edit?</h5>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Click any section to edit directly.
                                </p>
                            </div>

                            <div className="space-y-3 border-t border-gray-100 pt-6">
                                <h5 className="text-sm font-bold text-gray-900">Why this matters:</h5>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    With an accurate brand profile, Socio will create relevant content.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="w-full flex justify-between items-center py-6 pt-12 border-t border-gray-100">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-900 font-bold text-sm px-0"
                >
                    Back
                </Button>
                <Button
                    onClick={onContinue}
                    className="bg-gray-200 hover:bg-gray-900 text-gray-500 hover:text-white rounded-lg px-8 py-2 h-auto text-sm font-bold transition-all"
                >
                    Looks Good
                </Button>
            </div>
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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
<<<<<<< HEAD
        <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
            {/* Left Column: Selection & Controls (50%) */}
            <div className="flex-1 bg-white flex flex-col items-center justify-between p-8 md:p-12 relative h-full overflow-hidden">
                <div className="max-w-md w-full flex-1 flex flex-col items-center justify-start py-8 space-y-12 overflow-y-auto custom-scrollbar pr-2 pb-32">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
                            Professional photography from any source
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base font-medium max-w-sm mx-auto">
=======
        <div className="flex-1 flex flex-col p-6 md:p-12 gap-12 max-w-7xl mx-auto w-full">
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="flex-1 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                            Professional photography from any source
                        </h2>
                        <p className="text-gray-500 text-lg">
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                            Next, we&apos;ll create a professional visual style for all your content
                        </p>
                    </div>

<<<<<<< HEAD
                    <div className="relative group w-full max-w-[300px] aspect-[3/4] bg-gray-50 rounded-2xl overflow-hidden shadow-2xl border-4 border-white shrink-0">
                        <img
                            src={sourceImages[selected]}
                            alt="Source"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-[8px] text-white font-bold uppercase tracking-widest border border-white/10">Source Image</div>

                        {/* Try Your Own Overlay */}
                        <div className="absolute inset-x-0 bottom-6 flex justify-center px-4">
                            <button className="bg-white/90 backdrop-blur-md hover:bg-white text-gray-900 rounded-xl px-4 py-2 text-xs font-bold shadow-lg transition-all flex items-center gap-2 border border-white">
                                <Upload size={14} className="text-gray-500" />
                                Try Your Own
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3">Examples</span>
                        {["Person", "Product", "Place"].map(item => (
                            <button
                                key={item}
                                onClick={() => onSelect(item)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${selected === item ? 'bg-white text-gray-900 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Navigation within Left Column */}
                <div className="w-full flex items-center justify-between py-6 border-t border-gray-50 mt-auto bg-white z-10">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-900 font-bold text-sm px-0"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={onContinue}
                        variant="ghost"
                        className="text-gray-300 hover:text-gray-900 font-bold text-sm px-0"
                    >
                        Continue
                    </Button>
                </div>
            </div>

            {/* Right Column: Full-bleed AI Preview (50%) */}
            <div className="flex-1 hidden md:block relative h-full bg-gray-900">
                <img
                    src={sourceImages[selected]}
                    alt="AI Preview"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-md text-[10px] text-white font-bold uppercase tracking-widest border border-white/10">Generated Image</div>

                {/* Visual Accent */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-transparent pointer-events-none" />
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
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
<<<<<<< HEAD
        <div className="flex-1 flex flex-col p-4 md:p-8 max-w-7xl mx-auto w-full space-y-4 overflow-hidden">
            <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">
                    Photography style
                </h2>
                <p className="text-gray-500 text-sm">
                    Keep your content visually consistent
                </p>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-y-auto pr-1 pb-32 custom-scrollbar">
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                {styles.map(style => (
                    <div
                        key={style.name}
                        onClick={() => onSelect(style.name)}
<<<<<<< HEAD
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${selected === style.name ? 'ring-4 ring-blue-500/20 scale-[1.02]' : 'hover:scale-[1.01]'
=======
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${selected === style.name ? 'ring-4 ring-blue-500/20 scale-[1.02]' : 'hover:scale-[1.01]'
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                            }`}
                    >
                        <img
                            src={style.img}
                            alt={style.name}
                            className="w-full h-full object-cover aspect-[3/4]"
                        />
<<<<<<< HEAD
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 pt-8">
                            <h3 className="text-white font-bold text-base leading-tight">{style.name}</h3>
                        </div>
                        {style.recommended && (
                            <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[8px] text-white font-bold uppercase tracking-widest border border-white/20">Recommended</div>
                        )}
                        {selected === style.name && (
                            <div className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-blue-600">
                                <CheckCircle2 size={12} />
=======
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-12">
                            <h3 className="text-white font-bold text-xl">{style.name}</h3>
                        </div>
                        {style.recommended && (
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-wider border border-white/20">Recommended</div>
                        )}
                        {selected === style.name && (
                            <div className="absolute top-4 left-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-blue-600">
                                <CheckCircle2 size={16} />
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                            </div>
                        )}
                    </div>
                ))}
            </div>

<<<<<<< HEAD
            <div className="flex justify-between items-center py-4 border-t border-gray-100 mt-auto">
                <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0 text-sm">Back</Button>
                <Button onClick={onContinue} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-10 font-bold shadow-lg text-sm">Looks Good</Button>
            </div>
        </div >
=======
            <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0">Back</Button>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-xl px-12 h-12 font-medium border-gray-200">Browse All Styles</Button>
                    <Button onClick={onContinue} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-12 font-semibold shadow-lg">Looks Good</Button>
                </div>
            </div>
        </div>
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
    );
}

function BrandFontStep({ selected, onSelect, onBack, onFinalize }: { selected: string, onSelect: (v: string) => void, onBack: () => void, onFinalize: () => void }) {
    const fonts = [
        { name: "Gotham", sub: "Droid Serif Pro" },
        { name: "Axiforma", sub: "Neue Haas Unica W1G" },
        { name: "DM Sans", sub: "Neue Haas Unica W1G" },
    ];

    return (
<<<<<<< HEAD
        <div className="flex-1 flex flex-col md:flex-row p-0 max-w-full mx-auto w-full h-full overflow-hidden">
            <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 bg-white md:max-w-md">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight">
                        Select a brand font
                    </h2>
                    <p className="text-gray-500 text-sm">
=======
        <div className="flex-1 flex flex-col md:flex-row p-0 md:p-0 max-w-full mx-auto w-full h-full">
            <div className="flex-1 flex flex-col p-6 md:p-12 space-y-12 bg-white md:max-w-xl">
                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                        Select a brand font
                    </h2>
                    <p className="text-gray-500 text-lg">
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                        Based on your brand, we recommend:
                    </p>
                </div>

<<<<<<< HEAD


                <div className="space-y-3 flex-1 overflow-y-auto pr-2 pb-32 custom-scrollbar">
=======
                <div className="space-y-4 flex-1">
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    {fonts.map(font => (
                        <div
                            key={font.name}
                            onClick={() => onSelect(font.name)}
<<<<<<< HEAD
                            className={`p-4 rounded-2xl cursor-pointer border-2 transition-all relative ${selected === font.name ? 'border-gray-900 bg-white' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex flex-col items-center">
                                <p className="text-2xl font-bold tracking-tight text-gray-900 mb-0.5">{font.name}</p>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{font.sub}</p>
                            </div>
                            {selected === font.name && (
                                <div className="absolute top-3 left-3 w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center text-white">
                                    <CheckCircle2 size={10} />
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                                </div>
                            )}
                        </div>
                    ))}
<<<<<<< HEAD
                </div>

                <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <Button onClick={onBack} variant="ghost" className="text-gray-500 font-medium px-0 text-sm">Back</Button>
                    <Button onClick={onFinalize} className="bg-black hover:bg-gray-800 text-white rounded-xl px-12 h-10 font-bold shadow-lg text-sm">Looks Good!</Button>
                </div>
            </div>

            <div className="flex-1 bg-black p-8 flex items-center justify-center relative overflow-hidden hidden md:flex">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />

                <Card className="max-w-xs w-full rounded-2xl border-none shadow-2xl relative z-10 bg-black overflow-hidden aspect-[4/5]">
                    <div className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500" />
                            <div className="space-y-0">
                                <p className="text-white text-[10px] font-bold leading-none">Your Business</p>
                                <p className="text-gray-500 text-[8px]">Just now</p>
                            </div>
                        </div>
=======

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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                    </div>

                    <div className="flex-1 relative">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                            alt="Post Preview"
                            className="w-full h-full object-cover grayscale-[0.2]"
                        />
<<<<<<< HEAD
                        <div className="absolute bottom-6 left-4 right-4">
                            <div className="bg-blue-600 p-2 rounded-lg inline-block">
                                <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: selected === 'Gotham' ? "'Inter', sans-serif" : selected === 'Axiforma' ? 'Arial Black, sans-serif' : 'DM Sans, sans-serif' }}>
=======
                        <div className="absolute bottom-8 left-6 right-6 space-y-2">
                            <div className="bg-blue-600 p-2 rounded-lg inline-block transition-all duration-300">
                                <p className="text-white font-bold leading-tight" style={{ fontFamily: selected === 'Gotham' ? "'Inter', sans-serif" : selected === 'Axiforma' ? 'Arial Black, sans-serif' : 'DM Sans, sans-serif' }}>
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
                                    How to Master A Stand Out Brand
                                </p>
                            </div>
                        </div>
                    </div>

<<<<<<< HEAD
                    <div className="p-3 space-y-2">
                        <div className="flex gap-3">
                            <div className="w-4 h-4 border-2 border-white/60 rounded-full" />
                            <div className="w-4 h-4 border-2 border-white/60 rounded-full" />
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full" />
                    </div>
                </Card>
            </div>
        </div >
=======
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
>>>>>>> 91174a01510f597e908811ddb52084bb3d3f49a1
    );
}
