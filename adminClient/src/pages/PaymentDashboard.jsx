import { useState } from "react";
import { paymentColumns } from "@config/Constants";
import DataTable from "@/components/DataTable";
import { usePaymentsList } from "@services/paymentService";

export default function Payments() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = usePaymentsList({
    page,
    limit,
  });

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading payments...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payments</h1>
      </div>

      <DataTable
        data={data?.payments || []}
        columns={paymentColumns}
        pagination={data?.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
