"use client";

import { useState, useEffect } from "react";
import BusinessProfile from "./BusinessProfile";
import BusinessProfileView from "./BusinessProfileView";
import { BusinessFormData } from "./WizardSteps";
import { Loader2 } from "lucide-react";

export default function BusinessManager() {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'create' | 'view' | 'edit'>('create');
    const [profileData, setProfileData] = useState<BusinessFormData | null>(null);

    useEffect(() => {
        // Check for saved data on mount
        const savedData = localStorage.getItem('business_profile');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setProfileData(parsedData);
                setViewMode('view');
            } catch (e) {
                console.error("Failed to parse saved business profile", e);
                localStorage.removeItem('business_profile');
            }
        }
        setIsLoading(false);
    }, []);

    const handleSave = (data: BusinessFormData) => {
        // Save to local storage
        localStorage.setItem('business_profile', JSON.stringify(data));
        setProfileData(data);
        setViewMode('view');
    };

    const handleEdit = () => {
        setViewMode('edit');
    };

    if (isLoading) {
        return (
            <div className="flex h-[calc(100vh-64px)] items-center justify-center bg-gray-50">
                <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
        );
    }

    if (viewMode === 'view' && profileData) {
        return <BusinessProfileView data={profileData} onEdit={handleEdit} />;
    }

    return (
        <BusinessProfile
            initialData={profileData || undefined}
            onComplete={handleSave}
        />
    );
}
