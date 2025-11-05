// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://social-impact-api.onrender.com";
export const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";
export const API_URL = `${API_BASE_URL}/api/${API_VERSION}`;

// App Configuration
export const APP_NAME =
  import.meta.env.VITE_APP_NAME || "Social Impact Platform";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

// File Upload Configuration
export const MAX_FILE_SIZE =
  Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760; // 10MB
export const ALLOWED_FILE_TYPES =
  import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(",") || [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

// Pagination
export const DEFAULT_PAGE_SIZE =
  Number(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 12;

// User Roles
export const USER_ROLES = {
  VOLUNTEER: "VOLUNTEER",
  ORGANIZATION: "ORGANIZATION",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Project Types
export const PROJECT_TYPES = {
  VOLUNTEER: "VOLUNTEER",
  DONATION: "DONATION",
} as const;

export type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

// Project Status
export const PROJECT_STATUS = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type ProjectStatus =
  (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS];

// Application Status
export const APPLICATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN",
} as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUS)[keyof typeof APPLICATION_STATUS];

// Proposal Status
export const PROPOSAL_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  WITHDRAWN: "WITHDRAWN",
} as const;

export type ProposalStatus =
  (typeof PROPOSAL_STATUS)[keyof typeof PROPOSAL_STATUS];

// Message Types
export const MESSAGE_TYPES = {
  GENERAL: "GENERAL",
  PROJECT_INQUIRY: "PROJECT_INQUIRY",
  APPLICATION: "APPLICATION",
} as const;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

// Message Status
export const MESSAGE_STATUS = {
  SENT: "SENT",
  READ: "READ",
} as const;

export type MessageStatus =
  (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];

// Review Types
export const REVIEW_TYPES = {
  PROJECT: "PROJECT",
  VOLUNTEER: "VOLUNTEER",
  ORGANIZATION: "ORGANIZATION",
} as const;

export type ReviewType = (typeof REVIEW_TYPES)[keyof typeof REVIEW_TYPES];

// Local Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_DATA: "user_data",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  VOLUNTEER_DASHBOARD: "/dashboard/volunteer",
  ORGANIZATION_DASHBOARD: "/dashboard/organization",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  CREATE_PROJECT: "/projects/create",
  EDIT_PROJECT: "/projects/:id/edit",
  MY_PROJECTS: "/my-projects",
  PROFILE: "/profile",
  EDIT_PROFILE: "/profile/edit",
  USER_PROFILE: "/users/:id",
  MESSAGES: "/messages",
  NOTIFICATIONS: "/notifications",
  MY_APPLICATIONS: "/applications",
  MY_PROPOSALS: "/proposals",
  CREATE_PROPOSAL: "/proposals/create/:projectId",
  ANALYTICS: "/analytics",
  SEARCH: "/search",
  NOT_FOUND: "/404",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },

  // Users
  USERS: {
    ME: "/users/me",
    BY_ID: (id: number) => `/users/${id}`,
    BY_EMAIL: (email: string) => `/users/email/${email}`,
    UPDATE_PROFILE: "/users/profile",
  },

  // Projects
  PROJECTS: {
    LIST: "/projects",
    BY_ID: (id: number) => `/projects/${id}`,
    CREATE: "/projects",
    CREATE_WITH_FILES: "/projects/with-files",
    UPDATE: (id: number) => `/projects/${id}`,
    MY_PROJECTS: "/projects/my-projects",
    RECENT: "/projects/recent",
    BY_CATEGORY: (category: string) => `/projects/category/${category}`,
    DONATION: "/projects/donation",
    CREATE_DONATION: "/projects/donation",
    SEARCH: "/projects/search",
    UPLOAD_FILES: (projectId: number) => `/projects/${projectId}/files`,
  },

  // Volunteers
  VOLUNTEERS: {
    REGISTER: (projectId: number) =>
      `/volunteers/projects/${projectId}/register`,
    MY_REGISTRATIONS: "/volunteers/my-registrations",
    WITHDRAW: (projectId: number) =>
      `/volunteers/projects/${projectId}/withdraw`,
  },

  // Proposals
  PROPOSALS: {
    CREATE: "/proposals",
    MY_PROPOSALS: "/proposals/my-proposals",
    BY_ID: (proposalId: number) => `/proposals/${proposalId}`,
    BY_PROJECT: (projectId: number) => `/proposals/project/${projectId}`,
    UPDATE_STATUS: (proposalId: number) => `/proposals/${proposalId}/status`,
  },

  // Messages
  MESSAGES: {
    SEND: "/messages",
    CONVERSATIONS: "/messages/conversations",
    CONVERSATION: (otherUserId: number) =>
      `/messages/conversation/${otherUserId}`,
    MARK_READ: (senderId: number) => `/messages/mark-read/${senderId}`,
    UNREAD_COUNT: "/messages/unread-count",
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: "/notifications",
    UNREAD: "/notifications/unread",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_READ: (notificationId: number) =>
      `/notifications/${notificationId}/read`,
    MARK_ALL_READ: "/notifications/mark-all-read",
    PREFERENCES: "/notifications/preferences",
    UPDATE_PREFERENCES: "/notifications/preferences",
  },

  // Reviews
  REVIEWS: {
    CREATE: "/reviews",
    BY_PROJECT: (projectId: number) => `/reviews/projects/${projectId}`,
    BY_USER: (userId: number) => `/reviews/users/${userId}`,
    RATING_SUMMARY: (projectId: number) =>
      `/reviews/projects/${projectId}/summary`,
    ADD_RESPONSE: (reviewId: number) => `/reviews/${reviewId}/response`,
  },

  // Dashboard
  DASHBOARD: {
    VOLUNTEER: "/dashboard/volunteer",
    ORGANIZATION: "/dashboard/organization",
  },

  // Analytics
  ANALYTICS: {
    VOLUNTEER: "/analytics/volunteer",
    VOLUNTEER_BY_ID: (volunteerId: number) =>
      `/analytics/volunteer/${volunteerId}`,
    ORGANIZATION: "/analytics/organization",
    ORGANIZATION_BY_ID: (orgId: number) => `/analytics/organization/${orgId}`,
    PLATFORM: "/analytics/platform",
  },

  // Search
  SEARCH: {
    PROJECTS: "/search/projects",
    FILTERS: "/search/filters",
    SIMILAR: (projectId: number) => `/search/projects/${projectId}/similar`,
    RECOMMENDATIONS: "/search/projects/recommendations",
  },

  // Files
  FILES: {
    UPLOAD: "/files/upload",
    UPLOAD_PROFILE_PICTURE: (userId: number) =>
      `/files/upload/profile-picture/${userId}`,
    UPLOAD_PROJECT: (projectId: number) => `/files/upload/project/${projectId}`,
    DOWNLOAD: (fileId: number) => `/files/download/${fileId}`,
    BY_ID: (fileId: number) => `/files/${fileId}`,
    BY_ENTITY: (entityType: string, entityId: number) =>
      `/files/entity/${entityType}/${entityId}`,
    BY_CATEGORY: (category: string) => `/files/category/${category}`,
    DELETE: (fileId: number) => `/files/${fileId}`,
  },

  // Health Check
  HEALTH: "/test/health",
} as const;

