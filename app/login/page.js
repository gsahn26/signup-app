"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { verifyLogin } from "@/lib/members";
import { login } from "@/lib/auth";
import FormField from "@/components/FormField";

const inputClassName =
  "rounded-xl border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm font-normal text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-200";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const member = verifyLogin(form.email.trim(), form.password);
    if (!member) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      setSubmitting(false);
      return;
    }
    setError("");
    login(member.email);
    router.push("/learn");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          로그인
        </h1>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          가입한 이메일과 비밀번호로 로그인하세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="이메일">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClassName}
            />
          </FormField>

          <FormField label="비밀번호">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              className={inputClassName}
            />
          </FormField>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          아직 회원이 아니신가요?{" "}
          <Link href="/signup" className="font-medium underline underline-offset-4">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
