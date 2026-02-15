import FloatingPetals from "@/components/invitation/FloatingPetals";
import HeroSection from "@/components/invitation/HeroSection";
import EventDetails from "@/components/invitation/EventDetails";
import CountdownTimer from "@/components/invitation/CountdownTimer";
import MapSection from "@/components/invitation/MapSection";
import RideBooking from "@/components/invitation/RideBooking";
import RSVPSection from "@/components/invitation/RSVPSection";
import PhotoGallery from "@/components/invitation/PhotoGallery";
import ShareSection from "@/components/invitation/ShareSection";
import InvitationFooter from "@/components/invitation/InvitationFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingPetals />
      <main>
        <HeroSection />
        <EventDetails />
        <CountdownTimer />
        <MapSection />
        <RideBooking />
        <RSVPSection />
        <PhotoGallery />
        <ShareSection />
        <InvitationFooter />
      </main>
    </div>
  );
};

export default Index;
