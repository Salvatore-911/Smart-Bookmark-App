"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginButton() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <button
      onClick={login}
      className="btn btn-primary text-lg"
    >
      Continue with Google
    </button>
  );
}
