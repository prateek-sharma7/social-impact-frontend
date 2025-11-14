import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { ROUTES } from "@/utils/constants";
import { CreateProjectForm } from "../../components/projects/CreateProjectForm";

export const CreateProjectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(ROUTES.MY_PROJECTS);
  };

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <PageHeader
        title="Create New Project"
        subtitle="Post a volunteer opportunity to connect with passionate individuals"
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.ORGANIZATION_DASHBOARD },
          { label: "Projects", href: ROUTES.MY_PROJECTS },
          { label: "Create Project" },
        ]}
      />

      <div className="mt-8">
        <CreateProjectForm onCancel={handleCancel} />
      </div>
    </div>
  );
};
