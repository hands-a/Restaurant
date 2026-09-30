import React from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaMapMarkerAlt, FaPhoneAlt, FaClock, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import PageContainer from "../components/layout/PageContainer";
import PageTransition from "../components/motion/PageTransition";
import { ScrollReveal } from "../components/motion/ScrollReveal";
import FloatingElement from "../components/interactive/FloatingElement";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const infoItems = [
  { icon: FaMapMarkerAlt, title: "Visit Us", text: "123 Culinary Avenue, Cairo, Egypt" },
  { icon: FaPhoneAlt, title: "Call Us", text: "+20 123 456 789" },
  { icon: FaEnvelope, title: "Email Us", text: "hello@restaurantly.com" },
  { icon: FaClock, title: "Hours", text: "Daily · 10:00 AM – 11:00 PM" },
];

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Thank you, ${data.name}! Your message has been sent.`, { icon: <FaCheckCircle className="text-success" /> });
    reset();
  };

  return (
    <PageTransition className="bg-surface min-h-[100dvh]">
      {/* Cinematic header */}
      <div className="relative pt-40 pb-20 bg-bg-deep noise-overlay overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep to-bg-dark" />
        <FloatingElement speed="slow" className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <PageContainer className="relative z-10">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-overline mb-4">
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-heading-1 text-text-on-dark max-w-2xl"
          >
            Let&apos;s start a{" "}
            <em className="italic text-primary not-italic">conversation.</em>
          </motion.h1>
        </PageContainer>
      </div>

      <PageContainer className="py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Info column */}
          <ScrollReveal mode="fade-left" className="lg:col-span-1">
            <div className="space-y-6">
              {infoItems.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-5 p-5 rounded-2xl bg-surface-sunken border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <info.icon aria-hidden="true" className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary mb-0.5">{info.title}</h3>
                    <p className="text-body-sm text-text-secondary">{info.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal mode="fade-right" className="lg:col-span-2">
            <div className="bg-surface border border-border rounded-3xl p-8 lg:p-12 shadow-card">
              <h2 className="text-heading-3 text-text-primary mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Your Name" type="text" placeholder="Enter Your Name" required error={errors.name?.message} {...register("name")} />
                  <Input label="Your Email" type="email" placeholder="Enter Your Email" required error={errors.email?.message} {...register("email")} />
                </div>
                <Input label="Subject" type="text" placeholder="Event Booking / Feedback" required error={errors.subject?.message} {...register("subject")} />
                <Textarea label="Message" rows={5} placeholder="How can we help you?" required error={errors.message?.message} {...register("message")} />
                <Button type="submit" variant="primary" size="lg" icon={isSubmitting ? null : FaPaperPlane} loading={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* Map */}
        <ScrollReveal mode="scale" className="mt-20">
          <div className="rounded-3xl overflow-hidden shadow-card h-[420px] border border-border relative group">
            <div className="absolute inset-0 pointer-events-none z-10 bg-black/5 group-hover:bg-transparent transition-colors" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709964585!2d31.22344485!3d30.0594838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79df8294e8c2345!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location Map"
              className="relative z-0"
            />
          </div>
        </ScrollReveal>
      </PageContainer>
    </PageTransition>
  );
};

export default Contact;
