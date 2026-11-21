/**
 * ClaveViva — Supabase Auth & Progress Sync Client
 */
(function (global) {
  // Configuração pública do Supabase (Publishable Key — segura para frontend com RLS)
  const SUPABASE_URL = "https://zfawwhqogtynuygniskz.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_naUBrBzRCU_SQbSiNtpQQQ_7Q8h1VoJ";

  class ClaveSupabase {
    constructor() {
      this.client = null;
      this.user = null;
      this.isConfigured =
        Boolean(global.supabase) &&
        SUPABASE_URL.startsWith("https://") &&
        !SUPABASE_ANON_KEY.includes("COLE_SUA_");

      if (this.isConfigured) {
        this.client = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      }
    }

    async init(onAuthChange) {
      if (!this.isConfigured) {
        if (onAuthChange) onAuthChange(null, false);
        return null;
      }

      const { data } = await this.client.auth.getSession();
      this.user = data?.session?.user || null;
      if (onAuthChange) onAuthChange(this.user, true);

      this.client.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user || null;
        if (onAuthChange) onAuthChange(this.user, true);
      });

      return this.user;
    }

    async signIn(email, password) {
      if (!this.isConfigured) {
        throw new Error("Supabase ainda não configurado. Adicione URL e Anon Key em js/supabase-client.js.");
      }
      const { data, error } = await this.client.auth.signInWithPassword({ email, password });
      if (error) throw error;
      this.user = data.user;
      return data.user;
    }

    async signUp(email, password) {
      if (!this.isConfigured) {
        throw new Error("Supabase ainda não configurado. Adicione URL e Anon Key em js/supabase-client.js.");
      }
      const { data, error } = await this.client.auth.signUp({ email, password });
      if (error) throw error;
      this.user = data.user;
      return data;
    }

    async signOut() {
      if (!this.isConfigured) return;
      await this.client.auth.signOut();
      this.user = null;
    }

    async loadCloudProgress() {
      if (!this.isConfigured || !this.user) return null;
      const { data, error } = await this.client
        .from("user_progress")
        .select("xp, best_streak, stars, last_lesson_id")
        .eq("user_id", this.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    }

    async saveCloudProgress(progress, lastLessonId) {
      if (!this.isConfigured || !this.user) return;
      const payload = {
        user_id: this.user.id,
        xp: progress.xp || 0,
        best_streak: progress.bestStreak || 0,
        stars: progress.stars || {},
        last_lesson_id: lastLessonId || "1.2",
        updated_at: new Date().toISOString()
      };
      const { error } = await this.client
        .from("user_progress")
        .upsert(payload, { onConflict: "user_id" });
      if (error) throw error;
    }

    async recordAttempt({ lessonId, exerciseId, accuracy, stars, xpEarned, mode, bpm }) {
      if (!this.isConfigured || !this.user) return;
      const { error } = await this.client.from("lesson_attempts").insert({
        user_id: this.user.id,
        lesson_id: lessonId,
        exercise_id: exerciseId,
        accuracy,
        stars,
        xp_earned: xpEarned,
        mode,
        bpm
      });
      if (error) throw error;
    }
  }

  global.ClaveCloud = new ClaveSupabase();
})(window);
