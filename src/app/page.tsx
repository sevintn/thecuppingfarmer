"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const lang =
      navigator.language?.slice(0, 2) === "en" ? "en" : "es";
    router.replace(`/${lang}`);
  }, [router]);

  return null;
}
