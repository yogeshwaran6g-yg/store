import Modal from "react-modal";
import { X } from "lucide-react";

function WebhookModal({ isOpen, onClose, data }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-[#2d2d2d] rounded-xl shadow-xl max-w-3xl w-full mx-auto mt-24 outline-none transition-colors"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Webhook Response
        </h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
        </button>
      </div>

      <div className="p-6 max-h-[60vh] overflow-auto bg-gray-50 dark:bg-[#1e1e1e]">
        {data ? (
          <pre className="text-xs bg-white dark:bg-[#363636] p-4 rounded-lg text-gray-800 dark:text-gray-200 whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No webhook data available.</p>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end bg-white dark:bg-[#2d2d2d]">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}


export default WebhookModal