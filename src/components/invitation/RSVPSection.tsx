import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const rsvpSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  guests: z.coerce.number().min(1, "At least 1 guest").max(20),
  attending: z.enum(["yes", "no"], { required_error: "Please select" }),
});

type RSVPData = z.infer<typeof rsvpSchema>;

const RSVPSection = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RSVPData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1, attending: "yes" },
  });

  const onSubmit = (data: RSVPData) => {
    const existing = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
    existing.push({ ...data, submittedAt: new Date().toISOString() });
    localStorage.setItem("rsvp_responses", JSON.stringify(existing));
    setShowThankYou(true);
    reset();
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors";

  return (
    <section className="section-container">
      <h2 className="section-title">RSVP</h2>
      <div className="section-divider mb-8">
        <span className="text-primary text-sm">💌</span>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit(onSubmit)}
        className="invite-card space-y-4"
      >
        <div>
          <input {...register("name")} placeholder="Your Name" className={inputClass} />
          {errors.name && <p className="text-xs text-accent mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register("phone")} placeholder="Phone Number" type="tel" className={inputClass} />
          {errors.phone && <p className="text-xs text-accent mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <input {...register("guests")} placeholder="Number of Guests" type="number" min={1} max={20} className={inputClass} />
          {errors.guests && <p className="text-xs text-accent mt-1">{errors.guests.message}</p>}
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Will you attend?</p>
          <div className="flex gap-3">
            <label className="flex-1">
              <input type="radio" value="yes" {...register("attending")} className="sr-only peer" />
              <div className="text-center py-2.5 rounded-lg border border-border cursor-pointer text-sm font-medium transition-colors peer-checked:bg-primary/10 peer-checked:border-primary/40 peer-checked:text-primary">
                Yes, Happily!
              </div>
            </label>
            <label className="flex-1">
              <input type="radio" value="no" {...register("attending")} className="sr-only peer" />
              <div className="text-center py-2.5 rounded-lg border border-border cursor-pointer text-sm font-medium transition-colors peer-checked:bg-accent/10 peer-checked:border-accent/40 peer-checked:text-accent">
                Sorry, Can't
              </div>
            </label>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">🍃 Food: Pure Vegetarian</p>

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          Send RSVP
        </button>
      </motion.form>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="font-serif text-xl">Thank You! 🙏</DialogTitle>
            <DialogDescription>
              Your RSVP has been received. We look forward to celebrating with you!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RSVPSection;
