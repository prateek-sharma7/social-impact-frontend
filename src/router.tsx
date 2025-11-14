import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import {
  ProtectedRoute,
  VolunteerRoute,
  OrganizationRoute,
} from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Auth Pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";

// Public Pages
import { HomePage } from "@/pages/HomePage";
import { SettingsPage } from "./pages/profile/SettingsPage";
import { PublicProfilePage } from "./pages/profile/PublicProfilePage";
import { VolunteerDashboard } from "./pages/dashboard/VolunteerDashboard";
import { OrganizationDashboard } from "./pages/dashboard/OrganizationDashboard";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { MyProjectsPage } from "./pages/projects/MyProjectsPage";
import { CreateProjectPage } from "./pages/projects/CreateProjectPage";

// The route should already be set up from Step 4

// Placeholder components (we'll build these in next steps)
const ProjectsPage = () => (
  <div className="container-custom py-12">Projects Page - Coming Soon</div>
);
const NotificationsPage = () => <div>Notifications - Coming Soon</div>;
const MessagesPage = () => <div>Messages - Coming Soon</div>;
const MyApplicationsPage = () => <div>My Applications - Coming Soon</div>;
const AnalyticsPage = () => <div>Analytics - Coming Soon</div>;
const SearchPage = () => <div>Search - Coming Soon</div>;
const NotFoundPage = () => (
  <div className="container-custom py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">
      404 - Page Not Found
    </h1>
    <p className="text-gray-600">The page you're looking for doesn't exist.</p>
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        {/* Public Profile View */}
        <Route path={ROUTES.USER_PROFILE} element={<PublicProfilePage />} />
      </Route>

      {/* Auth Routes (no layout) */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes with Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        {/* Dashboard redirect */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Navigate to={ROUTES.VOLUNTEER_DASHBOARD} replace />
            </ProtectedRoute>
          }
        />

        {/* Common Protected Routes */}
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.NOTIFICATIONS}
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.MESSAGES}
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        {/* Volunteer Routes */}
        <Route
          path={ROUTES.VOLUNTEER_DASHBOARD}
          element={
            <VolunteerRoute>
              <VolunteerDashboard />
            </VolunteerRoute>
          }
        />
        <Route
          path={ROUTES.MY_APPLICATIONS}
          element={
            <VolunteerRoute>
              <MyApplicationsPage />
            </VolunteerRoute>
          }
        />

        {/* Organization Routes */}
        <Route
          path={ROUTES.ORGANIZATION_DASHBOARD}
          element={
            <OrganizationRoute>
              <OrganizationDashboard />
            </OrganizationRoute>
          }
        />
        <Route
          path={ROUTES.MY_PROJECTS}
          element={
            <OrganizationRoute>
              <MyProjectsPage />
            </OrganizationRoute>
          }
        />
        <Route
          path={ROUTES.CREATE_PROJECT}
          element={
            <OrganizationRoute>
              <CreateProjectPage />
            </OrganizationRoute>
          }
        />
      </Route>

      {/* 404 - Catch all */}
      <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
    </Routes>
  );
}
