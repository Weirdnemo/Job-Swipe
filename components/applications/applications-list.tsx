"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle, Clock, FileText, HelpCircle, MessageSquare, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

// Sample application data
const applications = [
  {
    id: 1,
    position: "Frontend Developer",
    company: "TechCorp",
    logo: "TC",
    location: "San Francisco, CA (Remote)",
    appliedDate: "Apr 20, 2023",
    status: "interview",
    stage: "Technical Interview",
    nextStep: "Technical Interview on May 5, 2023",
    progress: 60,
  },
  {
    id: 2,
    position: "UX/UI Designer",
    company: "DesignHub",
    logo: "DH",
    location: "New York, NY (Hybrid)",
    appliedDate: "Apr 15, 2023",
    status: "reviewing",
    stage: "Application Review",
    nextStep: "Waiting for recruiter feedback",
    progress: 20,
  },
  {
    id: 3,
    position: "Product Manager",
    company: "ProductLabs",
    logo: "PL",
    location: "Seattle, WA (Hybrid)",
    appliedDate: "Apr 10, 2023",
    status: "rejected",
    stage: "Application Rejected",
    nextStep: "None",
    progress: 100,
  },
  {
    id: 4,
    position: "Backend Engineer",
    company: "ServerStack",
    logo: "SS",
    location: "Austin, TX (Remote)",
    appliedDate: "Apr 25, 2023",
    status: "applied",
    stage: "Application Submitted",
    nextStep: "Initial screening",
    progress: 10,
  },
  {
    id: 5,
    position: "Data Scientist",
    company: "DataWorks",
    logo: "DW",
    location: "Boston, MA (On-site)",
    appliedDate: "Apr 18, 2023",
    status: "offer",
    stage: "Offer Received",
    nextStep: "Review offer by May 10, 2023",
    progress: 90,
  },
]

export function ApplicationsList() {
  const [selectedApplication, setSelectedApplication] = useState(applications[0])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50">
            Applied
          </Badge>
        )
      case "reviewing":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-200 bg-yellow-50">
            Under Review
          </Badge>
        )
      case "interview":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-50">
            Interview
          </Badge>
        )
      case "offer":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
            Offer
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "reviewing":
        return <FileText className="h-5 w-5 text-yellow-500" />
      case "interview":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "offer":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <HelpCircle className="h-5 w-5" />
    }
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Applications</h1>
      </div>

      <div className="grid md:grid-cols-[350px_1fr] gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Applications</h2>
            <Badge variant="outline">{applications.length}</Badge>
          </div>

          <div className="space-y-2">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedApplication.id === app.id ? "bg-muted border-primary/50" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedApplication(app)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={`/placeholder.svg?text=${app.logo}`} alt={app.company} />
                    <AvatarFallback>{app.logo}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{app.position}</div>
                    <div className="text-sm text-muted-foreground truncate">{app.company}</div>
                  </div>
                  {getStatusIcon(app.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>{selectedApplication.position}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage
                    src={`/placeholder.svg?text=${selectedApplication.logo}`}
                    alt={selectedApplication.company}
                  />
                  <AvatarFallback>{selectedApplication.logo}</AvatarFallback>
                </Avatar>
                {selectedApplication.company} • {selectedApplication.location}
              </CardDescription>
            </div>
            {getStatusBadge(selectedApplication.status)}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Application Progress</div>
              <Progress value={selectedApplication.progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Applied on {selectedApplication.appliedDate}</span>
                <span>{selectedApplication.progress}%</span>
              </div>
            </div>

            <Tabs defaultValue="status">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="status">Status</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="status" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid gap-1">
                    <div className="text-sm font-medium">Current Stage</div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedApplication.status)}
                      <span>{selectedApplication.stage}</span>
                    </div>
                  </div>

                  <div className="grid gap-1">
                    <div className="text-sm font-medium">Next Steps</div>
                    <div>{selectedApplication.nextStep}</div>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="font-medium mb-2">Application Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Position</span>
                        <span>{selectedApplication.position}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Company</span>
                        <span>{selectedApplication.company}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Location</span>
                        <span>{selectedApplication.location}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Applied Date</span>
                        <span>{selectedApplication.appliedDate}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Status</span>
                        <span>{selectedApplication.stage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Recruiter
                    </Button>
                    <Button className="flex-1">View Job Details</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="pt-4">
                <div className="space-y-4">
                  <div className="relative pl-6 pb-6 border-l-2 border-muted">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <div className="font-medium">Application Submitted</div>
                    <div className="text-sm text-muted-foreground">{selectedApplication.appliedDate}</div>
                    <div className="text-sm mt-1">Your application was successfully submitted.</div>
                  </div>

                  {selectedApplication.status !== "applied" && (
                    <div className="relative pl-6 pb-6 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="font-medium">Application Reviewed</div>
                      <div className="text-sm text-muted-foreground">Apr 22, 2023</div>
                      <div className="text-sm mt-1">Your application was reviewed by the hiring team.</div>
                    </div>
                  )}

                  {(selectedApplication.status === "interview" ||
                    selectedApplication.status === "offer" ||
                    selectedApplication.status === "rejected") && (
                    <div className="relative pl-6 pb-6 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="font-medium">Initial Screening</div>
                      <div className="text-sm text-muted-foreground">Apr 28, 2023</div>
                      <div className="text-sm mt-1">You completed the initial screening call with the recruiter.</div>
                    </div>
                  )}

                  {(selectedApplication.status === "interview" || selectedApplication.status === "offer") && (
                    <div className="relative pl-6 pb-6 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="font-medium">Technical Interview Scheduled</div>
                      <div className="text-sm text-muted-foreground">May 2, 2023</div>
                      <div className="text-sm mt-1">Your technical interview has been scheduled for May 5, 2023.</div>
                    </div>
                  )}

                  {selectedApplication.status === "offer" && (
                    <div className="relative pl-6 pb-6 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                      <div className="font-medium">Offer Extended</div>
                      <div className="text-sm text-muted-foreground">May 8, 2023</div>
                      <div className="text-sm mt-1">Congratulations! You've received an offer.</div>
                    </div>
                  )}

                  {selectedApplication.status === "rejected" && (
                    <div className="relative pl-6 pb-6 border-l-2 border-muted">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-destructive"></div>
                      <div className="font-medium">Application Rejected</div>
                      <div className="text-sm text-muted-foreground">May 1, 2023</div>
                      <div className="text-sm mt-1">
                        Unfortunately, your application was not selected to move forward.
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="pt-4">
                <Textarea placeholder="Add notes about this application..." className="min-h-[200px]" />
                <Button className="mt-4">Save Notes</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
