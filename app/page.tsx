"use client";

import { useEffect, useState } from "react";
import LoginButton from "@/components/LoginButton";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Smart Bookmark</h1>
      <LoginButton />
    </main>
  );
}
