"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { updateUserCertificates } from "@/app/actions/profile"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Calendar, ExternalLink, Trash2, Upload, Plus } from "lucide-react"
import { motion } from "framer-motion"
import type { Certificate, Profile } from "@/types/profile"

interface CertificatesSectionProps {
  profile: Profile
}

export function CertificatesSection({ profile }: CertificatesSectionProps) {
  const { toast } = useToast()
  const [certificates, setCertificates] = useState<Certificate[]>(profile?.certificates || [])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newCertificate, setNewCertificate] = useState<Certificate>({
    id: "",
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialUrl: "",
    description: "",
    image: "",
  })

  const handleAddCertificate = async () => {
    if (!newCertificate.name || !newCertificate.issuer || !newCertificate.issueDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const certificateToAdd = {
      ...newCertificate,
      id: crypto.randomUUID(),
    }

    const updatedCertificates = [...certificates, certificateToAdd]

    setIsLoading(true)
    try {
      await updateUserCertificates(updatedCertificates)
      setCertificates(updatedCertificates)
      setIsAddingNew(false)
      setNewCertificate({
        id: "",
        name: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialUrl: "",
        description: "",
        image: "",
      })
      toast({
        title: "Certificate added",
        description: "Your certificate has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add certificate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveCertificate = async (id: string) => {
    const updatedCertificates = certificates.filter((cert) => cert.id !== id)

    setIsLoading(true)
    try {
      await updateUserCertificates(updatedCertificates)
      setCertificates(updatedCertificates)
      toast({
        title: "Certificate removed",
        description: "Your certificate has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove certificate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, you would upload this to a storage service
    // For now, we'll just create a data URL
    const reader = new FileReader()
    reader.onload = () => {
      setNewCertificate({
        ...newCertificate,
        image: reader.result as string,
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      {certificates.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="hover-lift"
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        {certificate.name}
                      </CardTitle>
                      <CardDescription>{certificate.issuer}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveCertificate(certificate.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  {certificate.image && (
                    <div className="mb-3 rounded-md overflow-hidden">
                      <img
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-2" />
                      Issued: {certificate.issueDate}
                      {certificate.expiryDate && ` • Expires: ${certificate.expiryDate}`}
                    </div>
                    {certificate.description && <p className="text-muted-foreground">{certificate.description}</p>}
                  </div>
                </CardContent>
                {certificate.credentialUrl && (
                  <CardFooter>
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View credential
                    </a>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <Award className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-2 font-medium">No certificates yet</h3>
          <p className="text-sm text-muted-foreground">Add your certifications to showcase your achievements.</p>
        </div>
      )}

      {isAddingNew ? (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Add New Certificate</CardTitle>
            <CardDescription>Enter your certificate details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cert-name">Certificate Name *</Label>
              <Input
                id="cert-name"
                value={newCertificate.name}
                onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                placeholder="e.g. AWS Certified Solutions Architect"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-issuer">Issuing Organization *</Label>
              <Input
                id="cert-issuer"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                placeholder="e.g. Amazon Web Services"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-issue-date">Issue Date *</Label>
                <Input
                  id="cert-issue-date"
                  type="date"
                  value={newCertificate.issueDate}
                  onChange={(e) => setNewCertificate({ ...newCertificate, issueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-expiry-date">Expiry Date (Optional)</Label>
                <Input
                  id="cert-expiry-date"
                  type="date"
                  value={newCertificate.expiryDate}
                  onChange={(e) => setNewCertificate({ ...newCertificate, expiryDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-url">Credential URL (Optional)</Label>
              <Input
                id="cert-url"
                value={newCertificate.credentialUrl}
                onChange={(e) => setNewCertificate({ ...newCertificate, credentialUrl: e.target.value })}
                placeholder="e.g. https://www.credly.com/badges/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-description">Description (Optional)</Label>
              <Textarea
                id="cert-description"
                value={newCertificate.description}
                onChange={(e) => setNewCertificate({ ...newCertificate, description: e.target.value })}
                placeholder="Briefly describe what this certification represents..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cert-image">Certificate Image (Optional)</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => document.getElementById("cert-image")?.click()} type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Input id="cert-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {newCertificate.image && <span className="text-sm text-muted-foreground">Image selected</span>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCertificate} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Certificate"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={() => setIsAddingNew(true)} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Certificate
        </Button>
      )}
    </div>
  )
}
