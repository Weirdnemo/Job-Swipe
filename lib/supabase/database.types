export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
          skills: Json[] | null
          certificates: Json[] | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          location?: string | null
          phone?: string | null
          title?: string | null
          created_at?: string
          skills?: Json[] | null
          certificates?: Json[] | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          bio?: string | null
          location?: string | null
          phone?: string | null
          title?: string | null
          created_at?: string
          skills?: Json[] | null
          certificates?: Json[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
