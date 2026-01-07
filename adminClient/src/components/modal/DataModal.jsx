import Modal from "react-modal";

export default function DataModal({
  isOpen,
  onClose,
  title,
  data,
  isJson = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-2xl max-w-3xl w-full mx-auto mt-20 outline-none overflow-hidden transition-colors"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/80 dark:hover:bg-gray-700 transition-colors group"
          aria-label="Close modal"
        >
          <svg 
            className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[65vh] overflow-auto bg-gray-50 dark:bg-[#1e1e1e]">
        {data ? (
          isJson ? (
            <div className="relative">
              <div className="absolute top-2 right-2 text-xs font-mono text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                JSON
              </div>
              <pre className="text-sm bg-white dark:bg-[#363636] p-5 rounded-xl text-gray-800 dark:text-gray-200 whitespace-pre-wrap shadow-sm border border-gray-200 dark:border-gray-700 font-mono leading-relaxed">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#363636] p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-800 dark:text-gray-200 break-words leading-relaxed">{data}</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No data available</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#2d2d2d] flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}