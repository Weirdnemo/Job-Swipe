import { getUserProfile } from "@/app/actions/profile"
import { ProfileForm } from "@/components/profile/profile-form"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SkillsSection } from "@/components/profile/skills-section"
import { CertificatesSection } from "@/components/profile/certificates-section"
import type { Profile } from "@/types/profile"

export default async function ProfilePage() {
  const { profile, error } = await getUserProfile()

  if (error && error === "Not authenticated") {
    redirect("/signin")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Tabs defaultValue="info" className="animate-fade-in">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProfileForm profile={profile as Profile} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Add and manage your professional skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillsSection profile={profile as Profile} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificates" className="animate-slide-up">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                    <CardDescription>Showcase your certifications and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CertificatesSection profile={profile as Profile} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>85% Complete</span>
                    <span>17/20</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete your profile to increase your chances of getting matched with employers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Your profile is visible to employers</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
