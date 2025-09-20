import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ 
          paddingTop: "65px", 
          minHeight: "calc(100vh - 65px - 150px)",
          background: "var(--off-white)"
        }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}

