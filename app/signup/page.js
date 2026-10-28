"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addMember, isEmailTaken } from "@/lib/members";
import { login } from "@/lib/auth";
import FormField from "@/components/FormField";

const inputClassName =
  "rounded-xl border border-zinc-200 bg-transparent px-3.5 py-2.5 text-sm font-normal text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-200";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "이름을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "올바른 이메일 형식이 아닙니다.";
    if (form.password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (form.password !== form.passwordConfirm)
      return "비밀번호가 일치하지 않습니다.";
    if (isEmailTaken(form.email)) return "이미 가입된 이메일입니다.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSubmitting(true);
    const member = addMember({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    });
    login(member.email);
    router.push(`/signup/complete?name=${encodeURIComponent(member.name)}`);
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          회원가입
        </h1>
        <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          아래 정보를 입력하고 가입을 완료하세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="이름">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="홍길동"
              className={inputClassName}
            />
          </FormField>

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
              placeholder="6자 이상"
              className={inputClassName}
            />
          </FormField>

          <FormField label="비밀번호 확인">
            <input
              type="password"
              name="passwordConfirm"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 재입력"
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
            가입하기
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          이미 회원이신가요?{" "}
          <Link href="/login" className="font-medium underline underline-offset-4">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
