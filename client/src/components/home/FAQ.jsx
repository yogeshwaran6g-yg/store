import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "Is this platform safe for kids?",
      a: "Yes! Our platform is designed with child safety in mind, offering a secure, ad-free, and parent-approved learning environment.",
    },
    {
      q: "What age group is supported?",
      a: "Our content is ideal for children aged 3 to 8 years, with activities tailored to different learning stages.",
    },
    {
      q: "Do kids need special devices?",
      a: "No special devices are required. A smartphone or tablet with camera support is enough to enjoy AR learning.",
    },
    {
      q: "Can parents track learning progress?",
      a: "Parents can view activity summaries and see how their child is engaging with different learning areas.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative overflow-hidden py-16 md:py-28">

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-gray-900">
          Frequently Asked{" "}
          <span className="text-yellow-400">
            Questions
          </span>
        </h2>

        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12 md:mb-14 text-sm md:text-base">
          Everything parents need to know before getting started.
        </p>

        {/* FAQ Items */}
        <div className="space-y-6 md:space-y-7">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                layout
                initial={{ borderRadius: 16 }}
                className={`
                  bg-white rounded-2xl
                  border border-purple-100
                  transition-shadow
                  ${isOpen ? "shadow-xl" : "shadow-sm"}
                `}
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 md:px-6 py-5 md:py-6 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-gray-800">
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    className={`
                      flex items-center justify-center
                      w-10 h-10 rounded-full
                      text-xl font-bold
                      transition-colors
                      ${isOpen
                        ? "bg-yellow-400 text-black"
                        : "bg-purple-100 text-purple-600"
                      }
                    `}
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
