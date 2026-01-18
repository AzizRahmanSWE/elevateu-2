'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ProgressChartProps {
  data: { date: string; value: number }[];
  label: string;
  color: string;
  unit?: string;
}

export function ProgressChart({ data, label, color, unit = '' }: ProgressChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);
  const minValue = useMemo(() => Math.min(...data.map(d => d.value)), [data]);
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{label}</h3>
      <div className="h-48 flex items-end gap-2">
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          return (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className={`flex-1 rounded-t ${color} relative group`}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {point.value}{unit}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{new Date(data[0]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span>{new Date(data[data.length - 1]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
}
