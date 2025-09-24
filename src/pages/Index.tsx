import PrayerHeader from "@/components/PrayerHeader";
import AdorationTracker from "@/components/AdorationTracker";
import RosaryTracker from "@/components/RosaryTracker";
import PrayerFooter from "@/components/PrayerFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-prayer">
      <div className="container mx-auto max-w-6xl">
        <PrayerHeader />
        
        <main className="px-6 pb-12">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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