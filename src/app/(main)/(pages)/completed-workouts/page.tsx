'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar,
  Clock,
  TrendingUp,
  Award,
  BarChart3,
  Repeat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CompletedWorkout {
  id: string;
  date: string;
  program?: {
    name: string;
  };
  workoutDay?: {
    dayNumber: number;
    name: string | null;
  };
  sessionExercises?: Array<{
    exercise: {
      name: string;
    };
    sets: Array<{
      reps: number;
      weightKg: number;
    }>;
  }>;
}

export default function CompletedWorkoutsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [workouts, setWorkouts] = useState<CompletedWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCompleted: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    async function loadCompletedWorkouts() {
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

        // Get completed workout sessions (past dates)
        const { data: sessions, error } = await supabase
          .from('workout_sessions')
          .select(`
            id,
            date,
            program:workout_programs (
              name
            ),
            workoutDay:workout_days (
              dayNumber,
              name
            ),
            sessionExercises:session_exercises (
              exercise:Exercise (
                name
              ),
              sets (
                reps,
                weightKg
              )
            )
          `)
          .eq('userId', profile.id)
          .lt('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: false })
          .limit(50);

        if (error) throw error;

        // Calculate stats
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const thisWeek = sessions?.filter(s => new Date(s.date) >= weekAgo).length || 0;
        const thisMonth = sessions?.filter(s => new Date(s.date) >= monthAgo).length || 0;

        setStats({
          totalCompleted: sessions?.length || 0,
          thisWeek,
          thisMonth,
        });

        setWorkouts(sessions || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading workouts:', error);
        setIsLoading(false);
      }
    }

    loadCompletedWorkouts();
  }, [supabase, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your history...</p>
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
            Completed Workouts
          </h1>
          <p className="text-gray-400">
            Track your fitness journey and progress
          </p>
        </div>
        <Link href="/all-workouts">
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
            <Repeat className="w-4 h-4" />
            Start New Workout
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">Total Completed</p>
              <p className="text-3xl font-bold text-white">{stats.totalCompleted}</p>
            </div>
            <Award className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">This Week</p>
              <p className="text-3xl font-bold text-white">{stats.thisWeek}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-400" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">This Month</p>
              <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-400" />
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
            <CheckCircle className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No completed workouts yet
          </h3>
          <p className="text-gray-400 mb-6">
            Complete your first workout to start tracking your progress
          </p>
          <Link href="/all-workouts">
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
              <CheckCircle className="w-4 h-4" />
              Start Your First Workout
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
              transition={{ delay: index * 0.05 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <h3 className="text-xl font-bold text-white">
                      {workout.program?.name || 'Workout Session'}
                    </h3>
                    {workout.workoutDay && (
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                        Day {workout.workoutDay.dayNumber}
                      </span>
                    )}
                  </div>
                  {workout.workoutDay?.name && (
                    <p className="text-gray-400 mb-4">{workout.workoutDay.name}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(workout.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    {workout.sessionExercises && workout.sessionExercises.length > 0 && (
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>{workout.sessionExercises.length} exercises</span>
                      </div>
                    )}
                  </div>
                  {workout.sessionExercises && workout.sessionExercises.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {workout.sessionExercises.slice(0, 5).map((se, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                        >
                          {se.exercise.name}
                        </span>
                      ))}
                      {workout.sessionExercises.length > 5 && (
                        <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                          +{workout.sessionExercises.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/workout/${workout.id}`)}
                >
                  View Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
