"use client";

import { useEffect, useState } from "react";

import type { AdminPost, Banner, Train } from "@/@types/admin";
import { MOCK_BANNER, MOCK_POSTS, MOCK_TRAINS } from "@/constants/admin-mock";

const KEYS = { trains: "gj-trains", banner: "gj-banner", posts: "gj-posts" };

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useAdminData() {
  const [trains, setTrains] = useState<Train[]>(MOCK_TRAINS);
  const [banner, setBanner] = useState<Banner>(MOCK_BANNER);
  const [posts, setPosts] = useState<AdminPost[]>(MOCK_POSTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTrains(load(KEYS.trains, MOCK_TRAINS));
    setBanner(load(KEYS.banner, MOCK_BANNER));
    setPosts(load(KEYS.posts, MOCK_POSTS));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(KEYS.trains, JSON.stringify(trains));
    localStorage.setItem(KEYS.banner, JSON.stringify(banner));
    localStorage.setItem(KEYS.posts, JSON.stringify(posts));
  }, [trains, banner, posts, loaded]);

  const resetMock = () => {
    setTrains(MOCK_TRAINS);
    setBanner(MOCK_BANNER);
    setPosts(MOCK_POSTS);
  };

  return { trains, setTrains, banner, setBanner, posts, setPosts, resetMock };
}

export type AdminData = ReturnType<typeof useAdminData>;
