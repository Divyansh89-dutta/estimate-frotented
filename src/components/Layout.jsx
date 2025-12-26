import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex flex-col
      bg-gradient-to-br from-slate-100 via-white to-slate-200
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      <Navbar />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
        <div
          className="max-w-7xl mx-auto w-full
          rounded-3xl
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur
          border border-slate-200/60 dark:border-slate-800
          shadow-xl
          p-4 sm:p-6"
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
