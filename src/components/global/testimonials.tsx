'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  result: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    image: '/api/placeholder/64/64',
    content: 'Lost 15lbs in 3 months following personalized workouts. The AI adapts to my schedule and energy levels perfectly.',
    rating: 5,
    result: '15lbs lost • 3 months',
  },
  {
    name: 'Marcus Johnson',
    role: 'Personal Trainer',
    image: '/api/placeholder/64/64',
    content: 'As a trainer, I use ElevateU to create programs for clients. The exercise library and progression tracking are unmatched.',
    rating: 5,
    result: '50+ clients • 4.9/5 rating',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    image: '/api/placeholder/64/64',
    content: 'Finally a fitness app that understands my goals. The progress visualization keeps me motivated, and I\'ve hit every milestone.',
    rating: 5,
    result: '12 weeks • 100% goals met',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Real People
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community is saying.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20 group-hover:text-purple-500/40 transition-colors" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{testimonial.content}</p>

              <div className="pt-4 border-t border-gray-800">
                <div className="text-sm font-medium text-purple-400">{testimonial.result}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
