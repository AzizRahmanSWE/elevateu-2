'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock,
  CheckCircle,
  Play,
  TrendingUp,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CurrentWorkout {
  id: string;
  programId: string;
  workoutDayId: string | null;
  date: string;
  program?: {
    name: string;
  };
  workoutDay?: {
    dayNumber: number;
    name: string | null;
  };
}

export default function CurrentWorkoutsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [workouts, setWorkouts] = useState<CurrentWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function loadCurrentWorkouts() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!profile) return;

        // Get upcoming/current workout sessions
        const { data: sessions, error } = await supabase
          .from('workout_sessions')
          .select(`
            id,
            programId,
            workoutDayId,
            date,
            program:workout_programs (
              name
            ),
            workoutDay:workout_days (
              dayNumber,
              name
            )
          `)
          .eq('userId', profile.id)
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .limit(10);

        if (error) throw error;

        // Calculate streak
        const { data: allSessions } = await supabase
          .from('workout_sessions')
          .select('date')
          .eq('userId', profile.id)
          .order('date', { ascending: false });

        if (allSessions) {
          let currentStreak = 0;
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          for (const session of allSessions) {
            const sessionDate = new Date(session.date);
            sessionDate.setHours(0, 0, 0, 0);
            const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === currentStreak) {
              currentStreak++;
            } else {
              break;
            }
          }
          setStreak(currentStreak);
        }

        setWorkouts(sessions || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading workouts:', error);
        setIsLoading(false);
      }
    }

    loadCurrentWorkouts();
  }, [supabase, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Current Workouts
          </h1>
          <p className="text-gray-400">
            Your upcoming workout schedule
          </p>
        </div>
        <Link href="/all-workouts">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Browse All
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-white">{streak}</p>
            </div>
            <Flame className="w-12 h-12 text-orange-400" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Upcoming</p>
              <p className="text-3xl font-bold text-white">{workouts.length}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>
      </div>

      {/* Workouts List */}
      {workouts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No upcoming workouts
          </h3>
          <p className="text-gray-400 mb-6">
            Start your fitness journey by creating a workout program
          </p>
          <Link href="/all-workouts">
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
              <Play className="w-4 h-4" />
              Create Workout Plan
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {workout.program?.name || 'Workout Session'}
                    </h3>
                    {workout.workoutDay && (
                      <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                        Day {workout.workoutDay.dayNumber}
                      </span>
                    )}
                  </div>
                  {workout.workoutDay?.name && (
                    <p className="text-gray-400 mb-4">{workout.workoutDay.name}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(workout.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(workout.date).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
                  onClick={() => router.push(`/workout/${workout.id}`)}
                >
                  <Play className="w-4 h-4" />
                  Start
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
