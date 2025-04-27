"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Briefcase, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/auth/user-nav"

const routes = [
  { href: "/jobs", label: "Find Jobs" },
  { href: "/profile", label: "My Profile" },
  { href: "/applications", label: "Applications" },
  { href: "/interview-prep", label: "Interview Prep" },
  { href: "/courses", label: "Courses" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Briefcase className="h-6 w-6" />
          <span>JobSwipe</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium hover:underline underline-offset-4 ${
                pathname === route.href ? "text-primary font-semibold" : ""
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <UserNav />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg font-medium hover:underline underline-offset-4 ${
                      pathname === route.href ? "text-primary font-semibold" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
