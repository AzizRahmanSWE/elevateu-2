-- ============================================
-- RLS Policies for ElevateU Fitness App
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable RLS on user_profiles table
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = user_id);

-- ============================================
-- Exercise table (public read, admin write)
-- ============================================
ALTER TABLE "Exercise" ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read exercises
CREATE POLICY "Everyone can view exercises" ON "Exercise"
  FOR SELECT USING (true);

-- ============================================
-- Workout Programs
-- ============================================
ALTER TABLE workout_programs ENABLE ROW LEVEL SECURITY;

-- Users can view their own programs and public programs
CREATE POLICY "Users can view own and public programs" ON workout_programs
  FOR SELECT USING (
    "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    OR "isPublic" = true
  );

-- Users can insert their own programs
CREATE POLICY "Users can insert own programs" ON workout_programs
  FOR INSERT WITH CHECK (
    "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- Users can update their own programs
CREATE POLICY "Users can update own programs" ON workout_programs
  FOR UPDATE USING (
    "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- Users can delete their own programs
CREATE POLICY "Users can delete own programs" ON workout_programs
  FOR DELETE USING (
    "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- ============================================
-- Workout Days
-- ============================================
ALTER TABLE workout_days ENABLE ROW LEVEL SECURITY;

-- Users can view workout days of programs they can access
CREATE POLICY "Users can view accessible workout days" ON workout_days
  FOR SELECT USING (
    "programId" IN (
      SELECT id FROM workout_programs WHERE 
        "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
        OR "isPublic" = true
    )
  );

-- Users can manage workout days of their own programs
CREATE POLICY "Users can insert own workout days" ON workout_days
  FOR INSERT WITH CHECK (
    "programId" IN (
      SELECT id FROM workout_programs WHERE 
        "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    )
  );

CREATE POLICY "Users can update own workout days" ON workout_days
  FOR UPDATE USING (
    "programId" IN (
      SELECT id FROM workout_programs WHERE 
        "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    )
  );

CREATE POLICY "Users can delete own workout days" ON workout_days
  FOR DELETE USING (
    "programId" IN (
      SELECT id FROM workout_programs WHERE 
        "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    )
  );

-- ============================================
-- Workout Exercises
-- ============================================
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view accessible workout exercises" ON workout_exercises
  FOR SELECT USING (
    "workoutDayId" IN (
      SELECT id FROM workout_days WHERE "programId" IN (
        SELECT id FROM workout_programs WHERE 
          "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
          OR "isPublic" = true
      )
    )
  );

CREATE POLICY "Users can manage own workout exercises" ON workout_exercises
  FOR ALL USING (
    "workoutDayId" IN (
      SELECT id FROM workout_days WHERE "programId" IN (
        SELECT id FROM workout_programs WHERE 
          "creatorId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
      )
    )
  );

-- ============================================
-- Workout Sessions
-- ============================================
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions" ON workout_sessions
  FOR SELECT USING (
    "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

CREATE POLICY "Users can manage own sessions" ON workout_sessions
  FOR ALL USING (
    "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- ============================================
-- Session Exercises
-- ============================================
ALTER TABLE session_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session exercises" ON session_exercises
  FOR SELECT USING (
    "sessionId" IN (
      SELECT id FROM workout_sessions WHERE 
        "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    )
  );

CREATE POLICY "Users can manage own session exercises" ON session_exercises
  FOR ALL USING (
    "sessionId" IN (
      SELECT id FROM workout_sessions WHERE 
        "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
    )
  );

-- ============================================
-- Sets
-- ============================================
ALTER TABLE sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sets" ON sets
  FOR SELECT USING (
    "sessionExerciseId" IN (
      SELECT id FROM session_exercises WHERE "sessionId" IN (
        SELECT id FROM workout_sessions WHERE 
          "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
      )
    )
  );

CREATE POLICY "Users can manage own sets" ON sets
  FOR ALL USING (
    "sessionExerciseId" IN (
      SELECT id FROM session_exercises WHERE "sessionId" IN (
        SELECT id FROM workout_sessions WHERE 
          "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
      )
    )
  );

-- ============================================
-- Progress Entries
-- ============================================
ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON progress_entries
  FOR SELECT USING (
    "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

CREATE POLICY "Users can manage own progress" ON progress_entries
  FOR ALL USING (
    "userId" IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- ============================================
-- Grant access to authenticated users
-- ============================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
