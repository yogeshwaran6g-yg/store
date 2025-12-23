import { HiOutlineArrowRight } from "react-icons/hi2";



const ShopByInterest = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Shop by Interest
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Curated collections for every developmental stage
            </p>
          </div>

          <a
            href="#"
            className="hidden sm:flex items-center text-primary font-bold hover:underline gap-1"
          >
            View Guide
          <button className="flex items-center gap-2 text-white hover:text-secondary transition">
  Explore
  <HiOutlineArrowRight size={18} />
</button>

          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-green-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSxv5KursZsl3tmdVfK6FKO6DiyaSZJ4TmbkiHaZ5u7HnaW8PQ9jm_63KAyB24riB5VVRXMY8Kwubh9k2PzFgeTwbNwOtpVUp4V2DWV927FIhtEZ2QmYKY_pWxc_Q-dnZ-8e6OM_w3nAbuZaa2kugHA6WmoY4hmfWxYjyW7GtvsV7BqL1YxOM7_m8Y1V-NeEr0FU0AV2HbuKGNBK1ByLrAPvZRpsU84qFWCzddGRjmKmXvkwpmBmgNDUguQhoNhG4dGayQYoEXBI26"
              alt="Older kids working on science project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </a>

          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-green-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSxv5KursZsl3tmdVfK6FKO6DiyaSZJ4TmbkiHaZ5u7HnaW8PQ9jm_63KAyB24riB5VVRXMY8Kwubh9k2PzFgeTwbNwOtpVUp4V2DWV927FIhtEZ2QmYKY_pWxc_Q-dnZ-8e6OM_w3nAbuZaa2kugHA6WmoY4hmfWxYjyW7GtvsV7BqL1YxOM7_m8Y1V-NeEr0FU0AV2HbuKGNBK1ByLrAPvZRpsU84qFWCzddGRjmKmXvkwpmBmgNDUguQhoNhG4dGayQYoEXBI26"
              alt="Older kids working on science project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </a>

          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-green-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSxv5KursZsl3tmdVfK6FKO6DiyaSZJ4TmbkiHaZ5u7HnaW8PQ9jm_63KAyB24riB5VVRXMY8Kwubh9k2PzFgeTwbNwOtpVUp4V2DWV927FIhtEZ2QmYKY_pWxc_Q-dnZ-8e6OM_w3nAbuZaa2kugHA6WmoY4hmfWxYjyW7GtvsV7BqL1YxOM7_m8Y1V-NeEr0FU0AV2HbuKGNBK1ByLrAPvZRpsU84qFWCzddGRjmKmXvkwpmBmgNDUguQhoNhG4dGayQYoEXBI26"
              alt="Older kids working on science project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </a>

          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-green-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSxv5KursZsl3tmdVfK6FKO6DiyaSZJ4TmbkiHaZ5u7HnaW8PQ9jm_63KAyB24riB5VVRXMY8Kwubh9k2PzFgeTwbNwOtpVUp4V2DWV927FIhtEZ2QmYKY_pWxc_Q-dnZ-8e6OM_w3nAbuZaa2kugHA6WmoY4hmfWxYjyW7GtvsV7BqL1YxOM7_m8Y1V-NeEr0FU0AV2HbuKGNBK1ByLrAPvZRpsU84qFWCzddGRjmKmXvkwpmBmgNDUguQhoNhG4dGayQYoEXBI26"
              alt="Older kids working on science project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </a>

        </div>
      </div>
    </section>
  );
};

export default ShopByInterest;
