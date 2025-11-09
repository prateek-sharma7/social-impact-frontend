import { useQuery } from '@tanstack/react-query';
import { dashboardAPI } from '@/api/endpoints/dashboard.api';

export const useVolunteerDashboard = () => {
  return useQuery({
    queryKey: ['volunteerDashboard'],
    queryFn: dashboardAPI.getVolunteerDashboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOrganizationDashboard = () => {
  return useQuery({
    queryKey: ['organizationDashboard'],
    queryFn: dashboardAPI.getOrganizationDashboard,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};