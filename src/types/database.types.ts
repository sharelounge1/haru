export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserType = 'client' | 'secretary'
export type VerificationType = 'identity' | 'business' | 'revenue' | 'salary'
export type VerificationStatus = 'pending' | 'approved' | 'rejected'
export type WorkType = 'full_time' | 'part_time' | 'contract'
export type SalaryType = 'monthly' | 'hourly' | 'negotiable'
export type JobStatus = 'recruiting' | 'in_progress' | 'closed'
export type MatchType = 'job_application' | 'direct_contact'
export type MatchStatus = 'pending' | 'accepted' | 'rejected' | 'completed'
export type ContractStatus = 'active' | 'pending' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          user_type: UserType
          name: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          user_type: UserType
          name: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          user_type?: UserType
          name?: string
          phone?: string | null
          updated_at?: string
        }
      }
      client_profiles: {
        Row: {
          id: string
          user_id: string
          company_name: string | null
          business_number: string | null
          position: string | null
          region: string | null
          bio: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name?: string | null
          business_number?: string | null
          position?: string | null
          region?: string | null
          bio?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          business_number?: string | null
          position?: string | null
          region?: string | null
          bio?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      secretary_profiles: {
        Row: {
          id: string
          user_id: string
          region: string | null
          bio: string | null
          specialty: string | null
          education: string | null
          experience_years: number
          hourly_rate: number | null
          rating: number
          review_count: number
          completed_jobs: number
          avatar_url: string | null
          available_days: Json
          languages: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          region?: string | null
          bio?: string | null
          specialty?: string | null
          education?: string | null
          experience_years?: number
          hourly_rate?: number | null
          rating?: number
          review_count?: number
          completed_jobs?: number
          avatar_url?: string | null
          available_days?: Json
          languages?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          region?: string | null
          bio?: string | null
          specialty?: string | null
          education?: string | null
          experience_years?: number
          hourly_rate?: number | null
          rating?: number
          review_count?: number
          completed_jobs?: number
          avatar_url?: string | null
          available_days?: Json
          languages?: Json
          updated_at?: string
        }
      }
      job_postings: {
        Row: {
          id: string
          client_id: string
          title: string
          description: string
          categories: Json
          region: string | null
          work_type: WorkType
          salary_type: SalaryType
          salary_amount: number | null
          start_date: string | null
          end_date: string | null
          status: JobStatus
          required_skills: Json
          benefits: Json
          applicant_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          description: string
          categories?: Json
          region?: string | null
          work_type?: WorkType
          salary_type?: SalaryType
          salary_amount?: number | null
          start_date?: string | null
          end_date?: string | null
          status?: JobStatus
          required_skills?: Json
          benefits?: Json
          applicant_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string
          categories?: Json
          region?: string | null
          work_type?: WorkType
          salary_type?: SalaryType
          salary_amount?: number | null
          start_date?: string | null
          end_date?: string | null
          status?: JobStatus
          required_skills?: Json
          benefits?: Json
          applicant_count?: number
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          job_posting_id: string | null
          client_id: string
          secretary_id: string
          match_type: MatchType
          status: MatchStatus
          applied_date: string
          response_date: string | null
          message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_posting_id?: string | null
          client_id: string
          secretary_id: string
          match_type: MatchType
          status?: MatchStatus
          applied_date?: string
          response_date?: string | null
          message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: MatchStatus
          response_date?: string | null
          message?: string | null
          updated_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          match_id: string | null
          client_id: string
          secretary_id: string
          title: string
          start_date: string
          end_date: string | null
          salary: number
          status: ContractStatus
          contract_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          match_id?: string | null
          client_id: string
          secretary_id: string
          title: string
          start_date: string
          end_date?: string | null
          salary: number
          status?: ContractStatus
          contract_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          start_date?: string
          end_date?: string | null
          salary?: number
          status?: ContractStatus
          contract_url?: string | null
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          contract_id: string
          amount: number
          payment_date: string
          payment_method: string | null
          status: PaymentStatus
          description: string | null
          receipt_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contract_id: string
          amount: number
          payment_date: string
          payment_method?: string | null
          status?: PaymentStatus
          description?: string | null
          receipt_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          payment_date?: string
          payment_method?: string | null
          status?: PaymentStatus
          description?: string | null
          receipt_url?: string | null
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          contract_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contract_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          rating?: number
          comment?: string | null
          updated_at?: string
        }
      }
      verifications: {
        Row: {
          id: string
          user_id: string
          verification_type: VerificationType
          status: VerificationStatus
          document_url: string | null
          verified_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          verification_type: VerificationType
          status?: VerificationStatus
          document_url?: string | null
          verified_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: VerificationStatus
          document_url?: string | null
          verified_at?: string | null
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          secretary_id: string
          name: string
          issuer: string | null
          issue_date: string | null
          certificate_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          secretary_id: string
          name: string
          issuer?: string | null
          issue_date?: string | null
          certificate_url?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          issuer?: string | null
          issue_date?: string | null
          certificate_url?: string | null
        }
      }
      work_history: {
        Row: {
          id: string
          secretary_id: string
          company_name: string
          position: string | null
          start_date: string
          end_date: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          secretary_id: string
          company_name: string
          position?: string | null
          start_date: string
          end_date?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          company_name?: string
          position?: string | null
          start_date?: string
          end_date?: string | null
          description?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          match_id: string | null
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          match_id?: string | null
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          content?: string
          read?: boolean
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
      user_type: UserType
      verification_type: VerificationType
      verification_status: VerificationStatus
      work_type: WorkType
      salary_type: SalaryType
      job_status: JobStatus
      match_type: MatchType
      match_status: MatchStatus
      contract_status: ContractStatus
      payment_status: PaymentStatus
    }
  }
}
