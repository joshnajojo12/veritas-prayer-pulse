import PrayerHeader from "@/components/PrayerHeader";
import AdorationTracker from "@/components/AdorationTracker";
import RosaryTracker from "@/components/RosaryTracker";
import PrayerFooter from "@/components/PrayerFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-prayer">
      <div className="container mx-auto max-w-6xl px-2 sm:px-4">
        <PrayerHeader />
        
        <main className="px-2 sm:px-4 md:px-6 pb-6 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <AdorationTracker />
            <RosaryTracker />
          </div>
        </main>

        <PrayerFooter />
      </div>
    </div>
  );
};

export default Index;