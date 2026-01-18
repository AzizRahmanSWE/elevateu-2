'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dumbbell, Target, Zap, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const workoutTypes = [
  { id: 'strength', name: 'Strength Training', icon: Dumbbell, color: 'from-purple-500 to-pink-500' },
  { id: 'cardio', name: 'HIIT Cardio', icon: Zap, color: 'from-orange-500 to-red-500' },
  { id: 'endurance', name: 'Endurance', icon: Target, color: 'from-blue-500 to-cyan-500' },
  { id: 'recovery', name: 'Recovery', icon: Heart, color: 'from-green-500 to-emerald-500' },
];

export function InteractiveDemo() {
  const [selectedType, setSelectedType] = useState('strength');
  const [generated, setGenerated] = useState(false);

  const selectedWorkout = workoutTypes.find(w => w.id === selectedType);

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our AI analyzes your profile and creates a personalized workout plan in seconds
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Choose Your Focus</h3>
              <div className="grid grid-cols-2 gap-4">
                {workoutTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedType === type.id
                          ? `border-purple-500 bg-gradient-to-br ${type.color} bg-opacity-20`
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-2 ${
                        selectedType === type.id ? 'text-white' : 'text-gray-400'
                      }`} />
                      <div className={`text-sm font-medium ${
                        selectedType === type.id ? 'text-white' : 'text-gray-400'
                      }`}>
                        {type.name}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <Button
                onClick={handleGenerate}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
              >
                Generate Workout Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Output Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Your Personalized Plan</h3>
            {generated ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {selectedWorkout && <selectedWorkout.icon className="w-6 h-6 text-purple-400" />}
                    <h4 className="font-semibold text-white">{selectedWorkout?.name} Program</h4>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-white font-medium">45 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exercises:</span>
                      <span className="text-white font-medium">6 exercises</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <span className="text-white font-medium">Intermediate</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {['Warm-up (5 min)', 'Main Workout (35 min)', 'Cool-down (5 min)'].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a workout type and click generate to see your personalized plan</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
