import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { eventConfig } from "@/config/eventConfig";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = eventConfig.gallery;

  if (images.length === 0) return null;

  return (
    <section className="section-container">
      <h2 className="section-title">Gallery</h2>
      <div className="section-divider mb-8">
        <span className="text-primary text-sm"><ImageIcon className="w-4 h-4 inline" /></span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => setSelectedImage(src)}
            className="aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors cursor-pointer"
          >
            <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </motion.button>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-lg p-2">
          {selectedImage && (
            <img src={selectedImage} alt="Gallery preview" className="w-full rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PhotoGallery;
