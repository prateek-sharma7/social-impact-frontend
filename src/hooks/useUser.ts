import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersAPI } from "@/api/endpoints/users.api";
import { UpdateProfileRequest } from "@/types/user.types";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: usersAPI.getMe,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUser = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersAPI.getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersAPI.updateProfile(data),
    onSuccess: (updatedUser) => {
      // Update the user in the auth store
      updateUser(updatedUser);

      // Invalidate and refetch current user data
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      queryClient.setQueryData(["currentUser"], updatedUser);

      toast.success("Profile updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};
