import { SiteHeader } from "@/components/site-header"
import { JobSwiper } from "@/components/jobs/job-swiper"
import { getUserProfile } from "@/app/actions/profile"
import { redirect } from "next/navigation"

export default async function JobsPage() {
  const { profile, error } = await getUserProfile()

  if (error && error === "Not authenticated") {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 flex-1">
        <JobSwiper />
      </div>
    </div>
  )
}
