'use client';
import Link from 'next/link';
import { Dumbbell, Mail, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ElevateU
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Transform your fitness journey with AI-powered workout plans, progress tracking, and personalized coaching.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/all-workouts" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Workouts
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 ElevateU. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
