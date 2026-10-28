"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserEmail, logout, subscribeAuthChange } from "@/lib/auth";

export default function NavBar() {
  const router = useRouter();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(getCurrentUserEmail());
    return subscribeAuthChange(() => setEmail(getCurrentUserEmail()));
  }, []);

  function handleLogout() {
    logout();
    setEmail(null);
    router.push("/");
  }

  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
        >
          📚 MyLMS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link href="/members" className="hover:text-zinc-900 dark:hover:text-zinc-50">
            회원 목록
          </Link>
          {email ? (
            <>
              <Link href="/learn" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                학습 페이지
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-3 py-1.5 text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
