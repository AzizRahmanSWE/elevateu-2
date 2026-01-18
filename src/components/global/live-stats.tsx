'use client';
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, Dumbbell, Clock } from 'lucide-react';

interface LiveStatProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
  color: string;
}

function LiveStat({ value, label, icon, suffix = '', color }: LiveStatProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(Math.floor(latest));
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-gray-800/50 p-6 group hover:border-gray-700 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4`}>
          {icon}
        </div>
        <div className="text-4xl font-bold text-white mb-1">
          {displayValue}
          {suffix}
        </div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}

export function LiveStats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Results, Real Time
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of users transforming their fitness journey with data-driven insights
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <LiveStat
            value={12487}
            label="Active Users"
            icon={<Users className="w-6 h-6 text-white" />}
            color="from-blue-500/30 to-cyan-500/30"
          />
          <LiveStat
            value={89234}
            label="Workouts Completed"
            icon={<Dumbbell className="w-6 h-6 text-white" />}
            color="from-purple-500/30 to-pink-500/30"
          />
          <LiveStat
            value={3421}
            label="Hours Logged"
            icon={<Clock className="w-6 h-6 text-white" />}
            color="from-green-500/30 to-emerald-500/30"
          />
          <LiveStat
            value={94}
            label="Avg. Satisfaction"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            suffix="%"
            color="from-orange-500/30 to-red-500/30"
          />
        </div>
      </div>
    </section>
  );
}
