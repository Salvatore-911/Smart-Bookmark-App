"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";
import ThemeToggle from "@/components/ThemeToggle";
import ProfileForm from "@/components/ProfileForm";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  }

  if (!user) return <div>Loading...</div>;

  return (

    <div className="min-h-screen flex">

      <Sidebar user={user}/>

      <div className="flex-1 p-8">

        <div className="flex justify-between mb-6">

          <h1 className="text-2xl font-bold">
            Profile
          </h1>

          <div className="flex gap-2">
            <ThemeToggle/>
            <LogoutButton/>
          </div>

        </div>

        <ProfileForm user={user}/>

      </div>

    </div>

  );

}
