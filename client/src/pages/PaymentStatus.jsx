import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PaymentService from '../services/PaymentService';
import { useCartContext } from '../components/context/CartContext';
import { notifyError, notifySuccess } from '../utils/toast';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const PaymentStatus = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCartContext();
    const [status, setStatus] = useState('VERIFYING'); // VERIFYING, SUCCESS, FAILED
    const [message, setMessage] = useState('Verifying your payment...');

    useEffect(() => {
        const orderId = searchParams.get('order_id');
        
        if (!orderId) {
            setStatus('FAILED');
            setMessage('Invalid Order ID');
            return;
        }

        const verifyPayment = async () => {
            try {
                // Call backend to verify status
                const data = await PaymentService.verifyPayment(orderId);
                
                if (data && (data.status === 'SUCCESS' || data.paymentStatus === 'PAID')) {
                     clearCart();
                     setStatus('SUCCESS');
                     setMessage('Order placed successfully!');
                     
                     // Optional: Redirect to orders page after few seconds
                     setTimeout(() => {
                         navigate('/user/my-orders');
                     }, 5000);
                } else if (data && (data.status === 'FAILED' || data.status === 'ABANDONED')) {
                     setStatus('FAILED');
                     setMessage('Payment was not successful. Please try again.');
                } else {
                    // Pending or Created but not confirmed
                    // Poll or just show pending? For now showing pending.
                     setStatus('VERIFYING'); // Keep showing verifying or show specific PENDING message
                     setMessage('Payment verification is pending...');
                }

            } catch (error) {
                console.error(error);
                setStatus('FAILED');
                setMessage('Could not verify payment status.');
            }
        };

        verifyPayment();

    }, [searchParams, clearCart, navigate]);

    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center bg-gray-50 px-4">
             <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                
                {status === 'VERIFYING' && (
                    <div className="flex flex-col items-center">
                        <FaSpinner className="text-4xl text-purple-600 animate-spin mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Processing...</h2>
                        <p className="text-gray-500 mt-2">{message}</p>
                    </div>
                )}

                {status === 'SUCCESS' && (
                    <div className="flex flex-col items-center animate-fade-in-up">
                        <FaCheckCircle className="text-6xl text-green-500 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h2>
                        <p className="text-lg text-gray-600 font-medium mb-6">{message}</p>
                        <p className="text-gray-400 text-sm mb-6">Redirecting to your orders...</p>
                        <button 
                            onClick={() => navigate('/user/my-orders')}
                            className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition"
                        >
                            View Orders
                        </button>
                    </div>
                )}

                {status === 'FAILED' && (
                    <div className="flex flex-col items-center animate-fade-in-up">
                        <FaTimesCircle className="text-6xl text-red-500 mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button 
                            onClick={() => navigate('/checkout')}
                            className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition"
                        >
                            Try Again
                        </button>
                    </div>
                )}

             </div>
        </div>
    );
};

export default PaymentStatus;
