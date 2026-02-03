"use client";

import AIOnboarding from "@/components/business/AIOnboarding";
import { useRouter } from "next/navigation";

import { BusinessFormData } from "@/components/business/WizardSteps";

export default function BrandOnboardingPage() {
    const router = useRouter();

    const handleComplete = (data: BusinessFormData) => {
        // Save data and redirect
        localStorage.setItem('business_profile', JSON.stringify(data));
        router.push('/business');
    };

    return <AIOnboarding onComplete={handleComplete} />;
}
