import React from 'react'
import { SleepDataProvider } from './context/SleepDataContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
    <SleepDataProvider>
        {children}
    </SleepDataProvider>
    </>
  )
}
