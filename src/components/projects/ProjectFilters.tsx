import React from "react";
import { Input, Select, Button, Card, CardContent } from "@/components/common";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PROJECT_CATEGORIES, PROJECT_STATUS } from "@/utils/constants";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";

export interface ProjectFiltersState {
  search: string;
  category: string;
  status: string;
  location: string;
  projectType: string;
}

interface ProjectFiltersProps {
  filters: ProjectFiltersState;
  onFilterChange: (filters: ProjectFiltersState) => void;
  onReset: () => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleChange = (key: keyof ProjectFiltersState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...PROJECT_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: PROJECT_STATUS.ACTIVE, label: "Active" },
    { value: PROJECT_STATUS.COMPLETED, label: "Completed" },
    { value: PROJECT_STATUS.DRAFT, label: "Draft" },
  ];

  const projectTypeOptions = [
    { value: "", label: "All Types" },
    { value: "VOLUNTEER_BASED", label: "Volunteer" },
    { value: "DONATION_BASED", label: "Donation" },
  ];

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
              leftIcon={
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              }
            />
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              options={categoryOptions}
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="Select category"
            />

            <Select
              options={statusOptions}
              value={filters.status}
              onChange={(e) => handleChange("status", e.target.value)}
              placeholder="Select status"
            />

            <Select
              options={projectTypeOptions}
              value={filters.projectType}
              onChange={(e) => handleChange("projectType", e.target.value)}
              placeholder="Select type"
            />
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              leftIcon={<FunnelIcon className="h-4 w-4" />}
            >
              {showAdvanced ? "Hide" : "Show"} Advanced Filters
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                leftIcon={<XMarkIcon className="h-4 w-4" />}
              >
                Reset Filters
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  leftIcon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
                />
                {/* Additional advanced filters can be added here */}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
