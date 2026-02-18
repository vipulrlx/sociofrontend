import React from 'react';
import { Search, Filter, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const PlannerToolbar: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
            {/* Left side: Search */}
            <div className="flex flex-1 items-center gap-3 px-2">
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search posts (395)..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-200 rounded-xl text-[13px] outline-none transition-all"
                    />
                </div>
            </div>

            {/* Right side: Pagination and Filter */}
            <div className="flex items-center gap-3 px-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-4">
                {/* Simplified Pagination */}
                <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
                    <button className="p-1.5 hover:bg-white hover:shadow-sm text-gray-400 hover:text-gray-700 rounded-lg transition-all disabled:opacity-50">
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center px-3 py-1 min-w-[60px] justify-center">
                        <span className="text-[12px] font-bold text-gray-700 tracking-tight">1</span>
                        <span className="text-[12px] text-gray-300 mx-1.5">/</span>
                        <span className="text-[12px] text-gray-400 font-medium tracking-tight">40</span>
                    </div>

                    <button className="p-1.5 hover:bg-white hover:shadow-sm text-gray-400 hover:text-gray-700 rounded-lg transition-all">
                        <ChevronRight size={16} />
                    </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-[12px] font-semibold transition-all shadow-sm hover:shadow-md">
                    <SlidersHorizontal size={14} />
                    <span>Filters</span>
                </button>
            </div>
        </div>
    );
};

export default PlannerToolbar;
