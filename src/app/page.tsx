'use client';
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/global/infinite-moving-cards";
import { clients, products } from "@/lib/constant";
import { HeroParallax } from "@/components/global/connect-parallax";
import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { CheckIcon, ArrowRight, Sparkles } from "lucide-react";
import { LiveStats } from "@/components/global/live-stats";
import { Testimonials } from "@/components/global/testimonials";
import { InteractiveDemo } from "@/components/global/interactive-demo";
import { Footer } from "@/components/global/footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen w-full rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        {/* Animated Background */}
        <div className="absolute inset-0 h-full w-full">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="flex flex-col mt-[-100px] md:mt-[-50px] relative z-10">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400 font-medium">AI-Powered • Personalized • Results-Driven</span>
                </div>
                
                <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-pink-200 font-bold mb-6 text-center">
                  Transform Your Body.<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                    Elevate Your Life.
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 mb-8 text-center max-w-3xl">
                  Join <span className="text-purple-400 font-semibold">12,487+</span> users who&apos;ve achieved their fitness goals with AI-powered workout plans that adapt to your progress, schedule, and goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="group px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all"
                    >
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-6 text-lg border-2 border-gray-700 hover:border-purple-500 text-white font-semibold rounded-full backdrop-blur-sm bg-gray-900/50"
                    >
                      See How It Works
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    <span>94% user satisfaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      {/* Live Stats */}
      <LiveStats />

      {/* Interactive Demo */}
      <div id="demo">
        <InteractiveDemo />
      </div>

      {/* Social Proof - Moving Cards */}
      <div className="py-20">
        <InfiniteMovingCards
          className=""
          items={clients}
          direction="right"
          speed="slow"
        />
      </div>

      {/* Product Showcase */}
      <section className="relative z-0">
        <HeroParallax products={products} />
      </section>

      {/* Testimonials */}
      <div className="relative z-0">
        <Testimonials />
      </div>

      {/* Pricing Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your fitness journey. All plans include our core features.
            </p>
          </div>
          
          <div className="flex flex-wrap items-start justify-center flex-col md:flex-row gap-8 relative z-10">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-900/80 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/20 dark:bg-black dark:border-gray-800 border-gray-800 w-full md:!w-[350px] h-auto rounded-2xl p-8 border hover:border-purple-500/50 transition-all">
                <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                  Starter
                </CardItem>
                <CardItem translateZ="60" className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </CardItem>
                <CardItem translateZ="60" className="text-gray-300 text-sm mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">3 workout plans</strong> per month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">100+ exercises</strong> in library</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Progress tracking</strong> & analytics</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Basic AI recommendations</strong></span>
                  </div>
                </CardItem>
                <CardItem translateZ={20} as="div" className="mt-8">
                  <Link href="/signup" className="block">
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                      Get Started Free
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var">
              <CardBody className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/30 dark:bg-black dark:border-purple-500/50 border-purple-500/50 w-full md:!w-[350px] h-auto rounded-2xl p-8 pt-12 border-2 hover:border-purple-400 transition-all md:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold text-white z-20">
                  Most Popular
                </div>
                <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                  Pro
                </CardItem>
                <CardItem translateZ="60" className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$29</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                </CardItem>
                <CardItem translateZ="60" className="text-gray-200 text-sm mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Unlimited workout plans</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">500+ exercises</strong> with video guides</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Advanced analytics</strong> & insights</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">AI-powered adaptations</strong> based on progress</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Priority support</strong></span>
                  </div>
                </CardItem>
                <CardItem translateZ={20} as="div" className="mt-8">
                  <Link href="/signup" className="block">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white">
                      Start Pro Trial
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>

            <CardContainer className="inter-var">
              <CardBody className="bg-gray-900/80 backdrop-blur-xl relative group/card dark:hover:shadow-2xl dark:hover:shadow-purple-500/20 dark:bg-black dark:border-gray-800 border-gray-800 w-full md:!w-[350px] h-auto rounded-2xl p-8 border hover:border-purple-500/50 transition-all mt-0 md:mt-0">
                <CardItem translateZ="50" className="text-xl font-bold text-white mb-2">
                  Enterprise
                </CardItem>
                <CardItem translateZ="60" className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">$99</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </CardItem>
                <CardItem translateZ="60" className="text-gray-300 text-sm mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Everything in Pro</strong></span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Custom AI models</strong> for your goals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Team collaboration</strong> features</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">API access</strong> for integrations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Dedicated account manager</strong></span>
                  </div>
                </CardItem>
                <CardItem translateZ={20} as="div" className="mt-8">
                  <Link href="/signup" className="block">
                    <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
                      Contact Sales
                    </Button>
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Elevate Your Fitness?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of users achieving their goals with AI-powered personalization
            </p>
            <Link href="/signup">
              <Button size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-full">
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
