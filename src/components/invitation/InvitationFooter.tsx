import { eventConfig } from "@/config/eventConfig";

const InvitationFooter = () => {
  return (
    <footer className="py-16 text-center px-6">
      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-12 bg-primary/30" />
        <span className="text-2xl">🪔</span>
        <div className="h-px w-12 bg-primary/30" />
      </div>

      <p className="font-serif text-lg md:text-xl text-foreground italic">
        "{eventConfig.closingLine}"
      </p>

      <p className="text-xs text-muted-foreground mt-8">
        Awaiting your presence and blessings
      </p>

      <div className="flex items-center justify-center gap-2 mt-4 text-primary/40 text-lg">
        ✦ · ✦ · ✦
      </div>
    </footer>
  );
};

export default InvitationFooter;
