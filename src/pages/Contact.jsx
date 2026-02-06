import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/Common/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا ممكن تربطها بـ API بجد
    alert(`Thank you, ${formData.name}! Your message has been sent. 🚀`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const infoCards = [
    { icon: <FaMapMarkerAlt />, title: 'Location', text: 'New Cairo, 5th Settlement, Cairo, Egypt' },
    { icon: <FaPhoneAlt />, title: 'Phone', text: '+20 123 456 7890' },
    { icon: <FaEnvelope />, title: 'Email', text: 'hello@restaurantly.com' },
    { icon: <FaClock />, title: 'Working Hours', text: 'Daily: 10:00 AM - 12:00 AM' },
  ];

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Contact Us</span>
          <h2 className="text-4xl font-black text-gray-900 mt-2">Get In Touch</h2>
          <p className="text-gray-500 mt-2">Have a question or want to book a private event? We are here for you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {infoCards.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{info.title}</h4>
                  <p className="text-gray-500 text-sm">{info.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Your Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Your Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                      placeholder="Enter Your Email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all" 
                    placeholder="Event Booking / Feedback"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all resize-none" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full md:w-auto px-8" icon={FaPaperPlane}>
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* Optional: Map Embed */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg h-[400px] border border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.37709964585!2d31.22344485!3d30.0594838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79df8294e8c2345!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Location"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contact;