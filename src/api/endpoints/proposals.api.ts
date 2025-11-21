import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import {
  ProposalResponse,
  CreateProposalRequest,
} from "@/types/proposal.types";
import { ProposalStatus } from "@/utils/constants";

/**
 * Proposals API
 */
export const proposalsAPI = {
  /**
   * Get details of a specific proposal
   */
  getProposalById: async (proposalId: number): Promise<ProposalResponse> => {
    const response = await apiClient.get(
      API_ENDPOINTS.PROPOSALS.BY_ID(proposalId)
    );
    return response.data;
  },

  /**
   * Get all proposals for a specific project
   */
  getProposalsByProject: async (
    projectId: number
  ): Promise<ProposalResponse[]> => {
    const response = await apiClient.get(
      API_ENDPOINTS.PROPOSALS.BY_PROJECT(projectId)
    );
    return response.data;
  },

  /**
   * Get all proposals submitted by the current user
   */
  getMyProposals: async (): Promise<ProposalResponse[]> => {
    const response = await apiClient.get(API_ENDPOINTS.PROPOSALS.MY_PROPOSALS);
    return response.data;
  },

  /**
   * Create a new proposal
   */
  createProposal: async (
    data: CreateProposalRequest
  ): Promise<ProposalResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.PROPOSALS.CREATE, data);
    return response.data;
  },

  /**
   * Update the status of an existing proposal
   */
  updateProposalStatus: async (
    proposalId: number,
    status: ProposalStatus,
    rejectionReason?: string
  ): Promise<ProposalResponse> => {
    const response = await apiClient.put(
      API_ENDPOINTS.PROPOSALS.UPDATE_STATUS(proposalId),
      {
        status,
        rejectionReason: rejectionReason ?? null,
      }
    );
    return response.data;
  },
};
