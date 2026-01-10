import React from 'react';

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-purple-100/70 rounded ${className}`} />
);

const OrderHistorySkeleton = ({ rows = 5 }) => {
  return (
    <div className="overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-purple-100 to-purple-50 px-6 py-3">
        <div className="flex items-center">
          <div className="w-[16%]"><Skeleton className="h-4 w-8" /></div>
          <div className="w-[18%] flex justify-center"><Skeleton className="h-4 w-20" /></div>
          <div className="w-[18%] flex justify-center"><Skeleton className="h-4 w-16" /></div>
          <div className="w-[18%] flex justify-center"><Skeleton className="h-4 w-14" /></div>
          <div className="w-[15%] flex justify-end"><Skeleton className="h-4 w-12" /></div>
          <div className="w-[10%] flex justify-center"><Skeleton className="h-4 w-14" /></div>
        </div>
      </div>
      
      {/* Table Rows */}
      <div className="bg-white divide-y divide-purple-50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center px-6 py-4">
            {/* ID */}
            <div className="w-[16%]">
              <Skeleton className="h-4 w-16" />
            </div>
            {/* Order Time */}
            <div className="w-[18%] flex justify-center">
              <Skeleton className="h-4 w-20" />
            </div>
            {/* Method */}
            <div className="w-[18%] flex justify-center">
              <Skeleton className="h-4 w-16" />
            </div>
            {/* Status */}
            <div className="w-[18%] flex justify-center">
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            {/* Total */}
            <div className="w-[15%] flex justify-end">
              <Skeleton className="h-4 w-14" />
            </div>
            {/* Details */}
            <div className="w-[10%] flex justify-center">
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistorySkeleton;
