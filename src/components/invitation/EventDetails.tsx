import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  UtensilsCrossed,
  CalendarPlus,
} from "lucide-react";
import { eventConfig } from "@/config/eventConfig";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6 },
};

const EventDetails = () => {
  return (
    <section className="section-container">
      {/* Hosts */}
      <motion.div {...fadeUp} className="text-center mb-8">
        {eventConfig.hosts.map((host, i) => (
          <p
            key={i}
            className="text-base md:text-lg font-serif text-foreground leading-relaxed"
          >
            {host}
          </p>
        ))}
        <p className="text-muted-foreground mt-4 text-sm italic">
          {eventConfig.invitationText}
        </p>
        <p className="text-xl md:text-2xl font-serif font-semibold text-accent mt-2">
          {eventConfig.eventName}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="section-divider">
        <span className="text-primary text-lg">✦</span>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <motion.div
          {...fadeUp}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="invite-card text-center"
        >
          <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Date
          </p>
          <p className="font-serif font-semibold text-sm mt-1">
            {eventConfig.date}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="invite-card text-center"
        >
          <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Time
          </p>
          <p className="font-serif font-semibold text-sm mt-1">
            {eventConfig.time}
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="invite-card text-center col-span-2"
        >
          <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Venue
          </p>
          <p className="font-serif font-semibold text-sm mt-1">
            {eventConfig.venue}
          </p>
          {eventConfig.address.map((line, i) => (
            <p key={i} className=" font-serif text-xs text-muted-foreground ">
              {line}
            </p>
          ))}
        </motion.div>
      </div>

      {/* Lunch note */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 mt-6 text-accent"
      >
        <UtensilsCrossed className="w-4 h-4" />
        <p className="text-sm font-medium italic font-serif">
          {eventConfig.note}
        </p>
      </motion.div>

      {/* Add to Calendar */}
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.5 }}
        className="text-center mt-6"
      >
        <a
          href={eventConfig.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <CalendarPlus className="w-4 h-4" />
          Add to Calendar
        </a>
      </motion.div>
    </section>
  );
};

export default EventDetails;
