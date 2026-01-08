import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({
  data,
  columns,
  pagination,
  onPageChange,
  onRowClick,
  meta,
}) {
  const table = useReactTable({
    data,
    columns,    
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    meta, 
  });

  return (
    <div className="bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50/50 dark:bg-[#363636] border-b border-gray-100 dark:border-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-4 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                className={`hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick && onRowClick(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-4 text-gray-900 dark:text-gray-200">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-[#363636]/30">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page <span className="font-medium text-gray-900 dark:text-white">{pagination.page}</span> of{" "}
            <span className="font-medium text-gray-900 dark:text-white">{pagination.totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-600 dark:text-gray-300"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-gray-600 dark:text-gray-300"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
