import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { volunteerRegistrationSchema } from "@/utils/validators";
import { VolunteerRegistrationRequest } from "@/types/volunteer.types";
import { Modal, ModalFooter, Button, Textarea } from "@/components/common";

interface VolunteerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VolunteerRegistrationRequest) => void;
  isLoading?: boolean;
  projectTitle?: string;
}

export const VolunteerRegistrationModal: React.FC<
  VolunteerRegistrationModalProps
> = ({ isOpen, onClose, onSubmit, isLoading, projectTitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VolunteerRegistrationRequest>({
    resolver: zodResolver(volunteerRegistrationSchema),
    defaultValues: {
      motivation: "",
    },
  });

  const onFormSubmit = (data: VolunteerRegistrationRequest) => {
    onSubmit(data);
    // Don't reset or close here - let parent handle success/error
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Reset form when modal closes after success
  useEffect(() => {
    if (!isOpen && !isLoading) {
      reset();
    }
  }, [isOpen, isLoading, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Register as Volunteer"
      description={
        projectTitle
          ? `Tell us why you want to volunteer for "${projectTitle}"`
          : "Tell us why you want to volunteer for this project"
      }
      size="lg"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <Textarea
          label="Motivation"
          placeholder="Share your motivation for joining this project (minimum 50 characters)..."
          rows={6}
          {...register("motivation")}
          error={errors.motivation?.message}
          required
        />
        <p className="text-sm text-gray-500">
          Please provide at least 50 characters explaining why you're interested
          in this project and what you hope to contribute.
        </p>

        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Register as Volunteer
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

