import Modal from "react-modal";
import { X } from "lucide-react";

function WebhookModal({ isOpen, onClose, data }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-auto mt-24 outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex justify-center items-start z-50"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Webhook Response
        </h2>
        <button onClick={onClose}>
          <X className="w-5 h-5 text-gray-500 hover:text-gray-900" />
        </button>
      </div>

      <div className="p-6 max-h-[60vh] overflow-auto">
        {data ? (
          <pre className="text-xs bg-gray-50 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-sm">No webhook data available.</p>
        )}
      </div>

      <div className="px-6 py-4 border-t flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}


export default WebhookModal