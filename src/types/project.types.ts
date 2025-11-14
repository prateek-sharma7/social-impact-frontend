import { ProjectStatus, ProjectType } from "@/utils/constants";

/**
 * Organization Info
 */
export interface OrganizationInfo {
  id: number;
  name: string;
  email: string;
}

/**
 * File Response
 */
export interface FileResponse {
  id: number;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  downloadUrl: string;
  category: string;
  uploadedBy: number;
  uploaderName: string;
  uploadedAt: string;
  downloadCount: number;
}

/**
 * Project Response
 */
export interface ProjectResponse {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  status: ProjectStatus;
  location: string;
  startDate: string;
  endDate: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  imageUrl?: string;
  organization: OrganizationInfo;
  images: FileResponse[];
  documents: FileResponse[];
  createdAt: string;
  updatedAt: string;
  projectType: ProjectType;
  budget?: number;
  proposalDeadline?: string;
  maxProposals?: number;
  selectedProposalId?: number;
  proposalCount?: number;
  requirements?: string;
}

/**
 * Create Project Request
 */
export interface CreateProjectRequest {
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  volunteersNeeded: number;
  projectType: ProjectType;
  imageUrl?: string;
  budget?: number;
  proposalDeadline?: string;
  maxProposals?: number;
  requirements?: string;
}

/**
 * Create Donation Project Request
 */
export interface CreateDonationProjectRequest extends CreateProjectRequest {
  budget: number;
  proposalDeadline: string;
  maxProposals: number;
  requirements?: string;
}
