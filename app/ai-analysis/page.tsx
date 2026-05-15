"use client"
import React, { useEffect, useRef } from 'react'

export default function AiAnalysis() {
  const [userData, setUserData] = React.useState(null);
  const [analysisResult, setAnalysisResult] = React.useState(null);

  const hasRun = useRef(false);

  useEffect(() => {
    const sleepData = localStorage.getItem("sleepData");
    if (!sleepData) return;

    const parsed = JSON.parse(sleepData);

    if (hasRun.current) return;
    hasRun.current = true;

    setUserData(parsed);
    handleAnalyzeSleep(parsed);
  }, []);

  const handleAnalyzeSleep = async (data: any) => {
    console.log("data to analyze =>", data)
    // if (!userData) return;
    const res = await fetch("/api/analyize-sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    const result = await res.json();
    console.log("AI Analysis Result:", result);
    setAnalysisResult(result);
  }


  return (
    <>


      {analysisResult?.error ?(
        // <p>AI is not available at the moment.</p>
         <div className="min-h-[300px] flex items-center justify-center p-6">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-xl">

        {/* glow background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-pink-500/10 blur-2xl" />

        {/* content */}
        <div className="relative">
          {/* icon */}
          <div className="mx-auto w-10 h-14 rounded-full bg-red-500/10 border border-red-400/20 flex items-center justify-center mb-4">
            <span className="text-red-300 text-xl">⚠️</span>
          </div>

          <h2 className="text-white text-lg font-semibold mb-2">
            AI Service Unavailable
          </h2>

          <p className="text-white/60 text-sm leading-relaxed">
            AI is not available at the moment.  
            Please try again in a few seconds.
          </p>

          {/* retry button */}
          <button className="mt-5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-400 text-white text-sm font-medium hover:opacity-90 transition">
            Retry
          </button>
        </div>
      </div>
    </div>
      ): (
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl text-purple-600 shadow-2xl border border-teal-500/20">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold from-purple-600 via-pink-500 to-purple-500 bg-gradient-to-r text-transparent bg-clip-text">
          Sleep AI Analysis
        </h2>

        <div className="px-4 py-2 rounded-full bg-purple-500/20  text-purple-200 font-semibold border border-purple-400/30">
          Score: { analysisResult?.sleepScore}/100
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800/60 rounded-full h-3 mb-6 overflow-hidden">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400"
          style={{ width: `${analysisResult?.sleepScore}%` }}
        />
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 from-purple-600 via-pink-500 to-purple-500 bg-gradient-to-r text-transparent bg-clip-text">
          Summary
        </h3>
        <p className="text-slate-200 leading-relaxed">
          {analysisResult?.summary}
        </p>
      </div>

      {/* Issues */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 from-purple-600 via-pink-500 to-purple-500 bg-gradient-to-r text-transparent bg-clip-text">
          Detected Issues
        </h3>

        <div className="space-y-2">
          {analysisResult?.detectedIssues?.map((issue, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-pink-500/10 border border-pink-400/20 text-sm text-pink-200"
            >
              {issue}
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-emerald-300">
          Recommendations
        </h3>

        <div className="space-y-2">
          {analysisResult?.recommendations?.map((rec, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-sm text-emerald-200"
            >
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>


      ) 
      }

    </>

  )
}
