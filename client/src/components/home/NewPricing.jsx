export default function NewPricing() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Pricing Plans</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["Free", "Monthly", "Yearly"].map((plan) => (
            <div key={plan} className="border p-8 rounded-2xl">
              <h3 className="text-xl font-semibold">{plan}</h3>
              <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
