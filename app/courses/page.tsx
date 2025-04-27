import { getUserProfile } from "@/app/actions/profile"
import { SiteHeader } from "@/components/site-header"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Filter, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    provider: "Tech Academy",
    level: "Intermediate",
    duration: "10 weeks",
    rating: 4.8,
    students: 12500,
    image: "https://media.geeksforgeeks.org/wp-content/uploads/20221114175057/10BestDataStructuresandAlgorithmsCourses.png",
    price: "$49.99",
    tags: ["Programming", "Computer Science"],
    popular: true,
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    provider: "Design School",
    level: "Beginner",
    duration: "8 weeks",
    rating: 4.6,
    students: 8900,
    image: "https://www.creative-tim.com/blog/content/images/size/w960/2022/07/UX-design-courses.jpg",
    price: "$39.99",
    tags: ["Design", "User Experience"],
    popular: true,
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    provider: "Code Institute",
    level: "Intermediate",
    duration: "12 weeks",
    rating: 4.7,
    students: 15200,
    image: "https://img-c.udemycdn.com/course/480x270/3655840_1c3c.jpg",
    price: "$59.99",
    tags: ["Web Development", "JavaScript"],
    popular: true,
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals",
    provider: "AI Academy",
    level: "Advanced",
    duration: "14 weeks",
    rating: 4.9,
    students: 7800,
    image: "https://i.ytimg.com/vi/i_LwzRVP7bg/maxresdefault.jpg",
    price: "$69.99",
    tags: ["AI", "Data Science"],
    popular: false,
  },
  {
    id: 5,
    title: "Product Management Essentials",
    provider: "Product School",
    level: "Intermediate",
    duration: "6 weeks",
    rating: 4.5,
    students: 6300,
    image: "https://media.licdn.com/dms/image/v2/D5612AQHqOJChH9zeCw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682407913582?e=2147483647&v=beta&t=HMpVMEtIEVsAQYh4Bqfk3IgiTBBG_FJmmgM7k16CJeI",
    price: "$44.99",
    tags: ["Product Management", "Business"],
    popular: false,
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    provider: "Cloud Academy",
    level: "Intermediate",
    duration: "8 weeks",
    rating: 4.7,
    students: 9100,
    image: "https://textify.ai/wp-content/uploads/2024/11/1696603940780.png",
    price: "$54.99",
    tags: ["Cloud", "DevOps"],
    popular: false,
  },
]

// Sample enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: "React for Beginners",
    provider: "Frontend Masters",
    progress: 75,
    lastAccessed: "2 days ago",
    image: "https://www.pankajkumarseo.com/wp-content/uploads/2022/06/React-Js-Course-Delhi.png",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    provider: "Code Academy",
    progress: 30,
    lastAccessed: "1 week ago",
    image: "https://i.ytimg.com/vi/jS4aFq5-91M/maxresdefault.jpg",
  },
]

export default async function CoursesPage() {
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
          <h1 className="text-2xl font-bold">Courses & Learning</h1>
        </div>

        <Tabs defaultValue="discover">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discover">Discover Courses</TabsTrigger>
            <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6 pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search for courses, skills, or topics..." className="pl-10" />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription>{course.provider}</CardDescription>
                      </div>
                      {course.popular && <Badge>Popular</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="text-muted-foreground">{course.students.toLocaleString()} students</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-2 flex items-center justify-between">
                    <div className="font-bold">{course.price}</div>
                    <Button>Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              Load More Courses
            </Button>
          </TabsContent>

          <TabsContent value="my-courses" className="space-y-6 pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="mb-2">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">Last accessed {course.lastAccessed}</p>
                      </div>
                      <Button>Continue Learning</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
                <CardDescription>Your earned certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-muted-foreground">
                    You haven't earned any certificates yet. Complete a course to earn your first certificate.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your profile and interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {courses.slice(0, 2).map((course) => (
                    <div key={course.id} className="flex gap-3 border rounded-lg p-3">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          <span>{course.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
