"use client"

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import emailjs from 'emailjs-com';
import { toast } from 'sonner';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service configuration is missing.');
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, e.currentTarget, publicKey)
      .then(() => {
        toast.success('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        toast.error('Failed to send message. Please try again.');
      });
  };

  return (
    <section className="bg-white py-24 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-green-700 font-semibold uppercase tracking-wide">
            <Mail className="w-5 h-5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-4xl font-bold text-green-900">Contact Us</h2>
          <p className="text-lg text-green-700 max-w-xl mx-auto">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-green-50/50 border border-green-100 rounded-2xl shadow-md p-8 md:p-10">
          <form onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-white px-4 py-3 rounded-md text-green-900 placeholder-green-600 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-white px-4 py-3 rounded-md text-green-900 placeholder-green-600 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              className="w-full bg-white px-4 py-3 rounded-md text-green-900 placeholder-green-600 border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
