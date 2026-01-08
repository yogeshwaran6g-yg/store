import { useState } from "react";
import { useParams } from "react-router-dom";
import { paymentColumns } from "@columns/PaymentColumns";
import DataTable from "@/components/DataTable";
import { usePaymentsList, usePaymentByOrderId } from "@services/paymentService";
import EditPaymentModal from "@components/modal/EditPaymentModal";

export default function Payments() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const limit = 4;

  // Conditional hooks
  const { data: listData, isLoading: isListLoading } = usePaymentsList({
    page,
    limit,
  });

  const { data: singleData, isLoading: isSingleLoading } = usePaymentByOrderId(id);

  const isLoading = id ? isSingleLoading : isListLoading;
  
  // Format data for DataTable: single object becomes array of one
  const tableData = id 
    ? (singleData ? [singleData] : []) 
    : (listData?.payments || []);

  const pagination = id ? null : listData?.pagination;

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading payment data...</p>
      </div>
    </div>
  );

  // Show "Not Found" if we have an ID but no data
  if (id && !singleData && !isSingleLoading) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any payment record associated with Order #{id}.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {id 
              ? `Payment for Order #${singleData?.order?.invoice || id}` 
              : "Payments"
            }
        </h1>
      </div>

      <DataTable
        data={tableData}
        columns={paymentColumns}
        pagination={pagination}
        onPageChange={setPage}
        meta={{
            onEdit: (payment) => {
                setSelectedPayment(payment);
                setIsEditModalOpen(true);
            }
        }}
      />
      <EditPaymentModal 
        isOpen={isEditModalOpen}
        onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPayment(null);
        }}
        payment={selectedPayment}
      />
    </div>
  );
}
