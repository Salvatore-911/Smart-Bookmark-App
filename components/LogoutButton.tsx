"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    
    // redirect to home page
    router.push("/");
    
    // refresh page to clear session
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
}
