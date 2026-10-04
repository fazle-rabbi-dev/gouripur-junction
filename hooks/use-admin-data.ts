"use client";

import { useEffect, useState } from "react";

import type { AdminPost, Banner } from "@/@types/admin";
import { MOCK_BANNER, MOCK_POSTS } from "@/constants/admin-mock";

const KEYS = { banner: "gj-banner", posts: "gj-posts" };

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// Banner + posts are still local mocks (no DB actions yet).
// Trains come from MongoDB via getTrains + lib/actions/trains.
export function useAdminData() {
  const [banner, setBanner] = useState<Banner>(MOCK_BANNER);
  const [posts, setPosts] = useState<AdminPost[]>(MOCK_POSTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBanner(load(KEYS.banner, MOCK_BANNER));
    setPosts(load(KEYS.posts, MOCK_POSTS));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(KEYS.banner, JSON.stringify(banner));
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
  }, [banner, posts, loaded]);

  return { banner, setBanner, posts, setPosts };
}

export type AdminData = ReturnType<typeof useAdminData>;
