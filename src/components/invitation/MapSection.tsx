import { motion } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import { eventConfig } from "@/config/eventConfig";

const MapSection = () => {
  const { coordinates, mapLinks, venue } = eventConfig;

  return (
    <section className="section-container">
      <h2 className="section-title">Find Us Here</h2>
      <div className="section-divider mb-8">
        <span className="text-primary text-sm">📍</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="invite-card overflow-hidden p-0"
      >
        <iframe
          title={`Map to ${venue}`}
          src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`}
          className="w-full h-56 md:h-72 border-0"
          loading="lazy"
          allowFullScreen
        />
      </motion.div>

      <div className="flex gap-3 mt-5">
        <a
          href={mapLinks.google}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Google Maps
        </a>
        <a
          href={mapLinks.apple}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Apple Maps
        </a>
      </div>
    </section>
  );
};

export default MapSection;
