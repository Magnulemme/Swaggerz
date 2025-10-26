import ReviewsSection from "./ReviewsSection";
import ShippingInfoSection from "./ShippingInfoSection";
import NewsletterBanner from "./NewsletterBanner";

export default function ReviewsShippingSection() {
  return (
    <section className="w-full bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ReviewsSection />
      </div>
      <ShippingInfoSection />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <NewsletterBanner />
      </div>
    </section>
  );
}
