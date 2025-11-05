import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string()
  .min(1, 'Email is required')
  .email('Invalid email address');

/**
 * Password validation schema
 */
export const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters');

/**
 * Phone validation schema
 */
export const phoneSchema = z.string()
  .regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number')
  .optional()
  .or(z.literal(''));

/**
 * URL validation schema
 */
export const urlSchema = z.string()
  .url('Invalid URL')
  .optional()
  .or(z.literal(''));

/**
 * Login validation schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Register validation schema
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['VOLUNTEER', 'ORGANIZATION'], {
    required_error: 'Please select a role',
  }),
  organizationName: z.string().optional(),
  phoneNumber: phoneSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.role === 'ORGANIZATION') {
    return !!data.organizationName && data.organizationName.length > 0;
  }
  return true;
}, {
  message: 'Organization name is required',
  path: ['organizationName'],
});

/**
 * Profile update validation schema
 */
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  bio: z.string().max(1000).optional(),
  location: z.string().max(255).optional(),
  phoneNumber: phoneSchema,
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  availability: z.string().optional(),
  organizationName: z.string().optional(),
  website: urlSchema,
  organizationType: z.string().optional(),
});

/**
 * Base project schema (without refinements)
 */
const baseProjectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  shortDescription: z.string().max(500).optional(),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  volunteersNeeded: z.number().min(1).max(1000),
  projectType: z.enum(['VOLUNTEER', 'DONATION']),
  imageUrl: z.string().optional(),
});

/**
 * Project creation validation schema
 */
export const createProjectSchema = baseProjectSchema.refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end > start;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

/**
 * Donation project validation schema
 */
export const createDonationProjectSchema = baseProjectSchema.extend({
  budget: z.number().min(0, 'Budget must be a positive number'),
  proposalDeadline: z.string().min(1, 'Proposal deadline is required'),
  maxProposals: z.number().min(1).max(50),
  requirements: z.string().optional(),
}).refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end > start;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

/**
 * Volunteer registration validation schema
 */
export const volunteerRegistrationSchema = z.object({
  motivation: z.string()
    .min(50, 'Motivation must be at least 50 characters')
    .max(1000, 'Motivation must not exceed 1000 characters'),
});

/**
 * Proposal creation validation schema
 */
export const createProposalSchema = z.object({
  projectId: z.number(),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(100, 'Description must be at least 100 characters'),
  proposedBudget: z.number().min(0, 'Budget must be positive'),
  estimatedDays: z.number().min(1, 'Estimated days must be at least 1'),
  approach: z.string().min(1, 'Approach is required'),
  coverLetter: z.string().max(2000).optional(),
  milestones: z.array(z.object({
    title: z.string().min(1, 'Milestone title is required'),
    description: z.string().optional(),
    daysFromStart: z.number().min(0),
    amount: z.number().min(0),
  })).optional(),
  attachments: z.array(z.string()).optional(),
});

/**
 * Message send validation schema
 */
export const sendMessageSchema = z.object({
  receiverId: z.number(),
  content: z.string().min(1, 'Message cannot be empty').max(5000),
  projectId: z.number().optional(),
  messageType: z.enum(['GENERAL', 'PROJECT_INQUIRY', 'APPLICATION']).optional(),
});

/**
 * Review creation validation schema
 */
export const createReviewSchema = z.object({
  projectId: z.number(),
  reviewedUserId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(2000).optional(),
  reviewType: z.enum(['PROJECT', 'VOLUNTEER', 'ORGANIZATION']),
});

/**
 * Review response validation schema
 */
export const reviewResponseSchema = z.object({
  response: z.string().min(1, 'Response cannot be empty').max(1000),
});

/**
 * Search filters validation schema
 */
export const searchFiltersSchema = z.object({
  keyword: z.string().optional(),
  categories: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  startDateFrom: z.string().optional(),
  startDateTo: z.string().optional(),
  minVolunteersNeeded: z.number().optional(),
  maxVolunteersNeeded: z.number().optional(),
  projectStatus: z.array(z.string()).optional(),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional(),
  page: z.number().min(0).optional(),
  size: z.number().min(1).optional(),
});

/**
 * File upload validation
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10485760, 'File size must be less than 10MB')
    .refine((file) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      return allowedTypes.includes(file.type);
    }, 'File must be JPG, PNG or PDF'),
});