import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useUpdatePayment } from "../../services/paymentService";

const EditPaymentModal = ({ isOpen, onClose, payment }) => {
  const [status, setStatus] = useState("");
  const updateMutation = useUpdatePayment();

  // Sync status when payment changes
  useEffect(() => {
    if (payment) setStatus(payment.status);
  }, [payment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(
      { id: payment._id, status },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center">
      
      {/* Modal */}
      <div
        className="
          w-full sm:max-w-md
          bg-white dark:bg-[#2d2d2d]
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          transform transition-all
          animate-slideUp sm:animate-fadeIn
        "
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Payment Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <AiOutlineClose className="text-xl text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                w-full px-4 py-3
                border border-gray-300 dark:border-gray-600
                rounded-xl
                bg-gray-50 dark:bg-[#404040]
                text-gray-900 dark:text-white
                focus:ring-2 focus:ring-indigo-500
                outline-none
              "
            >
              <option value="CREATED">CREATED</option>
              <option value="PENDING">PENDING</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
              <option value="ABANDONED">ABANDONED</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 sm:pt-0 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 sm:flex-none
                px-4 py-3
                rounded-xl
                text-gray-600 dark:text-gray-300
                bg-gray-100 dark:bg-gray-700
                hover:opacity-90
                font-medium
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="
                flex-1 sm:flex-none
                px-4 py-3
                rounded-xl
                bg-indigo-600 hover:bg-indigo-700
                text-white
                font-semibold
                shadow-md
                active:scale-95
                transition
                disabled:opacity-50
              "
            >
              {updateMutation.isPending ? "Updating..." : "Update Payment"}
            </button>
          </div>
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditPaymentModal;
