"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginButton() {

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <button onClick={handleLogin}>
      Continue with Google
    </button>
  );
}
