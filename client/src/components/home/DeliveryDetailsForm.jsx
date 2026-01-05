import Input from "./Input";

export default function DeliveryDetailsForm({ onBack }) {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center mb-2">
          Delivery <span className="text-yellow-400">Details</span>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Where should we deliver your items?
        </p>

        <form className="space-y-5">
          <Input label="Full Name" placeholder="Recipient name" />
          <Input label="Mobile Number" type="tel" placeholder="+91 98765 43210" />
          <Input label="Address Line" placeholder="House no, street" />
          <Input label="City" placeholder="City" />
          <Input label="State" placeholder="State" />
          <Input label="Pincode" placeholder="Postal code" />

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onBack}
              className="
                w-1/2 py-4 rounded-full font-bold
                border border-gray-300
                text-gray-700
                hover:bg-gray-100 transition
              "
            >
              Back
            </button>

            <button
              type="submit"
              className="
                w-1/2
                bg-gradient-to-r from-green-400 to-green-500
                text-black font-bold py-4 rounded-full
                shadow-[0_6px_0_#2fa24a]
                hover:translate-y-1
                hover:shadow-[0_3px_0_#2fa24a]
                transition-all
              "
            >
              Confirm & Pay
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
