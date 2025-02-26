import { motion } from "framer-motion";

const SkeletonLoader = () => (
  <motion.div
    className="flex flex-col items-center justify-center w-full h-dvh bg-gray-100"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-10 w-10 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
    <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg space-y-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-12 bg-gray-300 rounded animate-pulse"></div>
    </div>
  </motion.div>
);

export default SkeletonLoader;
