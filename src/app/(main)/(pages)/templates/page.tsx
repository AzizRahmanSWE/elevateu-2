'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Search,
  Filter,
  Sparkles,
  Target,
  Zap,
  Heart,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  focus: string[];
  icon: React.ReactNode;
  color: string;
}

const templates: WorkoutTemplate[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    description: 'Complete upper and lower body workout for building muscle',
    difficulty: 'Intermediate',
    duration: '45-60 min',
    focus: ['Strength', 'Muscle Building', 'Full Body'],
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    difficulty: 'Advanced',
    duration: '20-30 min',
    focus: ['Cardio', 'Fat Loss', 'Endurance'],
    icon: <Zap className="w-6 h-6" />,
    color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  },
  {
    id: '3',
    name: 'Beginner Foundation',
    description: 'Perfect starting point for fitness newcomers',
    difficulty: 'Beginner',
    duration: '30-45 min',
    focus: ['Foundation', 'Mobility', 'Form'],
    icon: <Target className="w-6 h-6" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  },
  {
    id: '4',
    name: 'Core & Abs',
    description: 'Targeted core strengthening and ab sculpting',
    difficulty: 'Intermediate',
    duration: '25-35 min',
    focus: ['Core', 'Abs', 'Stability'],
    icon: <Heart className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  },
  {
    id: '5',
    name: 'Upper Body Power',
    description: 'Build chest, back, shoulders, and arms',
    difficulty: 'Intermediate',
    duration: '40-50 min',
    focus: ['Upper Body', 'Strength', 'Power'],
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
  },
  {
    id: '6',
    name: 'Lower Body Blast',
    description: 'Legs, glutes, and lower body strength',
    difficulty: 'Advanced',
    duration: '45-55 min',
    focus: ['Lower Body', 'Legs', 'Glutes'],
    icon: <Dumbbell className="w-6 h-6" />,
    color: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  },
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || template.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Intermediate':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Advanced':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

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
            Workout Templates
          </h1>
          <p className="text-gray-400">
            Choose from professionally designed workout programs
          </p>
        </div>
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
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={difficultyFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setDifficultyFilter('all')}
            className={difficultyFilter === 'all' ? 'bg-purple-600' : ''}
          >
            All
          </Button>
          <Button
            variant={difficultyFilter === 'Beginner' ? 'default' : 'outline'}
            onClick={() => setDifficultyFilter('Beginner')}
            className={difficultyFilter === 'Beginner' ? 'bg-green-600' : ''}
          >
            Beginner
          </Button>
          <Button
            variant={difficultyFilter === 'Intermediate' ? 'default' : 'outline'}
            onClick={() => setDifficultyFilter('Intermediate')}
            className={difficultyFilter === 'Intermediate' ? 'bg-blue-600' : ''}
          >
            Intermediate
          </Button>
          <Button
            variant={difficultyFilter === 'Advanced' ? 'default' : 'outline'}
            onClick={() => setDifficultyFilter('Advanced')}
            className={difficultyFilter === 'Advanced' ? 'bg-red-600' : ''}
          >
            Advanced
          </Button>
        </div>
      </motion.div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${template.color} border rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${template.color.split(' ')[0]} flex items-center justify-center text-white mb-4`}>
                  {template.icon}
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {template.name}
              </h3>
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {template.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {template.duration}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {template.focus.map((focus, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-full"
                  >
                    {focus}
                  </span>
                ))}
              </div>

              <Link href={`/templates/${template.id}`}>
                <Button className="w-full gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <Sparkles className="w-4 h-4" />
                  Use Template
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
