# Sleep AI Tracker

An AI-powered sleep tracking and analysis platform that helps users monitor their sleep patterns, receive intelligent insights, and improve their sleep quality over time.

Built with **Next.js 16 (App Router)**, **Prisma**, **PostgreSQL (Neon)**, **Clerk Authentication**, and **Google Gemini AI**.

---

## Live Demo

---

## Features

-  Authentication with Clerk (Login / Signup)
-  Track daily sleep data (hours, quality, stress, screen time)
-  AI-powered sleep analysis using Google Gemini
-  Smart insights (patterns, issues, improvements)
-  Personalized recommendations
-  Generate downloadable PDF reports
-  Store analysis history in PostgreSQL (Neon)
-  Real-time UI with loading skeletons
-  Modern responsive UI with Tailwind CSS

---

## AI Feature

The system uses **Google Gemini API** to analyze:

- Sleep duration trends
- Sleep quality patterns
- Stress correlation
- Screen time impact

### Output Example:
```json
{
  "sleepScore": 75,
  "summary": "Your sleep pattern is moderately stable...",
  "detectedIssues": [
    "Irregular sleep schedule",
    "Low sleep duration on weekdays"
  ],
  "recommendations": [
    "Maintain consistent bedtime",
    "Reduce screen time before sleep"
  ]
}