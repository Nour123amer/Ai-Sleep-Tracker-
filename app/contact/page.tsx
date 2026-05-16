"use client"
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from 'sonner';

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        subject,
        message
      })
    })

    if(res.ok){
     toast.success("Message sent successfully!");
     console.log("result ===>", res)
    }

  }




  return (
    <section className="min-h-screen bg-linear-to-br from-pink-50 via-white to-fuchsia-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-pink-500 font-semibold mb-3 tracking-wide uppercase">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Let’s Build Something Amazing Together
          </h1>

          <p className="text-gray-600 text-lg leading-8 mb-8">
            Have a question, feedback, or project idea?  
            We'd love to hear from you. Fill out the form and our team
            will get back to you as soon as possible.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                <Mail className="text-pink-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-semibold text-gray-800">
                  nouramer295@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-100 flex items-center justify-center">
                <Phone className="text-fuchsia-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-semibold text-gray-800">
                  +20 1099574487
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <MapPin className="text-purple-500" />
              </div>

              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-semibold text-gray-800">
                  Cairo, Egypt
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Send a Message
          </h2>

          <p className="text-gray-500 mb-8">
            We’ll respond within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>

                <input
                name='firstName'
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
                  type="text"
                  placeholder="John"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>

                <input
                name='lastName'
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                  type="text"
                  placeholder="Doe"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                name='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>

              <input
                name='subject'
                value={subject}
                onChange={(e)=>{setSubject(e.target.value)}}
                type="text"
                placeholder="Project Discussion"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>

              <textarea
                name='message'
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-linear-to-r from-pink-500 to-fuchsia-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
