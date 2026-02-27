import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col min-w-0 overflow-hidden">
            {/* Header Skeleton */}
            <div className="mb-12 flex-shrink-0">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-10 w-64" />
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {/* Generate 4 skeleton cards */}
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 w-full">
                        <Skeleton className="w-full aspect-square rounded-[1.75rem]" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
        </div>
    );
}
