import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectRequest } from "@/types/project.types";
import { createProjectSchema } from "@/utils/validators";
import { useCreateProject } from "@/hooks/useProjects";
import {
  Input,
  Textarea,
  Select,
  Button,
  Card,
  CardContent,
  FileUpload,
  Alert,
} from "@/components/common";
import { PROJECT_CATEGORIES, PROJECT_TYPES } from "@/utils/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CreateProjectFormProps {
  onCancel: () => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onCancel,
}) => {
  const { mutate: createProject, isPending } = useCreateProject();
  const [projectImage, setProjectImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateProjectRequest>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      projectType: "VOLUNTEER_BASED",
      description: "",
    },
  });

  const projectType = watch("projectType");

  const onSubmit = (data: CreateProjectRequest) => {
    // use description from form data (Controller-managed)
    const projectData = {
      ...data,
      description: data.description,
      volunteersNeeded: Number(data.volunteersNeeded),
    };

    createProject(projectData);
  };

  const categoryOptions = PROJECT_CATEGORIES.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const projectTypeOptions = [
    { value: PROJECT_TYPES.VOLUNTEER, label: "Volunteer Project" },
    { value: PROJECT_TYPES.DONATION, label: "Donation Project" },
  ];

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "blockquote"],
      ["clean"],
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>

          <div className="space-y-4">
            <Input
              label="Project Title"
              placeholder="Enter a descriptive title for your project"
              error={errors.title?.message}
              {...register("title")}
            />

            <Textarea
              label="Short Description"
              placeholder="Brief summary of your project (max 500 characters)"
              rows={3}
              maxLength={500}
              showCount
              error={errors.shortDescription?.message}
              {...register("shortDescription")}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={(val) => field.onChange(val)}
                    modules={quillModules}
                    placeholder="Provide a detailed description of your project..."
                    className="h-64 mb-12"
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Project Type"
              options={projectTypeOptions}
              error={errors.projectType?.message}
              {...register("projectType")}
            />

            <Select
              label="Category"
              options={categoryOptions}
              placeholder="Select a category"
              error={errors.category?.message}
              {...register("category")}
            />

            <Input
              label="Location"
              placeholder="City, State"
              error={errors.location?.message}
              {...register("location")}
            />

            <Input
              label="Volunteers Needed"
              type="number"
              min="1"
              max="1000"
              error={errors.volunteersNeeded?.message}
              {...register("volunteersNeeded", { valueAsNumber: true })}
            />

            <Input
              label="Start Date"
              type="date"
              error={errors.startDate?.message}
              {...register("startDate")}
            />

            <Input
              label="End Date"
              type="date"
              error={errors.endDate?.message}
              {...register("endDate")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Image */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Project Image
          </h3>

          <FileUpload
            onFilesSelected={(files) => setProjectImage(files[0])}
            maxFiles={1}
            accept={["image/jpeg", "image/png", "image/jpg"]}
            hint="Upload an image that represents your project. JPG, JPEG or PNG. Max size 5MB"
            showPreview
          />
        </CardContent>
      </Card>

      {/* Donation Project Fields */}
      {projectType === PROJECT_TYPES.DONATION && (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Donation Details
            </h3>

            <Alert
              variant="info"
              message="Donation projects allow volunteers to submit proposals with budget estimates for completing the project."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Target Budget"
                type="number"
                min="0"
                placeholder="Enter amount in USD"
                error={errors.budget?.message}
                {...register("budget", { valueAsNumber: true })}
              />

              <Input
                label="Proposal Deadline"
                type="date"
                error={errors.proposalDeadline?.message}
                {...register("proposalDeadline")}
              />

              <Input
                label="Maximum Proposals"
                type="number"
                min="1"
                max="50"
                placeholder="Max number of proposals to accept"
                error={errors.maxProposals?.message}
                {...register("maxProposals", { valueAsNumber: true })}
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Requirements"
                  placeholder="Specific requirements for proposal submissions..."
                  rows={3}
                  error={errors.requirements?.message}
                  {...register("requirements")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          Create Project
        </Button>
      </div>
    </form>
  );
};
