import { useState } from "react";
import { userColumns } from "@columns/UserColumns";
import DataTable from "@/components/DataTable";
import { useUsersList } from "@services/userService";

import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading } = useUsersList({
    page,
    limit,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
      </div>

      <DataTable
        data={data?.users || []}
        columns={userColumns}
        isLoading={isLoading}
        pagination={data?.pagination}
        onPageChange={setPage}
        onRowClick={(user) => navigate(`/details/${user._id}`)}
      />
    </div>
  );
}
