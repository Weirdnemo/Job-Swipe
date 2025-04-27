"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserProfile() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated", profile: null }
  }

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return { error: error.message, profile: null }
  }

  return { profile, error: null }
}

export async function updateUserProfile(formData: FormData) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated", success: false }
  }

  const updates = {
    full_name: formData.get("full_name") as string,
    username: formData.get("username") as string,
    title: formData.get("title") as string,
    bio: formData.get("bio") as string,
    location: formData.get("location") as string,
    phone: formData.get("phone") as string,
    website: formData.get("website") as string,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from("profiles").update(updates).eq("id", session.user.id)

  if (error) {
    console.error("Error updating profile:", error)
    return { error: error.message, success: false }
  }

  revalidatePath("/profile")
  return { error: null, success: true }
}

export async function updateUserSkills(skills: Array<{ name: string; category: string }>) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated", success: false }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ skills, updated_at: new Date().toISOString() })
    .eq("id", session.user.id)

  if (error) {
    console.error("Error updating skills:", error)
    return { error: error.message, success: false }
  }

  revalidatePath("/profile")
  return { error: null, success: true }
}

export async function updateUserCertificates(certificates: any[]) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return { error: "Not authenticated", success: false }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ certificates, updated_at: new Date().toISOString() })
    .eq("id", session.user.id)

  if (error) {
    console.error("Error updating certificates:", error)
    return { error: error.message, success: false }
  }

  revalidatePath("/profile")
  return { error: null, success: true }
}
