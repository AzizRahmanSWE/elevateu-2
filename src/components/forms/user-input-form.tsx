"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { 
  Loader2, 
  User, 
  Activity, 
  Heart, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Dumbbell,
  Scale,
  Ruler,
  Calendar,
  Mail,
  Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email"),
  age: z.coerce.number().min(13, "Must be at least 13 years old").max(120, "Please enter a valid age"),
  gender: z.enum(["Male", "Female", "Other"]),
  heightCm: z.coerce.number().min(100, "Min 100cm").max(250, "Max 250cm"),
  weightKg: z.coerce.number().min(30, "Min 30kg").max(300, "Max 300kg"),
  fitnessLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  medicalHistory: z.string().optional(),
  lifestyleHabits: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Step definitions with icons and descriptions
const steps = [
  { id: 1, name: "Personal", icon: User, description: "Basic information" },
  { id: 2, name: "Physical", icon: Activity, description: "Body metrics" },
  { id: 3, name: "Fitness", icon: Dumbbell, description: "Experience level" },
  { id: 4, name: "Health", icon: Heart, description: "Medical & lifestyle" },
];

// Gender options with icons
const genderOptions = [
  { value: "Male", label: "Male", emoji: "👨" },
  { value: "Female", label: "Female", emoji: "👩" },
  { value: "Other", label: "Other", emoji: "🧑" },
];

// Fitness level options with descriptions
const fitnessOptions = [
  { 
    value: "Beginner", 
    label: "Beginner",
    description: "New to fitness or returning after a long break",
    emoji: "🌱",
    color: "from-green-500/20 to-emerald-500/20 border-green-500/30"
  },
  { 
    value: "Intermediate", 
    label: "Intermediate",
    description: "Consistent training for 6+ months",
    emoji: "💪",
    color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
  },
  { 
    value: "Advanced", 
    label: "Advanced",
    description: "Years of experience with structured training",
    emoji: "🔥",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30"
  },
];

// BMI Calculator component
function BMIIndicator({ height, weight }: { height: number; weight: number }) {
  const bmi = useMemo(() => {
    if (height && weight && height > 0) {
      return (weight / Math.pow(height / 100, 2)).toFixed(1);
    }
    return null;
  }, [height, weight]);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400", bg: "bg-blue-500/20" };
    if (bmi < 25) return { label: "Healthy", color: "text-green-400", bg: "bg-green-500/20" };
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400", bg: "bg-yellow-500/20" };
    return { label: "Obese", color: "text-red-400", bg: "bg-red-500/20" };
  };

  if (!bmi) return null;
  
  const category = getBMICategory(parseFloat(bmi));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("p-4 rounded-xl border border-gray-700/50", category.bg)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Your BMI</p>
          <p className={cn("text-2xl font-bold", category.color)}>{bmi}</p>
        </div>
        <div className="text-right">
          <p className={cn("text-sm font-medium", category.color)}>{category.label}</p>
          <p className="text-xs text-gray-500">Body Mass Index</p>
        </div>
      </div>
    </motion.div>
  );
}

