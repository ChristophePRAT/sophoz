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
      articles: {
        Row: {
          conclusion: string | null
          context: string | null
          created_at: string | null
          id: number
          picture_path: string | null
          tags: string[] | null
          title: string
        }
        Insert: {
          conclusion?: string | null
          context?: string | null
          created_at?: string | null
          id?: number
          picture_path?: string | null
          tags?: string[] | null
          title: string
        }
        Update: {
          conclusion?: string | null
          context?: string | null
          created_at?: string | null
          id?: number
          picture_path?: string | null
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          article: number
          created_at: string | null
          from_user: string
          id: number
        }
        Insert: {
          article: number
          created_at?: string | null
          from_user: string
          id?: number
        }
        Update: {
          article?: number
          created_at?: string | null
          from_user?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_article_fkey"
            columns: ["article"]
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          bias: string
          content: string
          id: number
          parent_article: number
        }
        Insert: {
          bias: string
          content: string
          id?: number
          parent_article: number
        }
        Update: {
          bias?: string
          content?: string
          id?: number
          parent_article?: number
        }
        Relationships: [
          {
            foreignKeyName: "positions_parent_article_fkey"
            columns: ["parent_article"]
            referencedRelation: "articles"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
