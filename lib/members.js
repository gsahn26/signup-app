import { supabase } from "@/lib/supabaseClient";

export async function getMembers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("joined_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function isEmailTaken(email) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .ilike("email", email)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function getMemberByEmail(email) {
  if (!email) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("email", email)
    .maybeSingle();
  if (error) throw error;
  return data;
}
