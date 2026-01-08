import Modal from "react-modal";
import { X } from "lucide-react";
import {useNavigate} from "react-router-dom"

export default function OrderItemsModal({ isOpen, onClose, order }) {
  if (!order) return null;
    const productClientUrl = import.meta.env.VITE_PRODUCT_CLIENT_URL;
    const navigate= useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-[#2d2d2d] rounded-2xl shadow-2xl max-w-4xl w-full mx-auto mt-5 outline-none overflow-hidden transition-colors"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ordered Products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Invoice: #{order.invoice}</p>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/80 dark:hover:bg-gray-700 transition-colors group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[70vh] overflow-auto bg-gray-50 dark:bg-[#1e1e1e]">
        {/* Customer Information Section */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#2d2d2d] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Customer Details</h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Name</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{order.user_info?.name} {order.user_info?.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Email</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{order.user_info?.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Contact</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{order.user_info?.contact}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-[#2d2d2d] p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Shipping Address</h3>
                <div className="space-y-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Address</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                            {order.user_info?.address}, {order.user_info?.city}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {order.user_info?.country} - {order.user_info?.zipCode}
                        </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">Method</span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{order.shippingOption || 'STANDARD'}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white dark:bg-[#2d2d2d] border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold text-center">SKU</th>
                <th className="px-6 py-4 font-semibold text-center">Price</th>
                <th className="px-6 py-4 font-semibold text-center">Qty</th>
                <th className="px-6 py-4 font-semibold text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {order.cart?.map((item, index) => (
                <tr key={index} className="bg-white dark:bg-[#2d2d2d] hover:bg-gray-50 dark:hover:bg-[#363636] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                        {item.image ? (
                          <img 
                            src={item.image.startsWith('http') ? item.image : `/uploads/${item.image}`} 
                            alt={item.title} 
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={()=>{navigate(`${productClientUrl}/product/${item.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}`)}}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span
                       className="cursor-pointer font-medium text-gray-900 dark:text-white line-clamp-1"
                       onClick={()=>{navigate(`${productClientUrl}/product/${item.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}`)}}
                       >{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-xs text-gray-600 dark:text-gray-400">
                    {item.sku || '-'}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
                    ₹{item.price?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                    ₹{item.subtotal?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="mt-6 flex flex-col items-end gap-2">
            <div className="w-64 space-y-2 p-4 bg-white dark:bg-[#2d2d2d] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{order.subTotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>₹{order.shippingCost?.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>Discount</span>
                        <span>-₹{order.discount?.toLocaleString()}</span>
                    </div>
                )}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-xl">₹{order.total?.toLocaleString()}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-[#2d2d2d] flex justify-end">
        <button
          onClick={onClose}
          className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500/50"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
