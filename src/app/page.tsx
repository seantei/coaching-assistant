import { Inter } from 'next/font/google'
import PracticeForm from '@/components/practice-form'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Coaching Assistant</h1>
      <p className="text-xl mb-8 text-center max-w-3xl">
        Create structured volleyball practice plans tailored to your team&apos;s age group and skill development needs.
      </p>
      
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <PracticeForm />
        </Suspense>
      </div>
    </main>
  )
}
