"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CompleteContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "회원";

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-900/40">
          ✅
        </div>
        <h1 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          가입이 완료되었습니다!
        </h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          {name}님, 환영합니다. 회원가입이 정상적으로 처리되었습니다.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/learn"
            className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            학습 페이지로 이동
          </Link>
          <Link
            href="/members"
            className="rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            회원 목록 보기
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400"
          >
            홈으로
          </Link>
        </div>
      </div>
    </div>
  );
}
