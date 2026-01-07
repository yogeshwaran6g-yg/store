import { useState } from "react";
import { paymentColumns } from "@columns/PaymentColumns";
import DataTable from "@/components/DataTable";
import { usePaymentsList } from "@services/paymentService";

import EditPaymentModal from "@components/modal/EditPaymentModal";

export default function Payments() {
  const [page, setPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const limit = 4;

  const { data, isLoading } = usePaymentsList({
    page,
    limit,
  });

  if (isLoading) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading payments...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Payments</h1>
      </div>

      <DataTable
        data={data?.payments || []}
        columns={paymentColumns}
        pagination={data?.pagination}
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
