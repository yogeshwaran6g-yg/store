import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser, useBlockUser } from "../services/userService";
import { useUserCart } from "../services/cartService";
import { useCustomerOrders } from "../services/orderService";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";
import { FaBan, FaCheckCircle } from "react-icons/fa";

const DetailDashboard = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("orders");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    // Fetch Data
    const { data: user, isLoading: userLoading } = useUser(id);
    const { data: cart, isLoading: cartLoading } = useUserCart(id);
    const { data: ordersData, isLoading: ordersLoading } = useCustomerOrders({ id, page: 1, limit: 10 });

    const blockUserMutation = useBlockUser();

    const handleBlockToggle = () => {
        if (window.confirm(`Are you sure you want to ${user?.isBlocked ? "unblock" : "block"} this user?`)) {
            blockUserMutation.mutate(id);
        }
    };

    if (userLoading) return <div className="p-8 text-gray-900 dark:text-white">Loading User Details...</div>;
    if (!user) return <div className="p-8 text-gray-900 dark:text-white">User not found</div>;

    const orders = ordersData?.orders || [];
    const cartItems = cart?.items || [];

    return (
        <div className="w-full h-full bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-200 grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 p-6 font-sans transition-colors">
            {/* Sidebar / User Profile */}
            <aside className="bg-white dark:bg-[#2d2d2d] rounded-xl shadow-lg p-6 flex flex-col h-fit border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-md">
                        {user.username?.charAt(0).toUpperCase() || <AiOutlineUser />}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{user.username}</h2>
                    <span className={`px-3 py-1 mt-2 text-xs font-medium rounded-full ${user.isBlocked ? "bg-red-500/20 text-red-600 dark:text-red-400" : "bg-green-500/20 text-green-600 dark:text-green-400"}`}>
                        {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#363636] rounded-lg border border-gray-200 dark:border-gray-600">
                        <AiOutlineMail className="text-xl text-gray-500 dark:text-gray-400" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Email</span>
                            <span className="text-sm truncate w-full text-gray-900 dark:text-gray-200">{user.email}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#363636] rounded-lg border border-gray-200 dark:border-gray-600">
                        <AiOutlinePhone className="text-xl text-gray-500 dark:text-gray-400" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Phone</span>
                            <span className="text-sm text-gray-900 dark:text-gray-200">{user.phone || "N/A"}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#363636] rounded-lg border border-gray-200 dark:border-gray-600">
                        <span className="text-xs text-gray-500 font-mono">ID: {user._id}</span>
                    </div>
                </div>

                <button 
                    onClick={handleBlockToggle}
                    disabled={blockUserMutation.isPending}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        user.isBlocked 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                >
                    {blockUserMutation.isPending ? "Processing..." : (
                        <>
                            {user.isBlocked ? <FaCheckCircle /> : <FaBan />}
                            {user.isBlocked ? "Unblock User" : "Block User"}
                        </>
                    )}
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex flex-col gap-6">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-300 dark:border-gray-700 pb-2">
                    <button 
                        onClick={() => setActiveTab("orders")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-t-lg transition-all ${
                            activeTab === "orders" 
                            ? "bg-white dark:bg-[#2d2d2d] text-gray-900 dark:text-white border-b-2 border-indigo-500" 
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    >
                        <AiOutlineUnorderedList /> Orders
                    </button>
                    <button 
                        onClick={() => setActiveTab("cart")}
                        className={`flex items-center gap-2 px-6 py-2 rounded-t-lg transition-all ${
                            activeTab === "cart" 
                            ? "bg-white dark:bg-[#2d2d2d] text-gray-900 dark:text-white border-b-2 border-indigo-500" 
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                    >
                        <AiOutlineShoppingCart /> Cart ({cartItems.length})
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white dark:bg-[#2d2d2d] rounded-xl p-6 shadow-lg min-h-[500px] border border-gray-200 dark:border-gray-700 transition-colors">
                    {activeTab === "orders" && (
                        <div className="space-y-4">
                            {ordersLoading ? (
                                <p className="text-gray-500 dark:text-gray-400">Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">No orders found</div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order._id} className="bg-gray-50 dark:bg-[#363636] p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors border border-gray-200 dark:border-gray-600">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">Order #{order.invoice || order._id.slice(-6)}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                order.status === 'DELIVERED' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                                                order.status === 'CANCELED' ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                                                'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                                            }`}>
                                                {order.status}
                                            </span>
                                            <p className="mt-1 font-mono text-gray-900 dark:text-gray-200">₹{order.total?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === "cart" && (
                        <div className="grid grid-cols-1 gap-4">
                             {cartLoading ? (
                                <p className="text-gray-500 dark:text-gray-400">Loading cart...</p>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-20 text-gray-500">Cart is empty</div>
                            ) : (
                                cartItems.map((item) => (
                                    <div 
                                        key={item._id || item.product._id} 
                                        className="bg-gray-50 dark:bg-[#363636] p-4 rounded-lg flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors cursor-pointer group border border-gray-200 dark:border-gray-600"
                                        onClick={() => {
                                             // Redirect to product page logic if needed, currently just logging
                                             console.log("Redirect to product:", item.product.slug) 
                                        }}
                                    >
                                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden flex-shrink-0">
                                            {item.product.images && item.product.images[0] ? (
                                                <img src={`${API_BASE_URL}${item.product.images[0]}`} alt={item.product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform"/>
                                            ) : (
                                               <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div> 
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.product.title}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 dark:text-white">₹{item.product.prices?.price?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DetailDashboard;