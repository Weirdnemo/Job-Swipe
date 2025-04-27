"use client"

import { useState } from "react"
import { Check, Clock, DollarSign, Heart, MapPin, X } from "lucide-react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "TC",
    location: "San Francisco, CA (Remote)",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We're looking for a skilled Frontend Developer to join our team. You'll be responsible for building responsive web applications using React and Next.js.",
    requirements: [
      "3+ years of experience with React",
      "Experience with Next.js",
      "Strong TypeScript skills",
      "Understanding of UI/UX principles",
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Git"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    logo: "DH",
    location: "New York, NY (Hybrid)",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    posted: "1 week ago",
    description:
      "Join our creative team as a UX/UI Designer. You'll be creating beautiful, intuitive interfaces for our clients across various industries.",
    requirements: [
      "Portfolio demonstrating UI/UX skills",
      "Experience with Figma",
      "Understanding of user research",
      "Ability to work in a team",
    ],
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing"],
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "DataWorks",
    logo: "DW",
    location: "Boston, MA (On-site)",
    salary: "$25 - $30 per hour",
    type: "Internship",
    posted: "3 days ago",
    description:
      "Great opportunity for students looking to gain experience in data science. You'll work with our team on real-world data problems.",
    requirements: [
      "Currently pursuing a degree in Computer Science, Statistics, or related field",
      "Knowledge of Python",
      "Understanding of basic statistical concepts",
      "Eager to learn",
    ],
    skills: ["Python", "Data Analysis", "Machine Learning", "Statistics", "SQL"],
  },
  {
    id: 4,
    title: "Backend Engineer",
    company: "ServerStack",
    logo: "SS",
    location: "Austin, TX (Remote)",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "Just now",
    description:
      "We're seeking a Backend Engineer to help scale our infrastructure. You'll be working with Node.js and MongoDB to build robust APIs.",
    requirements: [
      "4+ years of backend development experience",
      "Proficiency with Node.js",
      "Experience with MongoDB or similar NoSQL databases",
      "Understanding of RESTful API design",
    ],
    skills: ["Node.js", "MongoDB", "Express", "REST APIs", "Docker"],
  },
  {
    id: 5,
    title: "Product Manager",
    company: "ProductLabs",
    logo: "PL",
    location: "Seattle, WA (Hybrid)",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "Join our product team to lead the development of innovative solutions. You'll work closely with designers, engineers, and stakeholders.",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills",
      "Excellent communication",
      "Experience with agile methodologies",
    ],
    skills: ["Product Strategy", "User Stories", "Roadmapping", "Agile", "Data Analysis"],
  },
]

export function JobSwiper() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<number[]>([])
  const [rejected, setRejected] = useState<number[]>([])

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-30, 30])
  const cardOpacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0])

  const springConfig = { stiffness: 300, damping: 30 }
  const xSpring = useSpring(x, springConfig)

  const currentJob = jobs[currentIndex]

  const handleSwipe = (direction: "left" | "right") => {
    if (currentIndex >= jobs.length) return

    if (direction === "right") {
      setLiked([...liked, currentJob.id])
    } else {
      setRejected([...rejected, currentJob.id])
    }

    // Animate the card off screen
    x.set(direction === "right" ? 1000 : -1000)

    // Move to the next card
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      x.set(0)
    }, 300)
  }

  return (
    <div className="grid md:grid-cols-[1fr_350px] gap-6">
      <div className="flex flex-col items-center justify-center min-h-[600px] relative">
        {currentIndex < jobs.length ? (
          <>
            <motion.div
              style={{ x: xSpring, rotate, opacity: cardOpacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100) {
                  handleSwipe("right")
                } else if (offset.x < -100) {
                  handleSwipe("left")
                } else {
                  x.set(0)
                }
              }}
              className="absolute w-full max-w-md"
            >
              <Card className="w-full shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={`/placeholder.svg?text=${currentJob.logo}`} alt={currentJob.company} />
                        <AvatarFallback>{currentJob.logo}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{currentJob.title}</CardTitle>
                        <CardDescription>{currentJob.company}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{currentJob.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      {currentJob.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {currentJob.salary}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      Posted {currentJob.posted}
                    </div>
                  </div>

                  <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="h-[200px] overflow-y-auto">
                      <p className="text-sm">{currentJob.description}</p>
                    </TabsContent>
                    <TabsContent value="requirements" className="h-[200px] overflow-y-auto">
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {currentJob.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="skills" className="h-[200px] overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {currentJob.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={() => handleSwipe("left")}
                  >
                    <X className="h-6 w-6 text-destructive" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                    onClick={() => handleSwipe("right")}
                  >
                    <Check className="h-6 w-6 text-green-500" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-sm text-muted-foreground">
              <div>Swipe right to apply</div>
              <div>Swipe left to pass</div>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">No more jobs to show</h2>
            <p className="text-muted-foreground">Check back later for more opportunities</p>
            <Button
              onClick={() => {
                setCurrentIndex(0)
                setLiked([])
                setRejected([])
              }}
            >
              Start Over
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Jobs Applied</h3>
                <div className="text-3xl font-bold">{liked.length}</div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Jobs Viewed</h3>
                <div className="text-3xl font-bold">{currentIndex}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liked Jobs</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            {liked.length > 0 ? (
              <div className="space-y-4">
                {liked.map((id) => {
                  const job = jobs.find((j) => j.id === id)
                  if (!job) return null

                  return (
                    <div key={id} className="flex items-center gap-3 p-2 border rounded-lg">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={`/placeholder.svg?text=${job.logo}`} alt={job.company} />
                        <AvatarFallback>{job.logo}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{job.title}</div>
                        <div className="text-sm text-muted-foreground truncate">{job.company}</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">No liked jobs yet</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
