'use client';
import { CompleteProfileForm } from "@/components/forms/user-input-form";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-8 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4"
          >
            <SettingsIcon className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Account Settings</span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Update Your Profile
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Keep your information up to date for the best personalized experience
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 sm:p-8 shadow-2xl">
          <CompleteProfileForm mode="update" />
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Your data is secure and will only be used to personalize your experience
        </p>
      </motion.div>
    </div>
  );
}
