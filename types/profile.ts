export interface Skill {
  name: string
  category: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialUrl?: string
  description?: string
  image?: string
}

export interface Profile {
  id: string
  updated_at: string | null
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  bio: string | null
  location: string | null
  phone: string | null
  title: string | null
  created_at: string
  skills: Skill[] | null
  certificates: Certificate[] | null
}
