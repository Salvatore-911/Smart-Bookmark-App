"use client";

import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState(true);

  useEffect(() => {

    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setDark(true);
    }

  }, []);

  function toggleTheme() {

    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }

  }

  return (

    <button
      onClick={toggleTheme}
      className="btn btn-primary"
    >
      {dark ? <Sun size={18}/> : <Moon size={18}/>}

    </button>

  );

}
