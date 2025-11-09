import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserResponse, UpdateProfileRequest } from "@/types/user.types";
import { profileUpdateSchema } from "@/utils/validators";
import {
  Input,
  Textarea,
  Button,
  Card,
  CardContent,
  FileUpload,
  Select,
} from "@/components/common";
import {
  USER_ROLES,
  COMMON_SKILLS,
  PROJECT_CATEGORIES,
} from "@/utils/constants";
import { SkillsInput } from "./SkillsInput";
import { useUpdateProfile } from "@/hooks/useUser";

interface ProfileEditFormProps {
  user: UserResponse;
  onCancel: () => void;
  onSuccess: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  onCancel,
  onSuccess,
}) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const isVolunteer = user.role === USER_ROLES.VOLUNTEER;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
      location: user.location || "",
      phoneNumber: user.phoneNumber || "",
      skills: user.skills || [],
      interests: user.interests || [],
      availability: user.availability || "",
      organizationName: user.organizationName || "",
      website: user.website || "",
      organizationType: user.organizationType || "",
    },
  });

  const onSubmit = async (data: UpdateProfileRequest) => {
    // TODO: Handle profile image upload separately
    updateProfile(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const organizationTypeOptions = [
    { value: "nonprofit", label: "Non-Profit Organization" },
    { value: "charity", label: "Charity" },
    { value: "ngo", label: "NGO" },
    { value: "socialenterprise", label: "Social Enterprise" },
    { value: "community", label: "Community Group" },
    { value: "government", label: "Government Agency" },
    { value: "educational", label: "Educational Institution" },
    { value: "other", label: "Other" },
  ];

  const availabilityOptions = [
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "evenings", label: "Evenings" },
    { value: "flexible", label: "Flexible" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Profile Picture */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Picture
          </h3>

          <FileUpload
            onFilesSelected={(files) => setProfileImage(files[0])}
            maxFiles={1}
            accept={["image/jpeg", "image/png", "image/jpg"]}
            hint="JPG, JPEG or PNG. Max size 5MB"
            showPreview
          />
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <Input
              label="Last Name"
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            <Input
              label="Phone Number"
              placeholder="+1234567890"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />

            <Input
              label="Location"
              placeholder="City, State"
              error={errors.location?.message}
              {...register("location")}
            />
          </div>

          <div className="mt-6">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={1000}
              showCount
              error={errors.bio?.message}
              {...register("bio")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Organization Details */}
      {!isVolunteer && (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Organization Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Organization Name"
                error={errors.organizationName?.message}
                {...register("organizationName")}
              />

              <Select
                label="Organization Type"
                options={organizationTypeOptions}
                placeholder="Select type"
                error={errors.organizationType?.message}
                {...register("organizationType")}
              />

              <div className="md:col-span-2">
                <Input
                  label="Website"
                  type="url"
                  placeholder="https://example.com"
                  error={errors.website?.message}
                  {...register("website")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Volunteer Details */}
      {isVolunteer && (
        <>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Skills & Expertise
              </h3>

              <SkillsInput
                label="Skills"
                value={watch("skills") || []}
                onChange={(skills) => setValue("skills", skills)}
                suggestions={COMMON_SKILLS}
                placeholder="Add your skills..."
                maxItems={10}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interests & Availability
              </h3>

              <div className="space-y-6">
                <SkillsInput
                  label="Interests"
                  value={watch("interests") || []}
                  onChange={(interests) => setValue("interests", interests)}
                  suggestions={PROJECT_CATEGORIES}
                  placeholder="Add your interests..."
                  maxItems={8}
                />

                <Select
                  label="Availability"
                  options={availabilityOptions}
                  placeholder="Select your availability"
                  {...register("availability")}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Action Buttons */}
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
          Save Changes
        </Button>
      </div>
    </form>
  );
};
