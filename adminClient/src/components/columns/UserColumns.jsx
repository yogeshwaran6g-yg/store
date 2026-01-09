import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const userColumns = [
  // ID
  columnHelper.accessor("_id", {
      header: "ID",
      cell: info => <span className="text-xs text-gray-400 font-mono" title={info.getValue()}>{info.getValue().substring(0, 6)}...</span>,
  }),

  // Username (with Avatar)
  columnHelper.accessor(row => row.username, {
      id: "username",
      header: "Username",
      cell: info => {
          const name = info.getValue() || "Unknown";
          const initial = name.charAt(0).toUpperCase();
          return (
              <div className="flex items-center gap-3 cursor-pointer" title="View user details">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                      {initial}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {name}</span>
              </div>
          );
      },
  }),

  // Phone
  columnHelper.accessor("phone", {
      header: "Phone",
      cell: info => <span className="text-gray-600 dark:text-gray-300 font-mono text-xs">{info.getValue() || "-"}</span>,
  }),

  // Is Phone Verified
  columnHelper.accessor("isPhoneVerified", {
      header: "Ph. Verified",
      cell: info => {
          const isVerified = info.getValue();
          return (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isVerified ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700"}`}>
                 {isVerified ? "Yes" : "No"}
              </span>
          );
      }
  }),

  // OTP
  columnHelper.accessor("otp", {
      header: "OTP",
      cell: info => <span className="text-gray-500 font-mono text-xs">{info.getValue() || "-"}</span>,
  }),

  // OTP Expires At
  columnHelper.accessor(
    row => row.otpExpires
      ? new Date(row.otpExpires).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      })
      : "-",
    {
      id: "otpExpires",
      header: "OTP Expiry",
      cell: info => <span className="text-gray-500 text-[10px]">{info.getValue()}</span>,
    }
  ),

  // Role
  columnHelper.accessor("role", {
      header: "Role",
      cell: info => {
          const role = info.getValue();
          const isAdmin = role === 'admin' || role === 'super_admin';
          return (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isAdmin ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700" : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"} capitalize`}>
                  {role}
              </span>
          );
      }
  }),

  // Is Blocked
  columnHelper.accessor("isBlocked", {
      header: "Blocked",
      cell: info => {
          const isBlocked = info.getValue();
          return (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isBlocked ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700" : "bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"}`}>
                 {isBlocked ? "Yes" : "No"}
              </span>
          );
      }
  }),

  // Last Login
  columnHelper.accessor(
    row => row.lastLoginAt
      ? new Date(row.lastLoginAt).toLocaleString('en-IN', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      })
      : "Never",
    {
      id: "lastLogin",
      header: "Last Login",
      cell: info => <span className="text-gray-500 text-[10px]">{info.getValue()}</span>,
    }
  ),
];
