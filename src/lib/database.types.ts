export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string
          full_name: string
          title: string
          bio: string
          value_statement: string
          email: string
          linkedin_url: string | null
          github_url: string | null
          profile_image_url: string | null
          resume_pdf_url: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          full_name?: string
          title?: string
          bio?: string
          value_statement?: string
          email?: string
          linkedin_url?: string | null
          github_url?: string | null
          profile_image_url?: string | null
          resume_pdf_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          title?: string
          bio?: string
          value_statement?: string
          email?: string
          linkedin_url?: string | null
          github_url?: string | null
          profile_image_url?: string | null
          resume_pdf_url?: string | null
          updated_at?: string | null
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          proficiency: number | null
          display_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          proficiency?: number | null
          display_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          proficiency?: number | null
          display_order?: number | null
          created_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          tech_stack: string[] | null
          image_url: string | null
          project_url: string | null
          github_url: string | null
          featured: boolean | null
          display_order: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          tech_stack?: string[] | null
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          featured?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          tech_stack?: string[] | null
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          featured?: boolean | null
          display_order?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          date_earned: string | null
          display_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          date_earned?: string | null
          display_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          date_earned?: string | null
          display_order?: number | null
          created_at?: string | null
        }
      }
      resume_sections: {
        Row: {
          id: string
          section_type: string
          title: string
          organization: string | null
          location: string | null
          start_date: string | null
          end_date: string | null
          description: string | null
          display_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          section_type: string
          title: string
          organization?: string | null
          location?: string | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          display_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          section_type?: string
          title?: string
          organization?: string | null
          location?: string | null
          start_date?: string | null
          end_date?: string | null
          description?: string | null
          display_order?: number | null
          created_at?: string | null
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          read: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          read?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          read?: boolean | null
          created_at?: string | null
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