// Project Categories
export const PROJECT_CATEGORIES = [
  "Education",
  "Healthcare",
  "Environment",
  "Community Development",
  "Animal Welfare",
  "Disaster Relief",
  "Youth Development",
  "Senior Care",
  "Food Security",
  "Housing",
  "Arts & Culture",
  "Sports & Recreation",
  "Human Rights",
  "Technology",
  "Other",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

// Skills
export const COMMON_SKILLS = [
  "Teaching",
  "Mentoring",
  "Event Planning",
  "Fundraising",
  "Marketing",
  "Social Media",
  "Photography",
  "Video Editing",
  "Graphic Design",
  "Web Development",
  "Data Analysis",
  "Writing",
  "Translation",
  "Public Speaking",
  "Project Management",
  "First Aid",
  "Cooking",
  "Construction",
  "Gardening",
  "Animal Care",
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: "createdAt,desc", label: "Newest First" },
  { value: "createdAt,asc", label: "Oldest First" },
  { value: "title,asc", label: "Title A-Z" },
  { value: "title,desc", label: "Title Z-A" },
  { value: "volunteersNeeded,desc", label: "Most Volunteers Needed" },
  { value: "startDate,asc", label: "Starting Soon" },
] as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  DISPLAY_WITH_TIME: "MMM dd, yyyy hh:mm a",
  INPUT: "yyyy-MM-dd",
  FULL: "MMMM dd, yyyy",
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  APPLICATION_RECEIVED: "APPLICATION_RECEIVED",
  APPLICATION_APPROVED: "APPLICATION_APPROVED",
  APPLICATION_REJECTED: "APPLICATION_REJECTED",
  PROJECT_UPDATED: "PROJECT_UPDATED",
  NEW_MESSAGE: "NEW_MESSAGE",
  REVIEW_RECEIVED: "REVIEW_RECEIVED",
  PROPOSAL_RECEIVED: "PROPOSAL_RECEIVED",
  PROPOSAL_ACCEPTED: "PROPOSAL_ACCEPTED",
  PROPOSAL_REJECTED: "PROPOSAL_REJECTED",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

// Email Frequency
export const EMAIL_FREQUENCY = {
  IMMEDIATELY: "IMMEDIATELY",
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  NEVER: "NEVER",
} as const;

export type EmailFrequency =
  (typeof EMAIL_FREQUENCY)[keyof typeof EMAIL_FREQUENCY];
