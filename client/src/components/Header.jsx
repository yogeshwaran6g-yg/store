import { FaShoppingCart, FaUserCircle, FaBars, FaRocket } from "react-icons/fa";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary dark:bg-primary-dark backdrop-blur-md border-b border-primary-dark dark:border-primary">
      <div className="layout-container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-glow">
              <FaRocket size={22} />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Wonder<span className="text-secondary">Kid</span>
            </h1>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <a className="text-white/90 font-bold hover:text-secondary transition-colors text-sm" href="#">
              Shop by Age
            </a>
            <a className="text-white/90 font-bold hover:text-secondary transition-colors text-sm" href="#">
              Shop by Interest
            </a>
            <a className="text-white/90 font-bold hover:text-secondary transition-colors text-sm" href="#">
              Shop All
            </a>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3 sm:gap-6 flex-1 lg:flex-none justify-end">

            {/* Search Bar */}
            <div className="hidden sm:flex relative w-full max-w-[240px]">
              <input
                type="text"
                placeholder="Search toys..."
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-primary/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 text-white">
              <button className="relative size-10 flex items-center justify-center rounded-xl hover:bg-primary-dark transition-colors">
                <FaShoppingCart size={22} />
                <span className="absolute top-2 right-2 size-2 bg-secondary rounded-full ring-2 ring-primary"></span>
              </button>

              <button className="size-10 flex items-center justify-center rounded-xl hover:bg-primary-dark transition-colors">
                <FaUserCircle size={24} />
              </button>

              <button className="lg:hidden size-10 flex items-center justify-center rounded-xl hover:bg-primary-dark transition-colors">
                <FaBars size={22} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
