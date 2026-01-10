import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-purple-100/70 rounded ${className}`} />
);

const OrderDetailsSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        {/* Header Section Skeleton */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-3 w-full md:w-auto">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Items Skeleton */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2">
                    <Skeleton className="h-16 w-16 rounded-md flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Info Skeleton */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Order Summary Skeleton */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
                <div className="border-t border-purple-100 pt-4 flex justify-between">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>

            {/* Shipping Address Skeleton */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="pt-3 border-t border-purple-100 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
