import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroRangoli from "@/assets/hero-rangoli.jpg";
import { eventConfig } from "@/config/eventConfig";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroRangoli}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl">
        {/* Diya */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl mb-6 diya-glow inline-block"
        >
          🪔
        </motion.div>

        {/* Om Symbol */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl text-primary mb-2 font-serif"
        >
          ॐ
        </motion.p>

        {/* Blessing */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-sm md:text-base text-muted-foreground italic mb-6 font-serif"
        >
          {eventConfig.blessing}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold font-serif text-foreground leading-tight mb-8 gold-glow"
        >
          {eventConfig.title}
        </motion.h1>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-3"
        >
          <p className="text-primary font-semibold text-sm md:text-base font-serif">
            {eventConfig.date} · {eventConfig.time}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 z-10 animate-gentle-bounce"
      >
        <ChevronDown className="w-6 h-6 text-primary/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
