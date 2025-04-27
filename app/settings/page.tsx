import { getUserProfile } from "@/app/actions/profile"
import { SiteHeader } from "@/components/site-header"
import { SettingsForm } from "@/components/settings/settings-form"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const { profile, error } = await getUserProfile()

  if (error && error === "Not authenticated") {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <SettingsForm profile={profile} />
        </div>
      </div>
    </div>
  )
}
