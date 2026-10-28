"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUserEmail, subscribeAuthChange } from "@/lib/auth";
import { getMemberByEmail } from "@/lib/members";

export default function Home() {
  const [member, setMember] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    function refresh() {
      const email = getCurrentUserEmail();
      setMember(email ? getMemberByEmail(email) : null);
      setChecked(true);
    }
    refresh();
    return subscribeAuthChange(refresh);
  }, []);

  const isLoggedIn = checked && !!member;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-4 text-center dark:bg-black">
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          Online Learning
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          나만의 학습 플랫폼, MyLMS
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          {isLoggedIn
            ? `${member.name}님, 오늘도 학습을 이어가 볼까요?`
            : "회원가입하고 로그인하면 바로 학습을 시작할 수 있어요."}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {isLoggedIn ? (
          <Link
            href="/learn"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            학습 페이지로 이동
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              회원가입 하기
            </Link>
          </>
        )}
        <Link
          href="/members"
          className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          회원 목록 보기
        </Link>
      </div>
    </div>
  );
}
