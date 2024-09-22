import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <Image src="/logo.png" alt="BytesBuilders Logo" width={120} height={40} />
          <div className="space-x-4">
            <Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
          </div>
        </nav>
      </header>
      
      <main className="max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          BytesBuilders Attendance System
        </h1>
        <p className="mt-3 text-xl text-gray-500 sm:mt-5 sm:text-2xl">
          Easily manage and track attendance for your coding club sessions.
        </p>
        <div className="mt-8 sm:mt-12">
          <Link href="/take-attendance" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
            Take Attendance
          </Link>
        </div>
      </main>
      
      <section className="mt-24 bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Features of BytesBuilders Attendance System
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Easy Check-In</h3>
              <p className="mt-2 text-base text-gray-500">Quick and simple attendance marking for each coding club session.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Attendance Reports</h3>
              <p className="mt-2 text-base text-gray-500">Generate and view detailed attendance reports for individual members or the entire club.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Member Management</h3>
              <p className="mt-2 text-base text-gray-500">Easily add, remove, or update member information in the BytesBuilders club database.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
