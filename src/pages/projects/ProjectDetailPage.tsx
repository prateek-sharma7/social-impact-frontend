import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProject, useDeleteProject } from "@/hooks/useProjects";
import { useAuthStore } from "@/store/authStore";
import { PageHeader } from "@/components/layout";
import {
  Button,
  Card,
  CardContent,
  Badge,
  Avatar,
  Spinner,
  Alert,
  Modal,
  ModalFooter,
  Tabs,
  TabItem,
  EmptyState,
} from "@/components/common";
import {
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  formatDate,
  calculatePercentage,
  copyToClipboard,
} from "@/utils/helpers";
import { ROUTES, USER_ROLES } from "@/utils/constants";
import toast from "react-hot-toast";

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const projectId = Number(id);

  const { data: project, isLoading, error } = useProject(projectId);
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const isOwner = user?.id === project?.organization.id;
  const isVolunteer = user?.role === USER_ROLES.VOLUNTEER;
  const canApply = isVolunteer && project?.status === "ACTIVE";

  const handleDelete = () => {
    deleteProject(projectId);
    setShowDeleteModal(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}${ROUTES.PROJECTS}/${projectId}`;
    copyToClipboard(url);
    toast.success("Project link copied to clipboard!");
  };

  const handleApply = () => {
    // Navigate to application page (we'll implement this later)
    navigate(`${ROUTES.PROJECTS}/${projectId}/apply`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <EmptyState
        title="Project not found"
        description="The project you're looking for doesn't exist or has been removed."
        actionLabel="Browse Projects"
        onAction={() => navigate(ROUTES.PROJECTS)}
      />
    );
  }

  const volunteersPercentage = calculatePercentage(
    project.volunteersRegistered,
    project.volunteersNeeded
  );

  const tabItems: TabItem[] = [
    {
      id: "details",
      label: "Details",
      content: (
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: project.description }} />

          {project.requirements && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Requirements
              </h3>
              <p className="text-gray-700">{project.requirements}</p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "organization",
      label: "Organization",
      content: (
        <Card>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar name={project.organization.name} size="lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.organization.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  Organization details and description would go here.
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BuildingOfficeIcon className="h-4 w-4" />
                    <span>Non-profit Organization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <GlobeAltIcon className="h-4 w-4" />
                    <a href="#" className="text-primary-600 hover:underline">
                      www.organization.com
                    </a>
                  </div>
                </div>

                <Link to={`/organizations/${project.organization.id}`}>
                  <Button variant="outline" size="sm" className="mt-4">
                    View Organization Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: <DocumentTextIcon className="h-4 w-4" />,
      content: (
        <div>
          {project.documents.length > 0 ? (
            <div className="space-y-3">
              {project.documents.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {doc.originalName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {doc.fileSize} KB
                        </p>
                      </div>
                    </div>
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No documents"
              description="This project doesn't have any documents attached."
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <PageHeader
        title={project.title}
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={handleShare}
              leftIcon={<ShareIcon className="h-4 w-4" />}
            >
              Share
            </Button>
            {isOwner && (
              <>
                <Link
                  to={`${ROUTES.EDIT_PROJECT.replace(
                    ":id",
                    project.id.toString()
                  )}`}
                >
                  <Button
                    variant="outline"
                    leftIcon={<PencilIcon className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                  leftIcon={<TrashIcon className="h-4 w-4" />}
                >
                  Delete
                </Button>
              </>
            )}
            {canApply && <Button onClick={handleApply}>Apply Now</Button>}
          </div>
        }
      />

      {/* Main Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Project Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={project.imageUrl || "https://via.placeholder.com/800x450"}
              alt={project.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Tabs */}
          <Tabs items={tabItems} />
        </div>

        {/* Right Column - Project Info */}
        <div className="space-y-6">
          {/* Status Card */}
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Project Status
                  </h3>
                  <Badge
                    variant={
                      project.status === "ACTIVE" ? "success" : "secondary"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Volunteer Progress</span>
                    <span className="font-medium">
                      {project.volunteersRegistered} /{" "}
                      {project.volunteersNeeded}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${volunteersPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {volunteersPercentage}% filled
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Info */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">
                Project Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Location
                    </p>
                    <p className="text-sm text-gray-600">{project.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Duration
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Time Commitment
                    </p>
                    <p className="text-sm text-gray-600">Flexible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <UsersIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Team Size
                    </p>
                    <p className="text-sm text-gray-600">
                      {project.volunteersNeeded} volunteers needed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Categories & Type */}
          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{project.category}</Badge>
                {project.projectType === "DONATION_BASED" && (
                  <Badge variant="purple">💰 Donation Project</Badge>
                )}
              </div>

              {project.projectType === "DONATION_BASED" && project.budget && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900">
                    Target Budget
                  </p>
                  <p className="text-2xl font-bold text-primary-600 mt-1">
                    ${project.budget.toLocaleString()}
                  </p>
                  {project.proposalDeadline && (
                    <p className="text-sm text-gray-600 mt-2">
                      Proposal deadline: {formatDate(project.proposalDeadline)}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Apply Button for Mobile */}
          {canApply && (
            <div className="lg:hidden">
              <Button fullWidth size="lg" onClick={handleApply}>
                Apply Now
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
      >
        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete Project
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
