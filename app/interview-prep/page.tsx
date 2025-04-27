import { getUserProfile } from "@/app/actions/profile"
import { SiteHeader } from "@/components/site-header"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, CheckCircle, Clock, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function InterviewPrepPage() {
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
          <h1 className="text-2xl font-bold">Interview Preparation</h1>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search interview questions, topics, or companies..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="topics">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Data Structures & Algorithms</CardTitle>
                  <CardDescription>Coding challenges and Data Structures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>3/10 completed</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Database Management Systems</CardTitle>
                  <CardDescription>SQL queries and much more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>5/8 completed</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>System Design</CardTitle>
                  <CardDescription>Architecture and scalability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>1/6 completed</span>
                    </div>
                    <Progress value={16} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Computer Networks</CardTitle>
                  <CardDescription>Solve networking questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>2/12 completed</span>
                    </div>
                    <Progress value={16} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Behavioral Interview</CardTitle>
                  <CardDescription>Clear every HR round </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>4/15 completed</span>
                    </div>
                    <Progress value={26} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Frontend Development</CardTitle>
                  <CardDescription>React, JavaScript, and UI concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>7/10 completed</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6 pt-6">
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Tell me about a time you faced a challenging situation at work</h3>
                    <p className="text-sm text-muted-foreground mt-1">Behavioral • Leadership</p>
                  </div>
                  <Badge variant="outline">Common</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    View Answer
                  </Button>
                  <Button size="sm">Practice</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Implement a function to reverse a linked list</h3>
                    <p className="text-sm text-muted-foreground mt-1">Technical • Data Structures</p>
                  </div>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    View Solution
                  </Button>
                  <Button size="sm">Practice</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Design a URL shortening service like bit.ly</h3>
                    <p className="text-sm text-muted-foreground mt-1">System Design • Scalability</p>
                  </div>
                  <Badge variant="outline">Advanced</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    View Approach
                  </Button>
                  <Button size="sm">Practice</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">What are your greatest strengths and weaknesses?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Behavioral • Self-awareness</p>
                  </div>
                  <Badge variant="outline">Common</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    View Answer
                  </Button>
                  <Button size="sm">Practice</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Implement a function to find if a binary tree is balanced</h3>
                    <p className="text-sm text-muted-foreground mt-1">Technical • Trees</p>
                  </div>
                  <Badge variant="outline">Medium</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    View Solution
                  </Button>
                  <Button size="sm">Practice</Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Load More Questions
            </Button>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Guides</CardTitle>
                  <CardDescription>Comprehensive preparation materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Technical Interview Handbook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Behavioral Interview Guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>System Design Primer</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>Learn through visual explanations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Data Structures Explained</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>Mastering the STAR Method</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>System Design Interviews</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Insights</CardTitle>
                  <CardDescription>Learn about specific companies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Google Interview Process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Amazon Leadership Principles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Microsoft Interview Questions</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Books</CardTitle>
                <CardDescription>Essential reading for interview preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-32 bg-muted mb-3"></div>
                    <h3 className="font-medium">Cracking the Coding Interview</h3>
                    <p className="text-sm text-muted-foreground">Gayle Laakmann McDowell</p>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-32 bg-muted mb-3"></div>
                    <h3 className="font-medium">System Design Interview</h3>
                    <p className="text-sm text-muted-foreground">Alex Xu</p>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-24 h-32 bg-muted mb-3"></div>
                    <h3 className="font-medium">Designing Data-Intensive Applications</h3>
                    <p className="text-sm text-muted-foreground">Martin Kleppmann</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6 pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mock Interviews</CardTitle>
                <CardDescription>Practice with realistic simulations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Technical Interview</h3>
                      <Badge>45 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice coding problems with real-time feedback.
                    </p>
                    <Button className="w-full">Start Session</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Behavioral Interview</h3>
                      <Badge>30 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice answering common behavioral questions.
                    </p>
                    <Button className="w-full">Start Session</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">System Design</h3>
                      <Badge>60 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Practice designing scalable systems and architectures.
                    </p>
                    <Button className="w-full">Start Session</Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Full Interview Loop</h3>
                      <Badge>120 min</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Complete end-to-end interview simulation.</p>
                    <Button className="w-full">Start Session</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Practice Schedule</CardTitle>
                <CardDescription>Your upcoming practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Technical Mock Interview</h3>
                      <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Behavioral Interview Practice</h3>
                      <p className="text-sm text-muted-foreground">May 10, 10:00 AM</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule New Session
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
