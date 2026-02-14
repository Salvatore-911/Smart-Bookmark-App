"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfileForm({ user }: any) {

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setName(data.full_name || "");
      setAvatar(data.avatar_url || "");
    }

  }

  async function uploadAvatar(e: any) {

    try {

      setUploading(true);

      const file = e.target.files[0];

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}.${fileExt}`;

      await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setAvatar(data.publicUrl);

      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        avatar_url: data.publicUrl,
        full_name: name,
      });

    } finally {
      setUploading(false);
    }

  }

  async function saveProfile() {

    await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: name,
      avatar_url: avatar,
    });

    alert("Profile saved");

  }

  return (

    <div className="glass p-6">

      <div className="mb-4">

        <img
          src={avatar || "https://via.placeholder.com/100"}
          width={100}
          height={100}
          className="rounded-full mb-2"
        />

        <input type="file" onChange={uploadAvatar} />

      </div>

      <input
        className="input mb-3 w-full"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={saveProfile}
        className="btn btn-primary"
      >
        Save Profile
      </button>

    </div>

  );

}
