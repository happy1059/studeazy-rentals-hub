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
      employer_details: {
        Row: {
          company: string
          company_size: string
          id: string
          industry: string
          position: string
        }
        Insert: {
          company: string
          company_size: string
          id: string
          industry: string
          position: string
        }
        Update: {
          company?: string
          company_size?: string
          id?: string
          industry?: string
          position?: string
        }
        Relationships: [
          {
            foreignKeyName: "employer_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          application_date: string | null
          id: string
          job_id: string
          notes: string | null
          status: string
          worker_id: string
        }
        Insert: {
          application_date?: string | null
          id?: string
          job_id: string
          notes?: string | null
          status?: string
          worker_id: string
        }
        Update: {
          application_date?: string | null
          id?: string
          job_id?: string
          notes?: string | null
          status?: string
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_applications_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_categories: {
        Row: {
          count: number | null
          icon: string
          id: string
          name: string
        }
        Insert: {
          count?: number | null
          icon: string
          id?: string
          name: string
        }
        Update: {
          count?: number | null
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      job_posts: {
        Row: {
          category_id: string
          description: string
          employer_id: string
          id: string
          location: string
          posted_date: string | null
          requirements: string[]
          salary_max: number
          salary_min: number
          salary_type: Database["public"]["Enums"]["salary_type"]
          status: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at: string | null
          urgency: Database["public"]["Enums"]["job_urgency"]
        }
        Insert: {
          category_id: string
          description: string
          employer_id: string
          id?: string
          location: string
          posted_date?: string | null
          requirements: string[]
          salary_max: number
          salary_min: number
          salary_type: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"]
          title: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["job_urgency"]
        }
        Update: {
          category_id?: string
          description?: string
          employer_id?: string
          id?: string
          location?: string
          posted_date?: string | null
          requirements?: string[]
          salary_max?: number
          salary_min?: number
          salary_type?: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"]
          title?: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["job_urgency"]
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_posts_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          location: string
          name: string
          phone: string
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          verified: boolean
        }
        Insert: {
          created_at?: string | null
          id: string
          location: string
          name: string
          phone: string
          profile_image?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verified?: boolean
        }
        Update: {
          created_at?: string | null
          id?: string
          location?: string
          name?: string
          phone?: string
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          verified?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          job_id: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewee_id_fkey"
            columns: ["reviewee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_details: {
        Row: {
          availability: Database["public"]["Enums"]["worker_availability"]
          experience: number
          id: string
          preferred_jobs: string[]
          rating: number | null
          skills: string[]
        }
        Insert: {
          availability: Database["public"]["Enums"]["worker_availability"]
          experience: number
          id: string
          preferred_jobs: string[]
          rating?: number | null
          skills: string[]
        }
        Update: {
          availability?: Database["public"]["Enums"]["worker_availability"]
          experience?: number
          id?: string
          preferred_jobs?: string[]
          rating?: number | null
          skills?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "worker_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_status: "open" | "filled" | "closed"
      job_urgency: "normal" | "urgent"
      salary_type: "hourly" | "daily" | "monthly"
      user_role: "worker" | "employer" | "admin"
      worker_availability: "immediate" | "one-week" | "two-weeks"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      job_status: ["open", "filled", "closed"],
      job_urgency: ["normal", "urgent"],
      salary_type: ["hourly", "daily", "monthly"],
      user_role: ["worker", "employer", "admin"],
      worker_availability: ["immediate", "one-week", "two-weeks"],
    },
  },
} as const
