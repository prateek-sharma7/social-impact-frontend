import apiClient from "../client";
import { API_ENDPOINTS } from "@/utils/constants";
import { FileUploadResponse } from "@/types/common.types";

/**
 * Files API
 */
export const filesAPI = {
  /**
   * Upload profile picture
   */
  uploadProfilePicture: async (
    userId: number,
    file: File
  ): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      API_ENDPOINTS.FILES.UPLOAD_PROFILE_PICTURE(userId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  /**
   * Delete file
   */
  deleteFile: async (fileId: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.FILES.DELETE(fileId));
  },
};
