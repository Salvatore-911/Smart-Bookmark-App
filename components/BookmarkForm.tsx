"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ border: "1px solid black", marginRight: "10px" }}
      />

      <input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ border: "1px solid black", marginRight: "10px" }}
      />

      <button onClick={addBookmark}>
        Add Bookmark
      </button>
    </div>
  );
}
