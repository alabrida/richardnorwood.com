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
                    email: string | null
                    full_name: string | null
                    subscription_tier: 'free' | 'standard' | 'pro' | 'battleship' | 'agency'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    subscription_tier?: 'free' | 'standard' | 'pro' | 'battleship' | 'agency'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    subscription_tier?: 'free' | 'standard' | 'pro' | 'battleship' | 'agency'
                    created_at?: string
                    updated_at?: string
                }
            }
            revenue_journey_assessments: {
                Row: {
                    id: string
                    user_id: string
                    score_total: number
                    score_awareness: number
                    score_consideration: number
                    score_decision: number
                    score_conversion: number
                    score_retention: number
                    top_leaks: Json // Array of { stage, title, priority }
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    score_total: number
                    score_awareness?: number
                    score_consideration?: number
                    score_decision?: number
                    score_conversion?: number
                    score_retention?: number
                    top_leaks?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    score_total?: number
                    score_awareness?: number
                    score_consideration?: number
                    score_decision?: number
                    score_conversion?: number
                    score_retention?: number
                    top_leaks?: Json
                    created_at?: string
                }
            }
        }
    }
}
