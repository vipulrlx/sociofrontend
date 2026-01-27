
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
    Step1Company,
    Step2Offer,
    Step3DealSize,
    Step4Additional,
    BusinessFormData,
} from "./WizardSteps";

interface BusinessProfileProps {
    initialData?: BusinessFormData;
    onComplete?: (data: BusinessFormData) => void;
}

export default function BusinessProfile({ initialData, onComplete }: BusinessProfileProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<BusinessFormData>(initialData || {
        companyName: "",
        website: "",
        description: "",
        usp: "",
        averageDealSize: "",
        dealSizeTier: "",
        targetRegions: [],
        gtmChannels: [],
        teamSize: "",
        monthlyBudget: "",
    });

    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const updateData = (data: Partial<BusinessFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const handleNext = async () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        } else {
            // Handle submission logic here
            setIsSubmitting(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log("Form Submitted:", formData);
            if (onComplete) {
                onComplete(formData);
            }
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-gray-50 p-4 md:p-6">
            <div className="max-w-3xl w-full mx-auto bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col my-auto">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-1.5 ">
                    <div
                        className="bg-blue-600 h-1.5 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Header Info */}
                <div className="px-5 py-4 md:px-8 flex justify-between items-center bg-white border-b border-gray-50">
                    <span className="font-medium text-gray-900 text-sm md:text-base">Progress</span>
                    <span className="text-gray-500 font-medium text-sm md:text-base">{Math.round(progress)}%</span>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col p-4 md:p-6">
                    <div className="flex-1 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                        {currentStep === 1 && <Step1Company formData={formData} updateData={updateData} />}
                        {currentStep === 2 && <Step2Offer formData={formData} updateData={updateData} />}
                        {currentStep === 3 && <Step3DealSize formData={formData} updateData={updateData} />}
                        {currentStep === 4 && <Step4Additional formData={formData} updateData={updateData} />}
                    </div>

                    {/* Footer Navigation */}
                    <div className="w-full flex items-center justify-between mt-6 md:mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || isSubmitting}
                            className={`flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition-colors text-sm md:text-base ${currentStep === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
                                }`}
                        >
                            <ArrowLeft size={18} className="md:w-5 md:h-5" />
                            Previous
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 md:px-8 md:py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin md:w-5 md:h-5" />
                                    <span className="hidden xs:inline">Creating Plan...</span>
                                    <span className="xs:hidden">Creating...</span>
                                </>
                            ) : (
                                <>
                                    {currentStep === totalSteps ? (
                                        <>
                                            <span className="hidden xs:inline">Create My GTM Plan</span>
                                            <span className="xs:hidden">Create Plan</span>
                                        </>
                                    ) : "Next"}
                                    <ArrowRight size={18} className="md:w-5 md:h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
