"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }: any) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id);

    setBookmarks(data || []);
  };

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Bookmarks:</h3>

      {bookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          {bookmark.title}

          <button
            onClick={() => deleteBookmark(bookmark.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
