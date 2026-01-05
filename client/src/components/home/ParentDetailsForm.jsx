import { useState } from "react";
import Input from "@components/form/HomeInput";
import DeliveryDetailsForm from "./DeliveryDetailsForm";

export default function ParentDetailsForm() {
  const [step, setStep] = useState(1);

  if (step === 2) {
    return <DeliveryDetailsForm onBack={() => setStep(1)} />;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-extrabold text-center mb-2">
          Parent <span className="text-yellow-400">Details</span>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Fill in your details to proceed to payment.
        </p>

        <form className="space-y-5">
          <Input label="Parent Name" placeholder="Full name" />
          <Input label="Email Address" type="email" placeholder="example@email.com" />
          <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" />
          <Input label="Child Name" placeholder="Child name" />

          <button
            type="button"
            onClick={() => setStep(2)}
            className="
              w-full mt-6
              bg-gradient-to-r from-yellow-400 to-yellow-500
              text-black font-bold py-4 rounded-full
              shadow-[0_6px_0_#d9a400]
              hover:translate-y-1
              hover:shadow-[0_3px_0_#d9a400]
              transition-all
            "
          >
            Continue to Payment
          </button>
        </form>

      </div>
    </section>
  );
}
