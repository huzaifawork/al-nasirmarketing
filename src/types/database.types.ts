export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      media_showcase: {
        Row: {
          id: string
          image_url: string
          caption: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          image_url: string
          caption?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          image_url?: string
          caption?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          id: string
          is_featured: boolean | null
          logo_url: string
          name: string
          sort_order: number | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          logo_url: string
          name: string
          sort_order?: number | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          logo_url?: string
          name?: string
          sort_order?: number | null
          website_url?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          company: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string | null
          name: string
          phone: string | null
          service_interest: string | null
          created_at: string | null
        }
        Insert: {
          company?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name: string
          phone?: string | null
          service_interest?: string | null
          created_at?: string | null
        }
        Update: {
          company?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          name?: string
          phone?: string | null
          service_interest?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      presence_cities: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      presence_images: {
        Row: {
          caption: string | null
          city_id: string | null
          created_at: string | null
          id: string
          image_url: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          city_id?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          city_id?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "presence_images_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "presence_cities"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          key: string
          value: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          value: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          value?: Json
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          department: string
          fun_fact: string | null
          id: string
          linkedin_url: string | null
          name: string
          photo_url: string | null
          quote: string | null
          role: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          department: string
          fun_fact?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          photo_url?: string | null
          quote?: string | null
          role: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          department?: string
          fun_fact?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          photo_url?: string | null
          quote?: string | null
          role?: string
          sort_order?: number | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
