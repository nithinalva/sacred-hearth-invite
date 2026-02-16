import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Check, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
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

// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const RSVPSection = () => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RSVPData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guests: 1, attending: "yes" },
  });

  const onSubmit = async (data: RSVPData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Send email via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          phone: data.phone,
          guests: data.guests,
          attending:
            data.attending === "yes" ? "Yes, Happily!" : "Sorry, Can't",
          submittedAt: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      );

      // Also save to localStorage as backup
      const existing = JSON.parse(
        localStorage.getItem("rsvp_responses") || "[]"
      );
      existing.push({ ...data, submittedAt: new Date().toISOString() });
      localStorage.setItem("rsvp_responses", JSON.stringify(existing));

      setShowThankYou(true);
      reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send RSVP. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

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
          <input
            {...register("name")}
            placeholder="Your Name"
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-xs text-accent mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            type="tel"
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="text-xs text-accent mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("guests")}
            placeholder="Number of Guests"
            type="number"
            min={1}
            max={20}
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.guests && (
            <p className="text-xs text-accent mt-1">{errors.guests.message}</p>
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            Will you attend?
          </p>
          <div className="flex gap-3">
            <label className="flex-1">
              <input
                type="radio"
                value="yes"
                {...register("attending")}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="text-center py-2.5 rounded-lg border border-border cursor-pointer text-sm font-medium transition-colors peer-checked:bg-primary/10 peer-checked:border-primary/40 peer-checked:text-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">
                Yes, Happily!
              </div>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                value="no"
                {...register("attending")}
                className="sr-only peer"
                disabled={isSubmitting}
              />
              <div className="text-center py-2.5 rounded-lg border border-border cursor-pointer text-sm font-medium transition-colors peer-checked:bg-accent/10 peer-checked:border-accent/40 peer-checked:text-accent peer-disabled:opacity-50 peer-disabled:cursor-not-allowed">
                Sorry, Can't
              </div>
            </label>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          🍃 Food: Pure Vegetarian
        </p>

        {error && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
            <p className="text-xs text-accent text-center">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send RSVP
            </>
          )}
        </button>
      </motion.form>

      {/* Thank You Dialog */}
      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="font-serif text-xl">
              Thank You! 🙏
            </DialogTitle>
            <DialogDescription>
              Your RSVP has been received. We look forward to celebrating with
              you!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RSVPSection;
