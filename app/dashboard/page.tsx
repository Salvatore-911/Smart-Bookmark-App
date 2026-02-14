export const dynamic = "force-dynamic";

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import LogoutButton from "@/components/LogoutButton";

import {
  Plus,
  Trash2,
  Pencil,
  Save,
  Search
} from "lucide-react";

export default function Dashboard() {

  const [user, setUser] = useState<any>(null);

  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {

    getUser();
    fetchBookmarks();
    setupRealtime();

  }, []);

  useEffect(() => {

    filterBookmarks();

  }, [search, bookmarks]);

  async function getUser() {

    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
    }

  }

  async function fetchBookmarks() {

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);

  }

  function setupRealtime() {

    supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks"
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

  }

  function filterBookmarks() {

    const filtered = bookmarks.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );

    setFiltered(filtered);

  }

  async function addBookmark() {

    if (!title || !url) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      category,
      user_id: user.id,
    });

    setTitle("");
    setUrl("");
    setCategory("");

  }

  async function deleteBookmark(id: string) {

    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id);

  }

  async function updateBookmark(id: string) {

    await supabase
      .from("bookmarks")
      .update({
        title,
        url,
        category,
      })
      .eq("id", id);

    setEditingId(null);
    setTitle("");
    setUrl("");
    setCategory("");

  }

  function startEdit(bookmark: any) {

    setEditingId(bookmark.id);

    setTitle(bookmark.title);
    setUrl(bookmark.url);
    setCategory(bookmark.category);

  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex">

      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content */}
      <div className="flex-1 p-8">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <div className="flex gap-2">

            <ThemeToggle />

            <LogoutButton />

          </div>

        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mb-6">

          <Search />

          <input
            className="input w-full"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Add / Edit form */}
        <div className="glass p-4 mb-6 flex gap-3">

          <input
            className="input flex-1"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="input flex-1"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            className="input w-40"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          {editingId ? (

            <button
              onClick={() => updateBookmark(editingId)}
              className="btn btn-primary flex items-center gap-1"
            >
              <Save size={16} />
              Save
            </button>

          ) : (

            <button
              onClick={addBookmark}
              className="btn btn-primary flex items-center gap-1"
            >
              <Plus size={16} />
              Add
            </button>

          )}

        </div>

        {/* Bookmark list */}
        <div className="space-y-3">

          {filtered.map((bookmark) => (

            <div
              key={bookmark.id}
              className="glass p-4 flex justify-between items-center"
            >

              <div>

                <p className="font-semibold">
                  {bookmark.title}
                </p>

                <p className="text-sm text-gray-400">
                  {bookmark.category}
                </p>

                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-blue-400 text-sm"
                >
                  {bookmark.url}
                </a>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => startEdit(bookmark)}
                  className="btn btn-primary"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="btn btn-danger"
                >
                  <Trash2 size={16} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}
