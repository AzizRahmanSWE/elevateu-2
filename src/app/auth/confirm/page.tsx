'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, Dumbbell, ArrowRight } from 'lucide-react'

export default function AuthConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  
  const success = searchParams.get('success') === 'true'
  const error = searchParams.get('error')
  const next = searchParams.get('next') ?? '/dashboard'

  useEffect(() => {
    if (success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push(next)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [success, next, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-md w-full"
      >
        <div className="bg-black/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ElevateU
              </span>
            </div>
          </div>

          {success ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                Email Verified! 🎉
              </h1>
              <p className="text-gray-400 mb-6">
                Your account has been successfully verified. Welcome to ElevateU!
              </p>

              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Get ready to transform your fitness journey with personalized AI-powered workout plans.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-500 text-sm">
                  Redirecting to dashboard in <span className="text-purple-400 font-bold">{countdown}</span> seconds...
                </p>
                
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 5, ease: 'linear' }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                  />
                </div>

                <Link
                  href={next}
                  className="group inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Continue to Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-500" />
                </div>
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                Verification Failed
              </h1>
              <p className="text-gray-400 mb-6">
                {decodeURIComponent(error)}
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-300">
                  The verification link may have expired or already been used. Please try signing up again or contact support.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Try Again
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
              </div>
              <h1 className="text-xl font-bold text-white mb-2">
                Verifying your email...
              </h1>
              <p className="text-gray-400">
                Please wait while we confirm your account.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Need help?{' '}
          <Link href="#" className="text-purple-400 hover:text-purple-300">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
