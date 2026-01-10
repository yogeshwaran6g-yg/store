import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/form/button";

/* Cloud component (JSX version) */
const Cloud = ({
  className,
  size = "md",
  delay = 0,
  duration = 20,
  top,
  initialX = "-100%",
}) => {
  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12",
    lg: "w-36 h-16",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className || ""}`}
      style={{ top }}
      initial={{ x: initialX, opacity: 0 }}
      animate={{
        x: ["calc(-100%)", "calc(100vw + 100%)"],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        times: [0, 0.1, 0.9, 1],
      }}
    >
      <svg
        viewBox="0 0 100 50"
        className={`${sizeClasses[size]} fill-muted-foreground/20`}
      >
        <ellipse cx="30" cy="35" rx="25" ry="15" />
        <ellipse cx="55" cy="30" rx="20" ry="18" />
        <ellipse cx="75" cy="35" rx="18" ry="12" />
        <ellipse cx="45" cy="22" rx="18" ry="14" />
        <ellipse cx="65" cy="25" rx="15" ry="12" />
      </svg>
    </motion.div>
  );
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8 overflow-hidden relative">
      {/* Animated clouds */}
      <Cloud top="15%" size="lg" duration={25} />
      <Cloud top="25%" size="md" duration={30} delay={5} />
      <Cloud top="70%" size="sm" duration={22} delay={2} />
      <Cloud top="80%" size="lg" duration={28} delay={8} />
      <Cloud top="45%" size="md" duration={35} delay={12} />
      <Cloud top="60%" size="sm" duration={20} delay={15} />

      {/* Background blob */}
      <motion.div
        className="absolute w-[500px] h-[400px] bg-space-blob rounded-[50%] blur-3xl opacity-50 pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      <motion.div
        className="absolute text-star-gold pointer-events-none"
        style={{ top: "20%", left: "20%" }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 20, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute text-star-gold pointer-events-none"
        style={{ top: "35%", left: "12%" }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -15, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute text-star-gold pointer-events-none"
        style={{ top: "65%", right: "15%" }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </motion.div>

      {/* Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 pointer-events-none"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
  src="/images/man.png"
  alt="Lost astronaut searching"
  className="w-156 md:w-200 lg:w-280 h-auto mb-4"
  animate={{
    y: [-6, 6, -6],
    rotate: [-1.5, 1.5, -1.5],
  }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-primary mb-2 tracking-tight"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6 max-w-sm px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Looks like you've drifted into uncharted space.
          The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="px-8 font-semibold">
            
            <Link to="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
