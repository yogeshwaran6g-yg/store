// import { useEffect, useState } from "react";

// export default function NewNavbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const onScroll = () => {
//       const currentScrollY = window.scrollY;

//       // shadow / rounded logic
//       setScrolled(currentScrollY > 20);

//       // REQUIRED behavior
//       if (currentScrollY < 10) {
//         setVisible(true); // always visible at top
//       } else if (currentScrollY < lastScrollY) {
//         setVisible(false); // scrolling UP → hide
//       } else {
//         setVisible(true); // scrolling DOWN → show
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`
//         fixed left-1/2 -translate-x-1/2 z-50
//         transition-all duration-500 ease-in-out
//         ${visible ? "translate-y-0" : "-translate-y-40"}
//         ${scrolled ? "top-4 w-[96%]" : "top-0 w-full"}
//       `}
//     >
//       {/* NAVBAR */}
//       <nav
//         className={`
//           flex items-center justify-between
//           px-8 py-4
//           bg-yellow-100
//           transition-all duration-500
//           ${
//             scrolled
//               ? "rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
//               : "rounded-none"
//           }
//         `}
//       >
//         {/* LOGO */}
//         <div className="text-2xl font-extrabold tracking-wide">
//           <span className="text-purple-600">AR</span>
//           <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
//             Book
//           </span>
//         </div>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex items-center gap-10 font-bold text-black">
//           {["Home", "Programs", "About", "Contact"].map((item) => (
//             <li
//               key={item}
//               className="relative cursor-pointer hover:text-yellow-400 transition"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>

//         {/* CTA BUTTON */}
//         <button
//           className="
//             hidden md:block
//             bg-gradient-to-r from-yellow-400 to-yellow-500
//             text-black font-bold
//             px-7 py-3 rounded-full
//             shadow-[0_6px_0_#c9a200]
//             hover:translate-y-[1px]
//             hover:shadow-[0_4px_0_#c9a200]
//             active:translate-y-[2px]
//             active:shadow-[0_2px_0_#c9a200]
//             transition-all
//           "
//         >
//           Enroll Now
//         </button>

//         {/* MOBILE ICON */}
//         <button
//           className="md:hidden text-3xl text-yellow-400"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       <div
//         className={`
//           md:hidden overflow-hidden transition-all duration-300
//           ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
//           bg-black border-2 border-yellow-400
//           ${scrolled ? "rounded-3xl mt-3" : "rounded-none"}
//         `}
//       >
//         <ul className="flex flex-col gap-6 px-6 py-6 font-medium text-white">
//           {["Home", "Programs", "About", "Contact"].map((item) => (
//             <li
//               key={item}
//               className="hover:text-yellow-400 transition"
//             >
//               {item}
//             </li>
//           ))}

//           <button
//             className="
//               bg-gradient-to-r from-yellow-400 to-yellow-500
//               text-black font-bold
//               py-3 rounded-full
//               shadow-[0_6px_0_#c9a200]
//               transition-all
//             "
//           >
//             Enroll Now
//           </button>
//         </ul>
//       </div>
//     </header>
//   );
// }



// import { useEffect, useState } from "react";

// export default function NewNavbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [visible, setVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const onScroll = () => {
//       const currentScrollY = window.scrollY;

//       setScrolled(currentScrollY > 20);

//       // REQUIRED BEHAVIOR
//       if (currentScrollY < 10) {
//         setVisible(true);           // top → show
//       } else if (currentScrollY < lastScrollY) {
//         setVisible(false);          // scroll UP → hide
//       } else {
//         setVisible(true);           // scroll DOWN → show
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`
//         fixed left-1/2 -translate-x-1/2 z-50
//         transition-all duration-500 ease-in-out
//         ${visible ? "translate-y-0" : "-translate-y-24"}
//         ${scrolled ? "top-3 w-[96%]" : "top-0 w-full"}
//       `}
//     >
//       <nav
//         className={`
//           flex items-center justify-between
//           px-4 py-2 md:px-8 md:py-4
//           bg-yellow-100
//           transition-all duration-500
//           ${
//             scrolled
//               ? "rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)] md:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
//               : "rounded-none"
//           }
//         `}
//       >
//         {/* LOGO */}
//         <div className="text-xl md:text-2xl font-extrabold tracking-wide">
//           <span className="text-purple-600">AR</span>
//           <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
//             Book
//           </span>
//         </div>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex items-center gap-10 font-bold text-black">
//           {["Home", "Programs", "About", "Contact"].map((item) => (
//             <li
//               key={item}
//               className="cursor-pointer hover:text-yellow-500 transition"
//             >
//               {item}
//             </li>
//           ))}
//         </ul>

//         {/* CTA */}
//         <button
//           className="
//             hidden md:block
//             bg-yellow-400 text-black font-bold
//             px-5 py-2 text-sm md:px-7 md:py-3 md:text-base
//             rounded-full
//             shadow-[0_6px_0_#c9a200]
//             hover:translate-y-[1px]
//             hover:shadow-[0_4px_0_#c9a200]
//             transition-all
//           "
//         >
//           Enroll Now
//         </button>

//         {/* MOBILE ICON */}
//         <button
//           className="md:hidden text-2xl text-yellow-500"
//           onClick={() => setOpen(!open)}
//         >
//           ☰
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       <div
//         className={`
//           md:hidden overflow-hidden transition-all duration-300
//           ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}
//           bg-black border border-yellow-400
//           rounded-2xl mt-2
//         `}
//       >
//         <ul className="flex flex-col gap-5 px-5 py-5 text-white">
//           {["Home", "Programs", "About", "Contact"].map((item) => (
//             <li
//               key={item}
//               className="hover:text-yellow-400 transition"
//             >
//               {item}
//             </li>
//           ))}

//           <button
//             className="
//               bg-yellow-400 text-black font-bold
//               py-2 rounded-full
//               shadow-[0_6px_0_#c9a200]
//             "
//           >
//             Enroll Now
//           </button>
//         </ul>
//       </div>
//     </header>
//   );
// }



import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";

export default function NewNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cartState } = useCartContext();
  const isCartOpen = cartState.isCartOpen;

  useEffect(() => {
    if (isCartOpen) {
      setVisible(false); // 🔴 hide navbar when cart opens
      return;
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, isCartOpen]);

  // 🔴 Completely hide navbar when cart is open
  if (isCartOpen) return null;

  return (
    <header
      className={`
        fixed left-1/2 -translate-x-1/2 z-40
        transition-all duration-500 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-24"}
        ${scrolled ? "top-3 w-[96%]" : "top-0 w-full"}
      `}
    >
      {/* NAVBAR */}
      <nav
        className={`
          flex items-center justify-between
          px-4 py-2 md:px-8 md:py-4
          bg-yellow-100
          transition-all duration-500
          ${
            scrolled
              ? "rounded-2xl md:rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)] md:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              : "rounded-none"
          }
        `}
      >
        {/* LOGO */}
        <div className="text-xl md:text-2xl font-extrabold tracking-wide">
          <span className="text-purple-600">AR</span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
            Book
          </span>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 font-bold text-black">
          {["Home", "Programs", "About", "Contact"].map((item) => (
            <li key={item} className="hover:text-yellow-500 transition">
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="
            hidden md:block
            bg-yellow-400 text-black font-bold
            px-5 py-2 text-sm md:px-7 md:py-3 md:text-base
            rounded-full
            shadow-[0_6px_0_#c9a200]
            hover:translate-y-[1px]
            hover:shadow-[0_4px_0_#c9a200]
            transition-all
          "
        >
          Enroll Now
        </button>
      </nav>
    </header>
  );
}
