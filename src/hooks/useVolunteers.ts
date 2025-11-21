import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { volunteerAPI } from "@/api/endpoints/volunteer.api";
import { VolunteerRegistrationRequest } from "@/types/volunteer.types";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/utils/helpers";

/**
 * Hook to get my volunteer registrations
 */
export const useMyRegistrations = () => {
  return useQuery({
    queryKey: ["myRegistrations"],
    queryFn: volunteerAPI.getVolunteerRegistrations,
  });
};

/**
 * Hook to register as volunteer for a project
 */
export const useRegisterForProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: number;
      data: VolunteerRegistrationRequest;
    }) => volunteerAPI.registerAsVolunteer(data, projectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project", variables.projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["myRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Successfully registered as volunteer!");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
};

/**
 * Hook to withdraw from a project
 */
export const useWithdrawFromProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) =>
      volunteerAPI.withdrawVolunteerApplication(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      queryClient.invalidateQueries({ queryKey: ["myRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Successfully withdrew from project");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    },
  });
};
