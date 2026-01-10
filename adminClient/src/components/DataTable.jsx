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
    <div className="relative rounded-2xl border border-gray-200/70 dark:border-gray-700 bg-white/80 dark:bg-[#2b2b2b]/80 backdrop-blur-xl shadow-lg transition-all">

      {/* ================= TABLET & DESKTOP ================= */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">

          {/* HEADER */}
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-white"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* BODY */}
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => onRowClick && onRowClick(row.original)}
                className={`
                  transition-all
                  ${idx % 2 === 0 ? "bg-white" : "bg-purple-50/40"}
                  hover:bg-purple-100/60
                  ${onRowClick ? "cursor-pointer" : ""}
                `}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-5 py-4 text-gray-700 whitespace-nowrap"
                  >
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

      {/* ================= MOBILE VIEW (PURPLE × GOLD CARDS) ================= */}
      {/* ================= MOBILE VIEW (FIXED & POLISHED) ================= */}
<div className="sm:hidden px-[-10px] py-6 space-y-6 bg-gradient-to-b from-purple-50 to-amber-50">
  {table.getRowModel().rows.map(row => (
    <div
      key={row.id}
      onClick={() => onRowClick && onRowClick(row.original)}
      className="
        w-full
        rounded-2xl
        bg-white
        shadow-md
        border border-purple-100
        overflow-hidden
        transition-all
        active:scale-[0.99]
      "
    >
      {/* CARD HEADER */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-between">
        <span className="text-sm font-semibold text-white tracking-wide">
          Order Details
        </span>
        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-purple-900">
          SECURE
        </span>
      </div>

      {/* CARD BODY */}
      <div className="px-4 py-4 space-y-3">
        {row.getVisibleCells().map(cell => (
          <div
            key={cell.id}
            className="flex justify-between items-start gap-4"
          >
            <span className="text-xs font-medium text-gray-500">
              {cell.column.columnDef.header}
            </span>

            <span className="text-sm font-semibold text-gray-900 text-right break-all">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </span>
          </div>
        ))}
      </div>

      {/* CARD FOOTER (ACTIONS / HINT) */}
      {/* <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
        <span className="text-xs text-purple-600 font-medium">
          Tap to view full details
        </span>
        <span className="h-2 w-2 rounded-full bg-amber-400" />
      </div> */}
    </div>
  ))}
</div>


      {/* ================= PAGINATION ================= */}
      {pagination && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200/70 bg-white/60 backdrop-blur-md">

          <div className="text-sm text-gray-500">
            Page{" "}
            <span className="font-semibold text-gray-900">
              {pagination.page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {pagination.totalPages}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="rounded-xl p-2.5 bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-xl p-2.5 bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
