"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateUserSkills } from "@/app/actions/profile"
import type { Skill, Profile } from "@/types/profile"

// Sample skill categories
const SKILL_CATEGORIES = [
  { name: "Programming Languages", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { name: "Frameworks", color: "bg-green-100 text-green-800 border-green-200" },
  { name: "Design", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { name: "Soft Skills", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  { name: "Tools", color: "bg-pink-100 text-pink-800 border-pink-200" },
  { name: "Other", color: "bg-gray-100 text-gray-800 border-gray-200" },
]

// Sample suggested skills
const SUGGESTED_SKILLS = [
  { name: "JavaScript", category: "Programming Languages" },
  { name: "React", category: "Frameworks" },
  { name: "TypeScript", category: "Programming Languages" },
  { name: "UI/UX Design", category: "Design" },
  { name: "Figma", category: "Tools" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Node.js", category: "Programming Languages" },
  { name: "Communication", category: "Soft Skills" },
  { name: "Problem Solving", category: "Soft Skills" },
  { name: "Git", category: "Tools" },
]

interface SkillsSectionProps {
  profile: Profile
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  const { toast } = useToast()
  const [skills, setSkills] = useState<Skill[]>(profile?.skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Programming Languages")
  const [isLoading, setIsLoading] = useState(false)

  // Animation for skills list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("stagger-item-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".stagger-item")
    elements.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.1}s`
      observer.observe(el)
    })

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [skills])

  const addSkill = async () => {
    if (!newSkill.trim()) return

    const skillExists = skills.some((skill) => skill.name.toLowerCase() === newSkill.toLowerCase())

    if (skillExists) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your profile.",
        variant: "destructive",
      })
      return
    }

    const updatedSkills = [...skills, { name: newSkill.trim(), category: selectedCategory }]

    setIsLoading(true)
    try {
      await updateUserSkills(updatedSkills)
      setSkills(updatedSkills)
      setNewSkill("")
      toast({
        title: "Skill added",
        description: "Your skill has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeSkill = async (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill.name !== skillToRemove)

    setIsLoading(true)
    try {
      await updateUserSkills(updatedSkills)
      setSkills(updatedSkills)
      toast({
        title: "Skill removed",
        description: "Your skill has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addSuggestedSkill = async (suggestedSkill: Skill) => {
    const skillExists = skills.some((skill) => skill.name.toLowerCase() === suggestedSkill.name.toLowerCase())

    if (skillExists) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your profile.",
        variant: "destructive",
      })
      return
    }

    const updatedSkills = [...skills, suggestedSkill]

    setIsLoading(true)
    try {
      await updateUserSkills(updatedSkills)
      setSkills(updatedSkills)
      toast({
        title: "Skill added",
        description: "Your skill has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const foundCategory = SKILL_CATEGORIES.find((c) => c.name === category)
    return foundCategory?.color || "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <Badge
                key={`${skill.name}-${index}`}
                variant="outline"
                className={`stagger-item px-3 py-1 ${getCategoryColor(skill.category)} hover-lift`}
              >
                {skill.name}
                <button onClick={() => removeSkill(skill.name)} className="ml-2 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No skills added yet. Add skills to showcase your expertise.</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Add a new skill</h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addSkill} disabled={isLoading || !newSkill.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_CATEGORIES.map((category) => (
                <Badge
                  key={category.name}
                  variant="outline"
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.name ? category.color + " ring-2 ring-primary/20" : "bg-transparent"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Suggested skills</h3>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_SKILLS.filter((suggestedSkill) => !skills.some((skill) => skill.name === suggestedSkill.name))
            .slice(0, 8)
            .map((suggestedSkill) => (
              <Badge
                key={suggestedSkill.name}
                variant="outline"
                className={`cursor-pointer hover-lift ${getCategoryColor(suggestedSkill.category)}`}
                onClick={() => addSuggestedSkill(suggestedSkill)}
              >
                <Plus className="h-3 w-3 mr-1" />
                {suggestedSkill.name}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  )
}
