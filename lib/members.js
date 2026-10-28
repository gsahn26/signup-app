const STORAGE_KEY = "signup_app_members";

export function getMembers() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addMember({ name, email, password }) {
  const members = getMembers();
  const member = {
    id: Date.now(),
    name,
    email,
    password,
    joinedAt: new Date().toISOString(),
  };
  members.push(member);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return member;
}

export function isEmailTaken(email) {
  return getMembers().some(
    (m) => m.email.toLowerCase() === email.toLowerCase()
  );
}

export function getMemberByEmail(email) {
  if (!email) return null;
  return (
    getMembers().find((m) => m.email.toLowerCase() === email.toLowerCase()) ||
    null
  );
}

export function verifyLogin(email, password) {
  const member = getMemberByEmail(email);
  if (!member || member.password !== password) return null;
  return member;
}
