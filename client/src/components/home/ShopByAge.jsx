import { HiOutlineArrowRight } from "react-icons/hi2";

const ShopByAge = () => {
  return (
    <section className="py-12 bg-white dark:bg-surface-dark/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Shop by Age
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

          {/* Age Card 1 */}
          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-orange-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAIyYdXNaB0zeXx2KE8dNrF2XkQ_aQo5wmi2wz39ODkxjcYYOMktu6RD8NleFGjYQlESPu71wEjBEWQ5Ky846LpiS2oOC9QOjMRNXkJwPcEUdZWpHo35wFGI5TFVFRo4DvenI5kTrlWcHmCJg_yMw26vxiiwyraHf9L1eyvTKczJOXJKaorytvQ9fGYefJ3PbqhDIkPRvbckzRoF6m0sVvfSQQMQrGdB3fcKL7D01OpO1uB68-2ZKdVYxzcnQ451tC0gmxfNN35pMq"
              alt="Toddler girl playing with blocks"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
              <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md w-fit mb-2">
                Preschool
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                4-6 Years
              </h4>
            </div>
          </a>

          {/* Age Card 2 */}
          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-blue-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQOvk61vc86uAaU5SOb9M1tWe_axmZdSgpUD_lSCP-MPfYQwlmtb-2F6mYo1uxhzH1MI4FOfec8gBSw_17sqg38ojYIMdb3NUdoE7FYrUxGsvzf1Btd1z1zfUu8jtHHxQxHX4gmuCkMBUujc1qiVDS25lpI4ZrumZCrLgz3Q771EGFsz1Bu0ZIdQOvXJnDRbDsnWam8JB7fBOzhPEbTG0qTtG6SAulIxrmg0aS0GiFuW9s4okw_s-7Ra4n36QcIYiRViL-h1OYE-4p"
              alt="Young boy drawing with colors"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
              <div className="bg-primary-dark text-white text-xs font-bold px-2 py-1 rounded-md w-fit mb-2">
                Early Grade
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                6-8 Years
              </h4>
            </div>
          </a>

          {/* Age Card 3 */}
          <a
            href="#"
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-purple-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhcbgDMPZLgAPvAuxx243FG2BiV3Pm6FPmyqhGgEEf0Hoz0wNG9rVsT2BwZ5T1beIsSs4R58iTuTrpHhZuj0hbi56nnHzCax4tBTfw7Qfg3NqiLJZiKDCSrPVbeAYWn10DHZjraq29Mlo_0Dd-c0tK4viZVYOo0UadWBRoAsAEoDA2Is8Z8YhpiCKH3yLHlsEaSK0L0hw_CYh5TT_jPnW8ShQN13wAt-hRZN5nzdMdixqpgIp8Xhh5h3ZFr0uv_7uI-xI5j65zMZdA"
              alt="Girl building a robot toy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
              <div className="bg-accent-purple text-white text-xs font-bold px-2 py-1 rounded-md w-fit mb-2">
                Middle Grade
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                8-10 Years
              </h4>
            </div>
          </a>

          {/* Age Card 4 */}
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
            <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-20">
              <div className="bg-accent-green text-white text-xs font-bold px-2 py-1 rounded-md w-fit mb-2">
                Pre-Teen
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                10+ Years
              </h4>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ShopByAge;
