import Header from "./home/Header";
import Footer from "./home/Footer";

const Layout = ({ children, header, footer }) => {
  return (
    <>
      {header && <Header />}
      <main className="min-h-[calc(100vh-120px)]">
        {children}
      </main>
      {footer && <Footer />}
    </>
  );
};

export default Layout;
