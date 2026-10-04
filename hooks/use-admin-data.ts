"use client";

import { useEffect, useState } from "react";

import type { AdminPost } from "@/@types/admin";
import { MOCK_POSTS } from "@/constants/admin-mock";

const KEYS = { posts: "gj-posts" };

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Posts are still local mocks (no DB actions yet).
// Trains + banner come from MongoDB via getters + lib/actions.
export function useAdminData() {
  const [posts, setPosts] = useState<AdminPost[]>(MOCK_POSTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPosts(load(KEYS.posts, MOCK_POSTS));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
  }, [posts, loaded]);

  return { posts, setPosts };
}

export type AdminData = ReturnType<typeof useAdminData>;