// Progress indicator component
function StepIndicator({ currentStep, steps }: { currentStep: number; steps: typeof steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: currentStep >= step.id ? "rgb(147, 51, 234)" : "rgb(31, 41, 55)",
                }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                  currentStep >= step.id ? "border-purple-500" : "border-gray-700"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <step.icon className={cn(
                    "w-5 h-5",
                    currentStep >= step.id ? "text-white" : "text-gray-500"
                  )} />
                )}
              </motion.div>
              <span className={cn(
                "mt-2 text-xs font-medium hidden sm:block",
                currentStep >= step.id ? "text-purple-400" : "text-gray-500"
              )}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={false}
                    animate={{
                      width: currentStep > step.id ? "100%" : "0%"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface CompleteProfileFormProps {
  mode?: 'complete' | 'update';
}

export function CompleteProfileForm({ mode = 'complete' }: CompleteProfileFormProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isUpdateMode = mode === 'update';

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 25,
      gender: "Male",
      heightCm: 170,
      weightKg: 70,
      fitnessLevel: "Beginner",
      medicalHistory: "",
      lifestyleHabits: "",
    },
    mode: "onChange",
  });

  const watchHeight = form.watch("heightCm");
  const watchWeight = form.watch("weightKg");

  // Fetch user profile
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }

        form.setValue("email", user.email!);

        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
          return;
        }

        if (profile) {
          const sanitizedProfile: ProfileFormData = {
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: user.email!,
            age: profile.age ?? 25,
            gender: profile.gender || "Male",
            heightCm: profile.heightCm ?? 170,
            weightKg: profile.weightKg ?? 70,
            fitnessLevel: profile.fitnessLevel || "Beginner",
            medicalHistory: profile.medicalHistory || "",
            lifestyleHabits: profile.lifestyleHabits || "",
          };
          form.reset(sanitizedProfile);
        }
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
        toast.error("Failed to load profile data");
        setIsDataLoaded(true);
      }
    }

    fetchUserProfile();
  }, [supabase, form, router]);

  // Step validation
  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof ProfileFormData)[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "email"];
        break;
      case 2:
        fieldsToValidate = ["age", "gender", "heightCm", "weightKg"];
        break;
      case 3:
        fieldsToValidate = ["fitnessLevel"];
        break;
      case 4:
        fieldsToValidate = ["medicalHistory", "lifestyleHabits"];
        break;
    }
    
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    // Ensure all required fields are filled
    const requiredFields = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      age: data.age,
      gender: data.gender,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      fitnessLevel: data.fitnessLevel,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || (typeof value === 'number' && value === 0))
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(`Please complete all required fields: ${missingFields.join(', ')}`);
      // Navigate to the step with missing fields
      if (missingFields.some(f => ['firstName', 'lastName', 'email'].includes(f))) {
        setCurrentStep(1);
      } else if (missingFields.some(f => ['age', 'gender', 'heightCm', 'weightKg'].includes(f))) {
        setCurrentStep(2);
      } else if (missingFields.includes('fitnessLevel')) {
        setCurrentStep(3);
      }
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not found");

      const timestamp = new Date().toISOString();

      const { error } = await supabase.from("user_profiles").upsert(
        {
          user_id: user.id,
          email: user.email,
          ...data,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
        {
          onConflict: "user_id",
          ignoreDuplicates: false,
        }
      );

      if (error) throw error;

      if (isUpdateMode) {
        toast.success("Profile updated successfully! ✅");
        router.refresh();
      } else {
        toast.success("Profile completed! Let's start your fitness journey! 🎉");
        // Small delay to show success message
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to complete profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDataLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isUpdateMode && <StepIndicator currentStep={currentStep} steps={steps} />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Let's get to know you</h2>
                  <p className="text-gray-400 mt-2">Tell us a bit about yourself</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">First Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                              {...field} 
                              placeholder="John" 
                              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 h-12"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Last Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                              {...field} 
                              placeholder="Doe" 
                              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 h-12"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                          <Input 
                            {...field} 
                            disabled 
                            type="email"
                            className="pl-10 bg-gray-800/50 border-gray-700 h-12 text-gray-400 cursor-not-allowed"
                          />
                        </div>
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 2: Physical Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                    <Activity className="w-8 h-8 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Physical Details</h2>
                  <p className="text-gray-400 mt-2">Help us personalize your workouts</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Age</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                              {...field}
                              type="number"
                              min={13}
                              max={120}
                              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 h-12"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Gender</FormLabel>
                        <FormControl>
                          <div className="flex gap-2">
                            {genderOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  "flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200",
                                  field.value === option.value
                                    ? "border-purple-500 bg-purple-500/20 text-white"
                                    : "border-gray-700 bg-gray-900/50 text-gray-400 hover:border-gray-600"
                                )}
                              >
                                <span className="text-lg">{option.emoji}</span>
                                <span className="ml-2 text-sm">{option.label}</span>
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="heightCm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Height (cm)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                              {...field}
                              type="number"
                              min={100}
                              max={250}
                              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 h-12"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weightKg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Weight (kg)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                              {...field}
                              type="number"
                              min={30}
                              max={300}
                              className="pl-10 bg-gray-900/50 border-gray-700 focus:border-purple-500 h-12"
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Real-time BMI Indicator */}
                <BMIIndicator height={watchHeight} weight={watchWeight} />
              </motion.div>
            )}

            {/* Step 3: Fitness Level */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-4">
                    <Dumbbell className="w-8 h-8 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">What's your fitness level?</h2>
                  <p className="text-gray-400 mt-2">We'll customize your workouts accordingly</p>
                </div>

                <FormField
                  control={form.control}
                  name="fitnessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid gap-4">
                          {fitnessOptions.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={cn(
                                "relative p-6 rounded-xl border-2 text-left transition-all duration-200",
                                field.value === option.value
                                  ? `bg-gradient-to-r ${option.color} border-purple-500`
                                  : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <span className="text-4xl">{option.emoji}</span>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-white">{option.label}</h3>
                                  <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                                </div>
                                {field.value === option.value && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                                  >
                                    <Check className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 4: Health Information */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                    <Heart className="w-8 h-8 text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Health & Lifestyle</h2>
                  <p className="text-gray-400 mt-2">Optional but helps us create safer workouts</p>
                </div>

                <FormField
                  control={form.control}
                  name="medicalHistory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Medical History
                        <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any injuries, conditions, or limitations we should know about? (e.g., back pain, asthma, joint issues)"
                          className="bg-gray-900/50 border-gray-700 focus:border-purple-500 min-h-[120px] resize-none"
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        This helps us recommend exercises that are safe for you
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lifestyleHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Lifestyle Habits
                        <span className="text-gray-500 text-xs ml-2">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Tell us about your daily routine, sleep schedule, diet preferences, or fitness goals..."
                          className="bg-gray-900/50 border-gray-700 focus:border-purple-500 min-h-[120px] resize-none"
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500 mt-1">
                        Helps us tailor your workout schedule and nutrition tips
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Summary Card */}
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Ready to elevate your fitness!</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p className="text-white">{form.watch("firstName")} {form.watch("lastName")}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Age</p>
                      <p className="text-white">{form.watch("age")} years</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Height / Weight</p>
                      <p className="text-white">{form.watch("heightCm")}cm / {form.watch("weightKg")}kg</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fitness Level</p>
                      <p className="text-white">{form.watch("fitnessLevel")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={cn(
                "gap-2",
                currentStep === 1 && "opacity-0 pointer-events-none"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!form.formState.isValid}
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 min-w-[160px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {isUpdateMode ? 'Update Profile' : 'Complete Profile'}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
