import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WaitlistLayout = ({ children }: any) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default WaitlistLayout;
