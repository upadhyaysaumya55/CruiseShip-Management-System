import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_92nmtqk',     // from EmailJS
        'template_jjgkr79',    // from EmailJS
        formData,
        'dXcUuj_oHJoLr6CM9'      // from EmailJS
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus('✅ Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error(error.text);
          setStatus('❌ Failed to send message. Try again.');
        }
      );
  };

  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-tr from-[#000000] via-[#1a1a1a] to-[#000000] text-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Have questions or just want to say hello? Fill out the form below!
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-xl shadow-lg space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label htmlFor="name" className="block text-white font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-sm 
                       text-white placeholder-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 
                       hover:bg-white/20 hover:shadow-lg hover:shadow-indigo-500/30 
                       transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-sm 
                       text-white placeholder-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 
                       hover:bg-white/20 hover:shadow-lg hover:shadow-indigo-500/30 
                       transition-all duration-300"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-white font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            className="w-full px-4 py-2 border border-white/30 bg-white/10 backdrop-blur-sm 
                       text-white placeholder-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-300 
                       hover:bg-white/20 hover:shadow-lg hover:shadow-indigo-500/30 
                       transition-all duration-300 resize-none"
          ></textarea>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-full px-6 py-3 text-lg font-semibold 
                     text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 
                     rounded-lg shadow-md shadow-indigo-500/20"
        >
          <Send size={20} />
          Send Message
        </motion.button>

        {status && <p className="text-center mt-4">{status}</p>}
      </motion.form>
    </section>
  );
};

export default Contact;
