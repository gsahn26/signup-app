"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMembers } from "@/lib/members";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMembers(getMembers());
    setLoaded(true);
  }, []);

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              회원 목록
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              총 {members.length}명 가입
            </p>
          </div>
          <Link
            href="/signup"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            + 회원가입
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {!loaded ? (
            <p className="p-8 text-center text-sm text-zinc-400">
              불러오는 중...
            </p>
          ) : members.length === 0 ? (
            <p className="p-8 text-center text-sm text-zinc-400">
              아직 가입한 회원이 없습니다.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                <tr>
                  <th className="px-5 py-3 font-medium">#</th>
                  <th className="px-5 py-3 font-medium">이름</th>
                  <th className="px-5 py-3 font-medium">이메일</th>
                  <th className="px-5 py-3 font-medium">가입일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {members.map((member, index) => (
                  <tr key={member.id}>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">
                      {index + 1}
                    </td>
                    <td className="px-5 py-3 font-medium text-zinc-900 dark:text-zinc-50">
                      {member.name}
                    </td>
                    <td className="px-5 py-3 text-zinc-600 dark:text-zinc-300">
                      {member.email}
                    </td>
                    <td className="px-5 py-3 text-zinc-500 dark:text-zinc-400">
                      {formatDate(member.joinedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-medium text-zinc-500 underline underline-offset-4 dark:text-zinc-400">
            홈으로
          </Link>
        </p>
      </div>
    </div>
  );
}
