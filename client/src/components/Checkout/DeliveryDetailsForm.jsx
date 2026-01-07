import { useRef, useEffect } from "react";
import Input from "@components/form/HomeInput";
import { useCartContext } from "../context/CartContext";
import CartItem from "../cart/CartItem";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaCube, FaBook, FaStar } from "react-icons/fa";

export default function DeliveryDetailsForm({ onBack }) {
    const { cartState, updateQuantity, removeItem } = useCartContext();
    const { items, cartTotal } = cartState;
    const parallaxRef = useRef(null);

    /* 🌌 PARALLAX EFFECT */
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (window.innerWidth < 768) return;

            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 20;

            if (parallaxRef.current) {
                parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen pt-28 relative overflow-hidden bg-gradient-to-br from-purple-700 to-purple-500 px-4">
            {/* GRID BACKGROUND */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* ✨ SPARKLES */}
            {[...Array(15)].map((_, i) => (
                <span
                    key={i}
                    className="sparkle"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}

            {/* 🧩 FLOATING ICONS */}
            <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
                <MdOutlineViewInAr className="absolute top-24 left-10 text-yellow-400 text-4xl animate-float drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]" />
                <FaCube className="absolute top-1/3 right-20 text-white/80 text-3xl animate-float-slow" />
                <FaBook className="absolute bottom-24 left-20 text-yellow-300 text-3xl animate-float" />
                <FaStar className="absolute bottom-1/3 right-24 text-white/70 text-2xl animate-float" />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-6xl mx-auto pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    {/* LEFT — ORDER SUMMARY */}
                    <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-6 h-fit lg:sticky top-32">
                        <h3 className="font-semibold text-lg mb-4 text-gray-800 font-serif">
                            Order Summary
                        </h3>

                        <div className="max-h-80 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQty={updateQuantity}
                                        onRemove={removeItem}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    <IoBagHandle className="text-4xl mx-auto mb-2" />
                                    <p className="text-sm">No items in cart</p>
                                </div>
                            )}
                        </div>

                        {/* TOTAL */}
                        <div className="mt-4 border-t pt-4">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between text-base font-bold mt-2">
                                <span>Total</span>
                                <span className="text-purple-700">
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — DELIVERY FORM */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 hover:scale-[1.01] transition-transform">
                            <h2 className="text-3xl font-bold text-center text-purple-700 font-serif">
                                Delivery Details
                            </h2>

                            <p className="text-center text-gray-500 text-sm mt-2 mb-8">
                                Enter delivery details to complete your order
                            </p>

                            <form className="space-y-5">
                                <Input label="Address Line 1" placeholder="House / Flat / Street" />
                                <Input label="City" placeholder="City" />
                                <Input label="State" placeholder="State" />
                                <Input label="Pincode" placeholder="Pincode" />

                                {/* ACTION BUTTONS */}
                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={onBack}
                                        className="
                      w-1/2 py-3 rounded-full
                      bg-gray-200 text-gray-800 font-bold
                      hover:bg-gray-300
                      transition-all
                    "
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="submit"
                                        className="
                      w-1/2 py-3
                      bg-yellow-400 text-black font-bold
                      rounded-full
                      shadow-[0_6px_0_#c9a200]
                      hover:translate-y-[1px]
                      hover:shadow-[0_4px_0_#c9a200]
                      active:translate-y-[2px]
                      active:shadow-[0_2px_0_#c9a200]
                      transition-all
                    "
                                    >
                                        Pay ${cartTotal.toFixed(2)}
                                    </button>
                                </div>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-6">
                                Secure payment powered by trusted gateways 🔒
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
