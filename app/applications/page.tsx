import { SiteHeader } from "@/components/site-header"
import { ApplicationsList } from "@/components/applications/applications-list"
import { getUserProfile } from "@/app/actions/profile"
import { redirect } from "next/navigation"

export default async function ApplicationsPage() {
  const { profile, error } = await getUserProfile()

  if (error && error === "Not authenticated") {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 flex-1">
        <ApplicationsList />
      </div>
    </div>
  )
}
