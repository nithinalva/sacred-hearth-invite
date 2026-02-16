import { motion } from "framer-motion";
import { Car } from "lucide-react";
import { eventConfig } from "@/config/eventConfig";

const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const openRide = (deepLink: string | undefined, fallback: string) => {
  if (isMobile() && deepLink) {
    window.location.href = deepLink;
    setTimeout(() => {
      window.location.href = fallback;
    }, 600);
  } else {
    window.open(fallback, "_blank");
  }
};

const RideBooking = () => {
  const { rideLinks } = eventConfig;

  const rides = [
    {
      name: "Uber",
      className: "ride-btn-uber",
      onClick: () => openRide(rideLinks.uber.fallback, rideLinks.uber.fallback),
    },
  ];

  return (
    <section className="py-14 bg-accent/5">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="section-title text-xl">Book a Ride</h2>
        <div className="section-divider mb-8">
          <span className="text-primary text-sm">🚗</span>
        </div>

        <div className="grid gap-3">
          {rides.map((ride, i) => (
            <motion.button
              key={ride.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onClick={ride.onClick}
              className={`${ride.className} flex items-center justify-center gap-3 py-4 rounded-xl text-base font-semibold transition-all active:scale-[0.98]`}
            >
              <Car className="w-5 h-5" />
              {ride.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RideBooking;
