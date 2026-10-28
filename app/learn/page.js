"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserEmail } from "@/lib/auth";
import { getMemberByEmail } from "@/lib/members";

const COURSES = [
  { id: 1, title: "HTML/CSS 기초", progress: 80 },
  { id: 2, title: "JavaScript 핵심 문법", progress: 45 },
  { id: 3, title: "React로 시작하는 프론트엔드", progress: 10 },
  { id: 4, title: "Next.js 실전 프로젝트", progress: 0 },
];

export default function LearnPage() {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const email = getCurrentUserEmail();
    if (!email) {
      router.replace("/login");
      return;
    }
    setMember(getMemberByEmail(email));
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-sm text-zinc-400">확인 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {member?.name ?? "학습자"}님의 학습 페이지
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          수강 중인 강의를 이어서 학습해보세요.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {course.title}
                </h2>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {course.progress}%
                </span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
