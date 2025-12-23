import { FaWhatsapp } from "react-icons/fa";

const CommunitySection = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
              <a
                href="#"
                className="size-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Join our Parent Community
            </h2>

            <p className="text-red-50 text-lg mb-8 font-medium">
              Get exclusive parenting tips, early access to new launches, and
              connect with 50,000+ parents.
            </p>

            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors inline-flex items-center gap-2 shadow-lg">
              <span className="material-symbols-outlined">groups</span>
              Join on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
