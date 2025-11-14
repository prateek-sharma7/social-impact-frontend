import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/layout";
import { useProjects } from "@/hooks/useProjects";
import {
  ProjectCard,
  ProjectFilters,
  ProjectFiltersState,
} from "./../../components/projects";
import {
  Spinner,
  Alert,
  EmptyState,
  Pagination,
  Select,
} from "@/components/common";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { DEFAULT_PAGE_SIZE, SORT_OPTIONS } from "@/utils/constants";

export const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 0;

  const [filters, setFilters] = useState<ProjectFiltersState>({
    search: searchParams.get("q") || "",
    category: "",
    status: "",
    location: "",
    projectType: "",
  });

  const [sortBy, setSortBy] = useState("createdAt,desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data, isLoading, error } = useProjects(
    currentPage,
    DEFAULT_PAGE_SIZE
  );

  // Filter projects based on local filters
  const filteredProjects = React.useMemo(() => {
    if (!data?.content) return [];

    return data.content.filter((project) => {
      if (
        filters.search &&
        !project.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.description
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (filters.category && project.category !== filters.category)
        return false;
      if (filters.status && project.status !== filters.status) return false;
      if (
        filters.location &&
        !project.location.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false;
      if (filters.projectType && project.projectType !== filters.projectType)
        return false;
      return true;
    });
  }, [data?.content, filters]);

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "",
      status: "",
      location: "",
      projectType: "",
    });
  };

  useEffect(() => {
    if (filters.search) {
      searchParams.set("q", filters.search);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  }, [filters.search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title="Error loading projects"
        message="Failed to load projects. Please try again."
      />
    );
  }

  return (
    <div className="container-custom py-8">
      <PageHeader
        title="Browse Projects"
        subtitle="Find volunteer opportunities that match your interests and skills"
      />

      {/* Filters */}
      <div className="mt-8 mb-6">
        <ProjectFilters
          filters={filters}
          onFilterChange={setFilters}
          onReset={handleResetFilters}
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing{" "}
          <span className="font-semibold">{filteredProjects.length}</span> of{" "}
          <span className="font-semibold">{data?.totalElements || 0}</span>{" "}
          projects
        </p>

        <div className="flex items-center gap-4">
          <Select
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48"
          />

          <div className="flex items-center gap-1 border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-gray-100" : ""
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-gray-100" : ""
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<BriefcaseIcon className="h-12 w-12" />}
          title="No projects found"
          description="Try adjusting your filters or search query"
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage + 1}
            totalPages={data.totalPages}
            onPageChange={(page) => handlePageChange(page - 1)}
          />
        </div>
      )}
    </div>
  );
};
