'use client';
import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  MoreVertical,
  Play,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface WorkoutProgram {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  createdAt: string;
  workoutDays?: { id: string; dayNumber: number; name: string | null }[];
}

export default function AllWorkoutsPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [workouts, setWorkouts] = useState<WorkoutProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'mine' | 'public'>('all');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Get user profile ID
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (!profile) return;

        let query = supabase
          .from('workout_programs')
          .select(`
            id,
            name,
            description,
            isPublic,
            createdAt,
            workoutDays:workout_days (
              id,
              dayNumber,
              name
            )
          `)
          .order('createdAt', { ascending: false });

        if (filter === 'mine') {
          query = query.eq('creatorId', profile.id);
        } else if (filter === 'public') {
          query = query.eq('isPublic', true);
        }

        const { data, error } = await query;

        if (error) throw error;
        setWorkouts(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading workouts:', error);
        setIsLoading(false);
      }
    }

    loadWorkouts();
  }, [supabase, router, filter]);

  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workout.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading workouts...</p>
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
            All Workouts
          </h1>
          <p className="text-gray-400">
            Create, manage, and discover workout programs
          </p>
        </div>
        <Link href="/all-workouts/create">
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
            <Plus className="w-4 h-4" />
            Create Workout
          </Button>
        </Link>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-purple-600' : ''}
          >
            All
          </Button>
          <Button
            variant={filter === 'mine' ? 'default' : 'outline'}
            onClick={() => setFilter('mine')}
            className={filter === 'mine' ? 'bg-purple-600' : ''}
          >
            My Workouts
          </Button>
          <Button
            variant={filter === 'public' ? 'default' : 'outline'}
            onClick={() => setFilter('public')}
            className={filter === 'public' ? 'bg-purple-600' : ''}
          >
            Public
          </Button>
        </div>
      </motion.div>

      {/* Workouts Grid */}
      {filteredWorkouts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchQuery ? 'No workouts found' : 'No workouts yet'}
          </h3>
          <p className="text-gray-400 mb-6">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first workout program to get started'}
          </p>
          {!searchQuery && (
            <Link href="/all-workouts/create">
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="w-4 h-4" />
                Create Your First Workout
              </Button>
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {workout.name}
                  </h3>
                  {workout.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {workout.description}
                    </p>
                  )}
                </div>
                {workout.isPublic && (
                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full">
                    Public
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(workout.createdAt).toLocaleDateString()}</span>
                </div>
                {workout.workoutDays && workout.workoutDays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{workout.workoutDays.length} days</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => router.push(`/all-workouts/${workout.id}`)}
                >
                  <Play className="w-4 h-4" />
                  View
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => router.push(`/all-workouts/${workout.id}/edit`)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
