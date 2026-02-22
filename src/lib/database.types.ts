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
            users: {
                Row: {
                    username: string
                    name: string
                    xp: number
                    level: number
                    streak: number
                    status: string
                    last_active: string
                    pomodoro_status: Json | null
                }
                Insert: {
                    username: string
                    name: string
                    xp?: number
                    level?: number
                    streak?: number
                    status?: string
                    last_active?: string
                    pomodoro_status?: Json | null
                }
                Update: {
                    username?: string
                    name?: string
                    xp?: number
                    level?: number
                    streak?: number
                    status?: string
                    last_active?: string
                    pomodoro_status?: Json | null
                }
            }
            friendships: {
                Row: {
                    id: string
                    user1: string
                    user2: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user1: string
                    user2: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user1?: string
                    user2?: string
                    created_at?: string
                }
            }
            friend_requests: {
                Row: {
                    id: string
                    sender: string
                    receiver: string
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    sender: string
                    receiver: string
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    sender?: string
                    receiver?: string
                    status?: string
                    created_at?: string
                }
            }
            departments: {
                Row: {
                    id: string
                    name: string
                    category: string | null
                    description: string | null
                    base_score: number | null
                    city: string | null
                    university: string | null
                    type: string | null
                    match_score: number | null
                    riasec_scores: Json | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    category?: string | null
                    description?: string | null
                    base_score?: number | null
                    city?: string | null
                    university?: string | null
                    type?: string | null
                    match_score?: number | null
                    riasec_scores?: Json | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    category?: string | null
                    description?: string | null
                    base_score?: number | null
                    city?: string | null
                    university?: string | null
                    type?: string | null
                    match_score?: number | null
                    riasec_scores?: Json | null
                    created_at?: string | null
                }
            }
            mentors: {
                Row: {
                    id: string
                    name: string
                    university: string | null
                    department: string | null
                    role: string | null
                    rating: number | null
                    reviews: number | null
                    price: number | null
                    image: string | null
                    tags: string[] | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    university?: string | null
                    department?: string | null
                    role?: string | null
                    rating?: number | null
                    reviews?: number | null
                    price?: number | null
                    image?: string | null
                    tags?: string[] | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    university?: string | null
                    department?: string | null
                    role?: string | null
                    rating?: number | null
                    reviews?: number | null
                    price?: number | null
                    image?: string | null
                    tags?: string[] | null
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
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
