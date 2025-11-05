import { ProjectResponse } from "./project.types";
import { UserResponse } from "./user.types";
import { VolunteerApplicationResponse } from "./volunteer.types";

/**
 * Achievement Response
 */
export interface AchievementResponse {
  id: number;
  title: string;
  description: string;
  badgeIcon: string;
  earnedAt: string;
}

/**
 * Dashboard Stats
 */
export interface DashboardStats {
  totalProjectsCreated: number;
  activeProjects: number;
  totalVolunteersEngaged: number;
  pendingApplications: number;
  averageProjectRating: number;
}

/**
 * Volunteer Dashboard Response
 */
export interface VolunteerDashboardResponse {
  userInfo: UserResponse;
  stats: DashboardStats;
  activeProjects: ProjectResponse[];
  completedProjects: ProjectResponse[];
  recentAchievements: AchievementResponse[];
}

/**
 * Organization Dashboard Response
 */
export interface OrganizationDashboardResponse {
  userInfo: UserResponse;
  stats: DashboardStats;
  activeProjects: ProjectResponse[];
  draftProjects: ProjectResponse[];
  pendingApplications: VolunteerApplicationResponse[];
}
