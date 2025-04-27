"use client"

import { useState } from "react"
import { updateUserProfile } from "@/app/actions/profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileFormProps {
  profile: any
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      const result = await updateUserProfile(formData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const initials = profile?.full_name
    ? `${profile.full_name.split(" ")[0][0]}${profile.full_name.split(" ")[1]?.[0] || ""}`
    : "JS"

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={profile?.avatar_url || "/placeholder.svg?text=JS"} alt="Profile" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm" className="mt-4">
          Change Photo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" name="username" defaultValue={profile?.username || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={profile?.title || ""}
            placeholder="e.g. Senior Frontend Developer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" defaultValue={profile?.phone || ""} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={profile?.location || ""}
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            defaultValue={profile?.website || ""}
            placeholder="e.g. https://yourwebsite.com"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="bio">Professional Summary</Label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={profile?.bio || ""}
            placeholder="Tell us about your professional experience and skills..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  )
}
