/**
 * Personal Stats
 */
export interface PersonalStats {
  totalProjectsJoined: number;
  completedProjects: number;
  totalHoursContributed: number;
  organizationsHelped: number;
  impactScore: number;
  averageRating: number;
}

/**
 * Project Contribution
 */
export interface ProjectContribution {
  projectId: number;
  projectTitle: string;
  organizationName: string;
  category: string;
  startDate: string;
  endDate: string;
  hoursContributed: number;
  status: string;
}

/**
 * Monthly Activity
 */
export interface MonthlyActivity {
  month: string;
  projectsJoined: number;
  hoursContributed: number;
}

/**
 * Skill Progress
 */
export interface SkillProgress {
  skillName: string;
  projectCount: number;
  level: string;
}

/**
 * Volunteer Analytics Response
 */
export interface VolunteerAnalyticsResponse {
  personalStats: PersonalStats;
  projectHistory: ProjectContribution[];
  monthlyActivities: MonthlyActivity[];
  skillsProgress: SkillProgress[];
}

/**
 * Project Metrics
 */
export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  averageCompletionDays: number;
  successRate: number;
}

/**
 * Volunteer Metrics
 */
export interface VolunteerMetrics {
  totalVolunteers: number;
  activeVolunteers: number;
  totalHoursContributed: number;
  averageRating: number;
  retentionRate: number;
}

/**
 * Engagement Metrics
 */
export interface EngagementMetrics {
  totalApplications: number;
  approvedApplications: number;
  approvalRate: number;
  totalReviews: number;
  averageProjectRating: number;
}

/**
 * Monthly Trend
 */
export interface MonthlyTrend {
  month: string;
  newProjects: number;
  newVolunteers: number;
  hoursContributed: number;
}

/**
 * Organization Analytics Response
 */
export interface OrganizationAnalyticsResponse {
  projectMetrics: ProjectMetrics;
  volunteerMetrics: VolunteerMetrics;
  engagementMetrics: EngagementMetrics;
  monthlyTrends: MonthlyTrend[];
  categoryDistribution: Record<string, number>;
}
