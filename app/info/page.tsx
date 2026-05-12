import React from 'react'
import { Calendar, Clock } from "lucide-react";
import AddNewRecord from '../components/AddNewRecord';

export default function page() {
  return (
    <>
    <div className="w-full md:w-1/2 max-w-2xl mx-auto p-6 rounded-2xl bg-white shadow-lg border relative overflow-hidden">
      
      {/* glow effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200 blur-3xl opacity-40 rounded-full" />

      <div className="flex items-start gap-5 relative z-10">
        
        {/* avatar */}
        <img
          src="/sleep-tracker.png"
          alt="user"
          className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 shadow-md"
        />

        <div className="flex-1">
          
          {/* title */}
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back,{" "}
            <span className="text-purple-600">Sahand 👋</span>
          </h2>

          {/* description */}
          <p className="text-gray-600 mt-1 text-sm leading-relaxed">
            Here's a quick overview of your recent activity. Stay on top of your data insights and manage your tasks efficiently.
          </p>

          {/* info cards */}
          <div className="flex gap-4 mt-4 flex-wrap">
            
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg text-sm">
              <Calendar size={16} className="text-purple-500" />
              <span className="text-gray-700">
                <strong>Joined:</strong> 5/25/2025
              </span>
            </div>

            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-lg text-sm">
              <Clock size={16} className="text-pink-500" />
              <span className="text-gray-700">
                <strong>Last Active:</strong> 5/25/2025, 1:38 PM
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>

    <AddNewRecord />
  </>
  )
}
