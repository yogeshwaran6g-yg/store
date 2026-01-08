import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper();

export const userColumns = [
  // User Info (Avatar + Name)
  columnHelper.accessor(row => row.username, {
      id: "user",
      header: "User",
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

  // Email
  columnHelper.accessor("email", {
      header: "Email",
      cell: info => <span className="text-gray-600 dark:text-gray-400">{info.getValue()}</span>,
  }),

  // Role
  columnHelper.accessor("role", {
      header: "Role",
      cell: info => {
          const role = info.getValue();
          const isAdmin = role === 'admin' || role === 'super_admin';
          return (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${isAdmin ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600"} capitalize`}>
                  {role}
              </span>
          );
      }
  }),

  // Verified Status (isEmailVerified)
  columnHelper.accessor("isEmailVerified", {
      header: "Verified",
      cell: info => {
          const isVerified = info.getValue();
          return (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${isVerified ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700"}`}>
                 {isVerified ? "Verified" : "Unverified"}
              </span>
          );
      }
  }),
  
  // Join Date
  columnHelper.accessor(
    row => row.createdAt
      ? new Date(row.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      : "-",
    {
      id: "joined",
      header: "Joined",
      cell: info => <span className="text-gray-600 dark:text-gray-400 text-xs">{info.getValue()}</span>,
    }
  ),
];
