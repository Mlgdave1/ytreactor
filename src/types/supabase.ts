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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'basic' | 'pro'
          monthly_video_count: number
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'basic' | 'pro'
          monthly_video_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'basic' | 'pro'
          monthly_video_count?: number
        }
      }
      videos: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          storage_path: string
          thumbnail_url: string | null
          duration: number
          status: 'processing' | 'ready' | 'error'
          youtube_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          storage_path: string
          thumbnail_url?: string | null
          duration?: number
          status?: 'processing' | 'ready' | 'error'
          youtube_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          storage_path?: string
          thumbnail_url?: string | null
          duration?: number
          status?: 'processing' | 'ready' | 'error'
          youtube_url?: string | null
        }
      }
      assets: {
        Row: {
          id: string
          created_at: string
          type: 'lower_third' | 'sticker' | 'overlay' | 'text'
          name: string
          url: string
          thumbnail_url: string
          tier: 'free' | 'basic' | 'pro'
          metadata: Json
        }
        Insert: {
          id?: string
          created_at?: string
          type: 'lower_third' | 'sticker' | 'overlay' | 'text'
          name: string
          url: string
          thumbnail_url: string
          tier: 'free' | 'basic' | 'pro'
          metadata?: Json
        }
        Update: {
          id?: string
          created_at?: string
          type?: 'lower_third' | 'sticker' | 'overlay' | 'text'
          name?: string
          url?: string
          thumbnail_url?: string
          tier?: 'free' | 'basic' | 'pro'
          metadata?: Json
        }
      }
      collaboration_sessions: {
        Row: {
          id: string
          created_at: string
          host_id: string
          status: 'active' | 'ended'
          recording_path: string | null
          youtube_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          host_id: string
          status?: 'active' | 'ended'
          recording_path?: string | null
          youtube_url: string
        }
        Update: {
          id?: string
          created_at?: string
          host_id?: string
          status?: 'active' | 'ended'
          recording_path?: string | null
          youtube_url?: string
        }
      }
      session_participants: {
        Row: {
          session_id: string
          user_id: string
          joined_at: string
          role: 'host' | 'guest'
        }
        Insert: {
          session_id: string
          user_id: string
          joined_at?: string
          role?: 'host' | 'guest'
        }
        Update: {
          session_id?: string
          user_id?: string
          joined_at?: string
          role?: 'host' | 'guest'
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