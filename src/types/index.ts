// User Types
export type UserRole = 'client' | 'secretary' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImageUrl?: string;
  createdAt: string;
}

// Client Types
export interface ClientProfile extends User {
  role: 'client';
  badges: ClientBadge[];
  verifications: {
    identity: boolean;
    business?: VerificationStatus;
    revenue?: VerificationStatus;
    salary?: VerificationStatus;
  };
}

export interface ClientBadge {
  id: string;
  type: 'business_verified' | 'high_revenue' | 'high_income';
  name: string;
  icon: string;
  verifiedAt: string;
}

// Secretary Types
export interface SecretaryProfile extends User {
  role: 'secretary';
  profileImages: ProfileImage[];
  bio: string;
  experience: string;
  education: string;
  skills: string[];
  categories: SecretaryCategory[];
  badges: SecretaryBadge[];
  availableRegions: string[];
  rating: number;
  reviewCount: number;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export interface ProfileImage {
  id: string;
  url: string;
  order: number;
  isPrimary: boolean;
}

export type SecretaryCategory =
  | 'personal_secretary'
  | 'business_secretary'
  | 'travel_secretary'
  | 'yoga_secretary';

export interface SecretaryBadge {
  id: string;
  type: string;
  name: string;
  icon: string;
  verifiedAt?: string;
}

// Job Request Types
export interface JobRequest {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  region: string;
  expectedSalary: number;
  preferredSecretaryTypes?: SecretaryCategory[];
  status: 'open' | 'closed' | 'completed';
  applicantCount: number;
  createdAt: string;
}

// Verification Types
export interface VerificationStatus {
  status: 'pending' | 'pending_admin_approval' | 'approved' | 'rejected';
  verifiedAt?: string;
  submittedAt?: string;
  badgeAwarded?: boolean;
}

// Search Filters
export interface SecretarySearchFilters {
  keyword?: string;
  region?: string;
  minAge?: number;
  maxAge?: number;
  gender?: 'male' | 'female' | 'other';
  categories?: SecretaryCategory[];
  badges?: string[];
  minRating?: number;
}

export interface JobRequestSearchFilters {
  keyword?: string;
  minAge?: number;
  maxAge?: number;
  gender?: 'male' | 'female' | 'other';
  region?: string;
  clientBadges?: string[];
  startDate?: string;
  endDate?: string;
  preferredSecretaryTypes?: SecretaryCategory[];
  minAmount?: number;
  maxAmount?: number;
}
