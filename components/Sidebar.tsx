"use client";

import Link from "next/link";
import { Bookmark, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar({ user }: any) {

  const pathname = usePathname();

  function linkClass(path: string) {
    return `flex gap-2 items-center p-2 rounded-lg cursor-pointer transition ${
      pathname === path
        ? "bg-white/20"
        : "hover:bg-white/10"
    }`;
  }

  return (

    <div className="glass w-64 p-6 flex flex-col justify-between">

      <div>

        <div className="flex items-center gap-2 mb-8">
          <Bookmark />
          <h1 className="font-bold text-lg">
            Smart Bookmark
          </h1>
        </div>

        <div className="space-y-2">

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <Bookmark size={18}/>
            Dashboard
          </Link>

          <Link href="/profile" className={linkClass("/profile")}>
            <User size={18}/>
            Profile
          </Link>

        </div>

      </div>

      <div className="text-sm text-gray-300">

        Logged in as:
        <br/>
        {user?.email}

        <img
  src={`https://fsnrbgslkpzeqwbtmqvj.supabase.co/storage/v1/object/public/avatars/${user.id}.png`}
  className="w-10 h-10 rounded-full mb-2"
/>

      </div>

    </div>

  );

}
