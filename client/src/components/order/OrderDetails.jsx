import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderServices from '../../services/OrderServices';
import OrderDetailsSkeleton from '../preloader/OrderDetailsSkeleton';
import { FiArrowLeft, FiPrinter, FiDownload } from 'react-icons/fi';
import { notifyError, notifySuccess } from '../../utils/toast';
import {useCopyToClipboard} from "usehooks-ts"

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState('copy');
    const [,copy] = useCopyToClipboard()
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await OrderServices.getOrderById(id);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        notifyError(err.message ? err.message : 'Failed to fetch order details');
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <OrderDetailsSkeleton />;

  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
      <h2 className="text-2xl font-bold mb-4">Error Loading Order</h2>
      <p>{error}</p>
      <Link to="/user/dashboard" className="mt-4 text-blue-600 hover:underline">Back to Dashboard</Link>
    </div>
  );

  if (!data) return null;

  const {
    _id,
    createdAt,
    status,
    cart,
    user,
    shippingAddress,
    paymentMethod,
    subTotal,
    shippingCost,
    discount,
    total,
  } = data;
  const handleCopy = (id) => {
    copy(id);
    setTooltip('copied');
    setTimeout(() => {
      setTooltip('copy');
    }, 2000);
    notifyError('Order ID copied to clipboard');
  };
  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <Link to="/user/dashboard" className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-3 transition-colors bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-md">
                <FiArrowLeft className="mr-2" /> Back to Orders
                </Link>
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-800">
                    Order 
                    <span
                        className="text-purple-600 cursor-pointer"
                        title={tooltip}
                        onClick={() => handleCopy(_id)}
                    >
                        #{_id?.substring(0, 8).toUpperCase()}</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                    Placed on <span className="font-medium text-gray-700">{new Date(createdAt).toLocaleDateString()}</span> at {new Date(createdAt).toLocaleTimeString()}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                <button 
                onClick={() => window.print()} 
                className="inline-flex items-center px-4 py-2 bg-white border border-purple-200 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50 transition-colors shadow-sm w-full sm:w-auto justify-center"
                >
                <FiPrinter className="mr-2" /> Print Invoice
                </button>
                <div className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide border w-full sm:w-auto text-center
                    ${status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                    status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    status === 'Processing' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                    status === 'Cancel' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                {status}
                </div>
            </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Items */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                <h2 className="font-semibold text-purple-900 text-lg">Order Items</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-purple-50/50 text-xs uppercase font-semibold text-purple-900">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4 text-center">Unit Price</th>
                      <th className="px-6 py-4 text-center">Quantity</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {cart?.map((item, index) => (
                      <tr key={index} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-purple-100">
                              <img 
                                src={item.image || 'https://via.placeholder.com/150'} 
                                alt={item.title} 
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div>
                               <p className="font-medium text-gray-900 line-clamp-2">{item.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center font-medium">₹{item.price}</td>
                        <td className="px-6 py-4 text-center font-medium">{item.quantity}</td>
                        <td className="px-6 py-4 text-right font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Info */}
             <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
                 <h2 className="font-semibold text-purple-900 text-lg mb-4">Payment Info</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                     <p className="text-xs text-purple-600 uppercase font-bold tracking-wider mb-1">Payment Method</p>
                     <p className="font-medium text-gray-900">{paymentMethod}</p>
                   </div>
                   <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                     <p className="text-xs text-purple-600 uppercase font-bold tracking-wider mb-1">Payment Status</p>
                     <p className={`font-medium ${status === 'Delivered' ? 'text-green-600' : 'text-amber-600'}`}>
                        {status === 'Cancel' ? 'Failed' : 'Success'} 
                     </p>
                   </div>
                 </div>
               </div>

          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Order Summary */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl overflow-hidden">
               <div className="px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white">
                 <h2 className="font-semibold text-purple-900 text-lg">Order Summary</h2>
               </div>
               <div className="p-6 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subTotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Cost</span>
                    <span className="font-medium text-gray-900">₹{shippingCost?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="font-medium text-red-500">- ₹{discount?.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-purple-100 my-2 pt-4 flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-purple-600">₹{total?.toFixed(2)}</span>
                  </div>
               </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-purple-200 shadow-xl p-6">
              <h2 className="font-semibold text-purple-900 text-lg mb-4">Shipping Address</h2>
              <div className="text-sm text-gray-600 space-y-3">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-base">{user?.name}</p>
                        <p className="text-gray-600 leading-relaxed mt-1">
                            {shippingAddress?.address},<br/>
                            {shippingAddress?.city}, {shippingAddress?.country}<br/>
                            {shippingAddress?.zipCode}
                        </p>
                    </div>
                 </div>
                
                 <div className="pt-3 border-t border-purple-100 flex flex-col gap-2">
                    <p className="flex items-center gap-2">
                         <span className="w-20 text-xs font-semibold uppercase text-purple-400">Phone:</span> 
                         <span className="font-medium text-gray-700">{user?.phone}</span>
                    </p>
                    <p className="flex items-center gap-2">
                       <span className="w-20 text-xs font-semibold uppercase text-purple-400">Email:</span> 
                       <span className="font-medium text-gray-700">{user?.email}</span>
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
