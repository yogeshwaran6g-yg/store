import {
  HiOutlineRocketLaunch,
  HiOutlineCamera,
  HiOutlineGlobeAlt,
  HiOutlinePlay,
} from "react-icons/hi2";


const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <HiOutlineRocketLaunch size={18} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                WonderKid
              </h2>
            </div>

            <p className="text-white text-sm leading-relaxed mb-6 max-w-sm">
              We are on a mission to make screen time meaningful and playtime
              educational. Our toys blend the best of physical and digital
              worlds.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="#"
                className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
              >
                <HiOutlineCamera size={18} />
              </a>

              <a
                href="#"
                className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
              >
                <HiOutlineGlobeAlt size={18} />
              </a>

              <a
                href="#"
                className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors"
              >
                <HiOutlinePlay size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-4 text-sm text-white dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Shop by Age</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shop by Interest</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-white dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns &amp; Refunds</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-white dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Schools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2023 WonderKid Inc. All rights reserved.
          </p>

          <div className="flex gap-6">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASXBarvE9xFkx4bohDQmlBj1SE7R4HXMtfjOh-IW8W5C7stbfBjjVjaMaLKChRJRim-TUwKkDjJUzYHoN3v_ew7WvotOFXaW0jn0Eb55mKmX7ZYz6oVmSHejmtr3JxcuTSpSCr7B6gSGQpDn2A1AkSsxmMx7bJyr1AsUu8h9o0YA6vniTDDU035KVknDRzUw4svqY3TepTnQum9yYkaByemm463lin_GSOr8LxQHjzWYhea8BPNxgA8XnxiOBdhJt227d5BT8inVSH"
              alt="Stripe payment logo"
              className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all"
            />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLd2VuSrGVn4FWKscL5iphppKOEFNpVGJCOKcvVrnx25Unu-Mp-9dpTmizPgeu-9bWE26VRQkpZYJicgGs6TAWfRbH0M2kbPCxBfmOmKK17-nEcEMAx92AX6Hiy5_SWyqBGGXmv4FvzEG_6AxFhUrtp-DLH6yy4GeQdZY5YxeJP7_T6CiaMWtdE7ghtyaD-Yj4gLQjQjn3m9K0sH_ocAUv3jhBoP-WxvW_9NwreD2VIYiEZxJ8e9SIdTvQ2a1TSQFhMmWGmT5VKbun"
              alt="Paypal payment logo"
              className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
