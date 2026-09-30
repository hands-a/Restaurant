import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import PageContainer from "../layout/PageContainer";

// Avatar initials component — no external image dependency, no lazy-loading warnings
const Avatar = ({ name, color }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center ring-2 ring-primary/30 text-white text-sm font-black flex-shrink-0"
      style={{ background: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

const reviews = [
  {
    id: 1,
    name: "Rana Wael",
    role: "Teacher",
    text: "Honestly, the juiciest burger I've tasted in Cairo. The truffle sauce is out of this world — and the delivery was incredibly fast.",
    rating: 5,
    avatarColor: "linear-gradient(135deg,#d97706,#92400e)",
  },
  {
    id: 2,
    name: "Abdullah Sayed",
    role: "Verified Customer",
    text: "The pizza arrived hot and the crust was perfectly crispy. Definitely ordering this again for movie night with the family.",
    rating: 5,
    avatarColor: "linear-gradient(135deg,#1d4ed8,#1e3a8a)",
  },
  {
    id: 3,
    name: "Hamza Nour",
    role: "Chef",
    text: "As a chef, I appreciate quality ingredients. The dessert was perfectly balanced — not too sweet, just right. Highly recommended.",
    rating: 5,
    avatarColor: "linear-gradient(135deg,#15803d,#14532d)",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-dark relative noise-overlay overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Large background quote mark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[20rem] font-display font-black text-white/[0.015] leading-none select-none pointer-events-none" aria-hidden="true">
        &ldquo;
      </div>

      <PageContainer>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <p className="text-overline mb-4">What People Say</p>
            <h2 className="text-heading-2 text-text-on-dark">
              Loved by <em className="italic text-primary not-italic">thousands</em>
            </h2>
          </div>
          <div className="flex items-center gap-1" aria-label="4.9 out of 5 average rating">
            {[...Array(5)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-xl" aria-hidden="true" />)}
            <span className="ml-2 text-text-on-dark-muted font-bold text-lg">4.9</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 group"
            >
              <FaQuoteLeft className="text-primary/30 text-3xl mb-6 group-hover:text-primary/50 transition-colors duration-300" aria-hidden="true" />

              <p className="text-text-on-dark-muted text-base leading-relaxed flex-1 mb-8 italic">
                {review.text}
              </p>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                <Avatar name={review.name} color={review.avatarColor} />
                <div>
                  <h4 className="font-bold text-text-on-dark text-sm leading-tight">{review.name}</h4>
                  <span className="text-xs text-text-on-dark-muted tracking-wide">{review.role}</span>
                </div>
                <div className="ml-auto flex gap-0.5" aria-label={`Rated ${review.rating} out of 5`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default Testimonials;
