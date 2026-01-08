import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useUpdatePayment } from "../../services/paymentService";

const EditPaymentModal = ({ isOpen, onClose, payment }) => {
  const [status, setStatus] = useState(payment?.status || "");
  const updateMutation = useUpdatePayment();

  // Effect to sync status when modal opens
  useState(() => {
      if(payment) setStatus(payment.status)
  }, [payment])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(
      { id: payment._id, status },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-[#363636]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Edit Payment Status
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <AiOutlineClose className="text-gray-500 dark:text-gray-400 text-xl" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Status
             </label>
             <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-[#404040] text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
             >
                <option value="PENDING">PENDING</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="FAILED">FAILED</option>
                <option value="ABANDONED">ABANDONED</option>
             </select>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all transform active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateMutation.isPending ? "Updating..." : "Update Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentModal;
