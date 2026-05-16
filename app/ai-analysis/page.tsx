"use client"
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react'
import { SleepAnalysisResult } from '../actions/analyzeSleep';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from "@/components/ui/card"


type AnalysisResponse =
  | SleepAnalysisResult
  | { error: string };

export default function AiAnalysis() {
  const [userData, setUserData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
    setIsLoading(false);
  }


  return (
    <>


      {analysisResult && "error" in analysisResult ? (
        // <p>AI is not available at the moment.</p>
        <div className="min-h-75 flex items-center justify-center p-6">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center shadow-xl">

            {/* glow background */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-purple-600 via-pink-500 to-purple-600" />

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
              <button
                className="mt-5 px-4 py-2 cursor-pointer rounded-xl bg-white text-purple-600 text-sm font-medium hover:opacity-90 transition">
                Retry
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {
            isLoading ? (
              <Card className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-2xl border border-gray-200 bg-white/60 backdrop-blur-xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-52 rounded-md bg-gray-200" />
                    <Skeleton className="h-4 w-32 rounded-md bg-gray-200" />
                  </div>

                  <div className="flex gap-4 items-center">
                    <Skeleton className="h-10 w-28 rounded-full bg-gray-200" />
                    <Skeleton className="h-11 w-44 rounded-full bg-gray-200" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <Skeleton className="h-3 w-full rounded-full bg-gray-200" />
                </div>

                {/* Summary */}
                <div className="mb-8 space-y-4">
                  <Skeleton className="h-6 w-36 rounded-md bg-gray-200" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
                    <Skeleton className="h-4 w-3/4 rounded-md bg-gray-200" />
                  </div>
                </div>

                {/* Issues */}
                <div className="mb-8">
                  <Skeleton className="h-6 w-44 rounded-md bg-gray-200 mb-4" />

                  <div className="space-y-3">
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <Skeleton className="h-6 w-52 rounded-md bg-gray-200 mb-4" />

                  <div className="space-y-3">
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                    <Skeleton className="h-14 w-full rounded-xl bg-gray-200" />
                    <Skeleton className="h-14 w-5/6 rounded-xl bg-gray-200" />
                  </div>
                </div>

              </Card>
            ) : (
              <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl text-purple-600 shadow-2xl border border-teal-500/20">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold from-purple-600 via-pink-500 to-purple-500 bg-linear-to-r text-transparent bg-clip-text">
                    Sleep AI Analysis
                  </h2>

                  <div className='flex gap-6 items-center'>
                    <div className="px-4 py-2 rounded-full   text-purple-500 font-semibold border border-purple-400/30">
                      Score: {analysisResult?.sleepScore}/100
                    </div>

                    <Button
                      className='px-4 cursor-pointer py-5 rounded-full bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 text-white'
                    >Download Analysis</Button>
                  </div>

                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800/60 rounded-full h-3 mb-6 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-linear-to-r from-purple-400 via-cyan-400 to-teal-400"
                    style={{ width: `${analysisResult?.sleepScore}%` }}
                  />
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 from-purple-600 via-pink-500 to-purple-500 bg-linear-to-r text-transparent bg-clip-text">
                    Summary
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {analysisResult?.summary}
                  </p>
                </div>

                {/* Issues */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 from-purple-600 via-pink-500 to-purple-500 bg-linear-to-r text-transparent bg-clip-text">
                    Detected Issues
                  </h3>

                  <div className="space-y-2">
                    {analysisResult?.detectedIssues?.map((issue, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg  border border-pink-400/20 text-sm text-pink-400"
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
                        className="p-3 rounded-lg  border border-emerald-400/20 text-sm text-emerald-400"
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
      )}



    </>

  )
}
