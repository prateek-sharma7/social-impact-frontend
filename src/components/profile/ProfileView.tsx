import React from "react";
import { UserResponse } from "@/types/user.types";
import { Avatar, Badge, Card, CardContent, Button } from "@/components/common";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/helpers";
import { USER_ROLES } from "@/utils/constants";

interface ProfileViewProps {
  user: UserResponse;
  isOwnProfile: boolean;
  onEditClick?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isOwnProfile,
  onEditClick,
}) => {
  const isVolunteer = user.role === USER_ROLES.VOLUNTEER;

  return (
    <div className="space-y-6">
      {/*Header Card*/}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar
              src={user.profilePictureUrl}
              name={`${user.firstName} ${user.lastName}`}
              size="2xl"
            />

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h2>
                  {user.organizationName && (
                    <p className="text-lg text-gray-700 mt-1">
                      {user.organizationName}
                    </p>
                  )}
                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                    <Badge variant="primary">
                      {isVolunteer ? "Volunteer" : "Organization"}
                    </Badge>
                    {user.availability && (
                      <Badge variant="success">Available</Badge>
                    )}
                  </div>
                </div>

                {isOwnProfile && (
                  <Button onClick={onEditClick} className="mt-4 sm:mt-0">
                    Edit Profile
                  </Button>
                )}
              </div>

              {user.bio && (
                <p className="mt-4 text-gray-600 max-w-3xl">{user.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Contact Information */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            {user.phoneNumber && (
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">{user.phoneNumber}</p>
                </div>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">{user.location}</p>
                </div>
              </div>
            )}

            {user.website && (
              <div className="flex items-center gap-3">
                <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">
                  {formatDate(user.createdAt, "MMMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Details */}
      {!isVolunteer && user.organizationType && (
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Organization Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Organization Type</p>
                  <p className="text-gray-900">{user.organizationType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Focus Areas</p>
                  <p className="text-gray-900">
                    Education, Healthcare, Environment
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills & Interests (Volunteer) */}
      {isVolunteer && (
        <>
          {user.skills && user.skills.length > 0 && (
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <AcademicCapIcon className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {user.interests && user.interests.length > 0 && (
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <HeartIcon className="h-5 w-5 text-gray-700" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Interests
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <Badge key={index} variant="purple">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
