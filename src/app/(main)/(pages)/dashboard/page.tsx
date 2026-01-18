'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  TrendingUp, 
  Calendar, 
  Target, 
  Activity,
  Flame,
  Award,
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  User,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProgressChart } from '@/components/global/progress-chart';

interface UserProfile {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  heightCm: number;
  weightKg: number;
  fitnessLevel: string;
  email: string;
}

interface DashboardStats {
  totalWorkouts: number;
  completedWorkouts: number;
  currentStreak: number;
  totalExercises: number;
}

interface ProgressData {
  date: string;
  value: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalWorkouts: 0,
    completedWorkouts: 0,
    currentStreak: 0,
    totalExercises: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [bmi, setBmi] = useState<number | null>(null);
  const [weightProgress, setWeightProgress] = useState<ProgressData[]>([]);
  const [workoutFrequency, setWorkoutFrequency] = useState<ProgressData[]>([]);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile error:', profileError);
          return;
        }

        if (profileData) {
          setProfile(profileData as UserProfile);
          
          // Calculate BMI
          if (profileData.heightCm && profileData.weightKg) {
            const bmiValue = profileData.weightKg / Math.pow(profileData.heightCm / 100, 2);
            setBmi(parseFloat(bmiValue.toFixed(1)));
          }

          // Fetch workout stats
          const { data: workouts, error: workoutsError } = await supabase
            .from('workout_sessions')
            .select('id, date')
            .eq('userId', profileData.id)
            .order('date', { ascending: false })
            .limit(30);

          if (!workoutsError && workouts) {
            setStats({
              totalWorkouts: workouts.length,
              completedWorkouts: workouts.length,
              currentStreak: calculateStreak(workouts.map(w => w.date)),
              totalExercises: 0, // TODO: Calculate from session_exercises
            });

            // Generate workout frequency data (last 7 days)
            const last7Days = Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              return date.toISOString().split('T')[0];
            });

            const frequencyData = last7Days.map(date => ({
              date,
              value: workouts.filter(w => w.date.startsWith(date)).length,
            }));
            setWorkoutFrequency(frequencyData);
          }

          // Fetch progress entries for weight tracking
          const { data: progressEntries } = await supabase
            .from('progress_entries')
            .select('date, weightKg')
            .eq('userId', profileData.id)
            .order('date', { ascending: false })
            .limit(14);

          if (progressEntries && progressEntries.length > 0) {
            const weightData = progressEntries
              .reverse()
              .filter(p => p.weightKg)
              .map(p => ({
                date: p.date,
                value: p.weightKg!,
              }));
            setWeightProgress(weightData);
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [supabase, router]);

  function calculateStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
    
    const sortedDates = dates
      .map(d => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());
    
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      date.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  function getBMICategory(bmi: number) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' };
    if (bmi < 25) return { label: 'Healthy', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    return { label: 'Obese', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
  }

  function getFitnessLevelColor(level: string) {
    switch (level) {
      case 'Beginner': return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'Intermediate': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'Advanced': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default: return 'from-gray-500/20 to-gray-500/20 border-gray-500/30';
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <User className="w-16 h-16 text-gray-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Profile Not Found</h2>
        <p className="text-gray-400 mb-6">Please complete your profile to continue</p>
        <Link href="/complete-profile">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
            Complete Profile
          </Button>
        </Link>
      </div>
    );
  }

  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const fitnessColor = getFitnessLevelColor(profile.fitnessLevel);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome back, {profile.firstName}! 👋
          </h1>
          <p className="text-gray-400">
            Ready to crush your fitness goals today?
          </p>
        </div>
        <Link href="/settings">
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Edit Profile
          </Button>
        </Link>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Workouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Dumbbell className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.totalWorkouts}</span>
          </div>
          <p className="text-sm text-gray-400">Total Workouts</p>
        </motion.div>

        {/* Current Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-8 h-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">{stats.currentStreak}</span>
          </div>
          <p className="text-sm text-gray-400">Day Streak</p>
        </motion.div>

        {/* Completed Workouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.completedWorkouts}</span>
          </div>
          <p className="text-sm text-gray-400">Completed</p>
        </motion.div>

        {/* Fitness Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={cn("bg-gradient-to-br border rounded-xl p-6", fitnessColor)}
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-purple-400" />
            <span className="text-lg font-bold text-white">{profile.fitnessLevel}</span>
          </div>
          <p className="text-sm text-gray-400">Fitness Level</p>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card & BMI */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                {profile.firstName[0]}{profile.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-gray-400">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Age</span>
                <span className="text-white font-medium">{profile.age} years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Gender</span>
                <span className="text-white font-medium">{profile.gender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Height</span>
                <span className="text-white font-medium">{profile.heightCm} cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Weight</span>
                <span className="text-white font-medium">{profile.weightKg} kg</span>
              </div>
            </div>
          </motion.div>

          {/* BMI Card */}
          {bmi && bmiCategory && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={cn("border rounded-xl p-6", bmiCategory.bg, bmiCategory.border)}
            >
              <div className="flex items-center justify-between mb-4">
                <Activity className={cn("w-8 h-8", bmiCategory.color)} />
                <div className="text-right">
                  <span className={cn("text-3xl font-bold", bmiCategory.color)}>{bmi}</span>
                  <p className="text-xs text-gray-400">BMI</p>
                </div>
              </div>
              <p className={cn("text-sm font-medium", bmiCategory.color)}>{bmiCategory.label}</p>
              <p className="text-xs text-gray-500 mt-2">
                Body Mass Index: {profile.heightCm}cm / {profile.weightKg}kg
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Column - Quick Actions & Upcoming */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/all-workouts">
                <Button className="w-full justify-start gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 h-auto py-4">
                  <Plus className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Create Workout</div>
                    <div className="text-xs opacity-90">Start a new program</div>
                  </div>
                </Button>
              </Link>
              <Link href="/current-workouts">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Calendar className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">View Schedule</div>
                    <div className="text-xs opacity-70">See your workouts</div>
                  </div>
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Dumbbell className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Browse Templates</div>
                    <div className="text-xs opacity-70">Find inspiration</div>
                  </div>
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                  <Settings className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">Update Profile</div>
                    <div className="text-xs opacity-70">Edit your info</div>
                  </div>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Progress Charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Your Progress
              </h2>
              {stats.totalWorkouts === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No workouts yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Start your fitness journey by creating your first workout plan. Our AI will help you build a personalized program!
                  </p>
                  <Link href="/all-workouts">
                    <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                      <Plus className="w-4 h-4" />
                      Create Your First Workout
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {workoutFrequency.length > 0 && (
                    <ProgressChart
                      data={workoutFrequency}
                      label="Workout Frequency (Last 7 Days)"
                      color="bg-gradient-to-t from-purple-500 to-pink-500"
                    />
                  )}
                  {weightProgress.length > 0 && (
                    <ProgressChart
                      data={weightProgress}
                      label="Weight Progress"
                      color="bg-gradient-to-t from-blue-500 to-cyan-500"
                      unit="kg"
                    />
                  )}
                  {workoutFrequency.length === 0 && weightProgress.length === 0 && (
                    <div className="col-span-2 text-center py-8 text-gray-400">
                      Complete more workouts to see your progress charts
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
