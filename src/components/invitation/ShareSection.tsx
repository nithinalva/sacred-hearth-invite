import { motion } from "framer-motion";
import { Share2, Copy, MessageCircle } from "lucide-react";
import { eventConfig } from "@/config/eventConfig";
import { useToast } from "@/hooks/use-toast";

const ShareSection = () => {
  const { toast } = useToast();
  const shareUrl = window.location.href;

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${eventConfig.whatsappMessage}\n\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link copied!", description: "Share it with your loved ones." });
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: eventConfig.title,
        text: eventConfig.whatsappMessage,
        url: shareUrl,
      });
    } else {
      copyLink();
    }
  };

  return (
    <section className="py-14 bg-accent/5">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="section-title text-xl">Share This Invitation</h2>
        <div className="section-divider mb-8">
          <span className="text-primary text-sm">🙏</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.4 }}
            onClick={shareWhatsApp}
            className="invite-card flex flex-col items-center gap-2 py-4 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">WhatsApp</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={copyLink}
            className="invite-card flex flex-col items-center gap-2 py-4 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <Copy className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">Copy Link</span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onClick={nativeShare}
            className="invite-card flex flex-col items-center gap-2 py-4 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <Share2 className="w-6 h-6 text-primary" />
            <span className="text-xs font-medium">Share</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ShareSection;
