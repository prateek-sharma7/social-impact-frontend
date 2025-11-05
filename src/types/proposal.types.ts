import { ProposalStatus } from "@/utils/constants";

/**
 * Proposer Info
 */
export interface ProposerInfo {
  id: number;
  name: string;
  email: string;
  profilePicture?: string;
  rating: number;
  completedProjects: number;
}

/**
 * Milestone Response
 */
export interface MilestoneResponse {
  title: string;
  description?: string;
  daysFromStart: number;
  amount: number;
}

/**
 * Proposal Response
 */
export interface ProposalResponse {
  id: number;
  projectId: number;
  projectTitle: string;
  proposer: ProposerInfo;
  title: string;
  description: string;
  proposedBudget: number;
  estimatedDays: number;
  status: ProposalStatus;
  approach: string;
  coverLetter?: string;
  milestones: MilestoneResponse[];
  attachments: string[];
  submittedAt: string;
  rejectionReason?: string;
  selectionDate?: string;
}

/**
 * Milestone Request
 */
export interface MilestoneRequest {
  title: string;
  description?: string;
  daysFromStart: number;
  amount: number;
}

/**
 * Create Proposal Request
 */
export interface CreateProposalRequest {
  projectId: number;
  title: string;
  description: string;
  proposedBudget: number;
  estimatedDays: number;
  approach: string;
  coverLetter?: string;
  milestones?: MilestoneRequest[];
  attachments?: string[];
}
