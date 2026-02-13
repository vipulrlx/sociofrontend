"use client";

import { useState, useEffect } from "react";
import BusinessProfile from "./BusinessProfile";
import BusinessProfileView from "./BusinessProfileView";
import { BusinessFormData } from "./WizardSteps";
import { Loader2 } from "lucide-react";
import API from "@/lib/axios";

export default function BusinessManager() {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'create' | 'view' | 'edit'>('create');
    const [profileData, setProfileData] = useState<BusinessFormData | null>(null);

    useEffect(() => {
        const fetchBrandDetails = async () => {
            try {
                const { data } = await API.post("/getbranddetails/");
                if (data) {
                    // Map API response to BusinessFormData or a superset
                    // The API returns a rich structure:
                    // { brand_id, website, analysis_data: { brand_summary, brand_tone, content_pillars, ... }, styles: { ... } }

                    // We need to pass this rich data to the view. 
                    // For now, I will map it to the existing structure + extra fields.
                    // Note: I will likely need to extend BusinessFormData interface in WizardSteps.tsx
                    // or cast it here.

                    const mappedData: any = {
                        companyName: data.analysis_data?.brand_name || data.website?.replace('https://', '').split('.')[0] || "My Brand",
                        website: data.website || "",
                        description: data.analysis_data?.brand_summary || "",
                        usp: data.analysis_data?.value_proposition || "",
                        // These fields might be missing in the new API response or named differently, 
                        // so providing safe defaults or mapping if available.
                        averageDealSize: "0",
                        dealSizeTier: "mid",
                        targetRegions: [],
                        gtmChannels: [],
                        teamSize: "",
                        monthlyBudget: "",
                        // New rich fields
                        industry: data.industry,
                        brand_tone: data.analysis_data?.brand_tone,
                        content_pillars: data.analysis_data?.content_pillars,
                        audience_pain_points: data.analysis_data?.audience_pain_points,
                        target_audience: data.analysis_data?.target_audience,
                        styles: data.styles
                    };

                    setProfileData(mappedData);
                    setViewMode('view');
                }
            } catch (error) {
                console.error("Failed to fetch brand details", error);
                // Fallback to local storage if API fails, just in case
                const savedData = localStorage.getItem('business_profile');
                if (savedData) {
                    try {
                        setProfileData(JSON.parse(savedData));
                        setViewMode('view');
                    } catch (e) { }
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchBrandDetails();
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
