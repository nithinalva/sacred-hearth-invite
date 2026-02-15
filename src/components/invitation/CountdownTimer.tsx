import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { eventConfig } from "@/config/eventConfig";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (): TimeLeft => {
  const diff = eventConfig.eventDateTime.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-14 bg-accent/5">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="section-title text-xl">Counting Down To</h2>
        <div className="section-divider mb-8">
          <span className="text-primary text-sm">🪔</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {units.map((unit, i) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="invite-card text-center py-4"
            >
              <p className="text-2xl md:text-3xl font-serif font-bold text-primary">
                {String(unit.value).padStart(2, "0")}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {unit.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
