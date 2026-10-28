const CURRENT_USER_KEY = "signup_app_current_user";
const AUTH_EVENT = "signup_app_auth_change";

export function login(email) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRENT_USER_KEY, email);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CURRENT_USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getCurrentUserEmail() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT_USER_KEY);
}

export function subscribeAuthChange(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AUTH_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(AUTH_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
