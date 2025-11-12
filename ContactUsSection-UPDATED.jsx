import React, { useState } from "react";
import { Headphones, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import intervaslogoblack from "@/assets/intervaslogoblack.svg";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    
    try {
      // Call your deployed backend on Render
      const response = await fetch('https://intarvasbackend.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: `
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
          `.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatusMessage("✅ Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setStatusMessage(`❌ Failed to send message: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage("❌ Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setStatusMessage(""), 5000);
    }
  };

  return (
    <section className="bg-gray-50 py-20 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In
            <br />
            Touch With Us
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
            Explore our commitment to exceptional customer support. Our team is
            ready to assist you around the clock, ensuring a smooth and reliable
            experience with IntarVAS services.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">How can we help you?</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your First and Last name"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234123456789"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="A detailed explanation on your request"
                  rows={4}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-100"
                ></textarea>
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div className={`text-center p-3 rounded-lg ${
                  statusMessage.includes('✅') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 text-white bg-[#007DFE] hover:bg-[#0056b3] transition-colors duration-300 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side - Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className=" rounded-3xl p-8 ">
              <h2 className="text-2xl font-bold mb-6">
                Prefer a direct approach?
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-gray-600">07001340000</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">support@intarvas.com</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">Mon-Fri 9.am-5pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card with Overlay */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg relative">
              {/* Google Maps Embed */}
              <div className="h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.5!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9bb!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IntarVAS Office Location - Victoria Island, Lagos"
                ></iframe>

                {/* Overlay Card */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl w-[300px] md:w-[580px]">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">
                    Visit Our Office
                  </h3>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-gray-700 text-sm leading-relaxed">
                      <p>Churchgate Tower 2,</p>
                      <p>30 Churchgate Street (formerly Afribank</p>
                      <p>Street) Victoria Island Lagos, Nigeria.</p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Churchgate+Tower+2,+30+Churchgate+Street,+Victoria+Island,+Lagos,+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Get direction
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;

