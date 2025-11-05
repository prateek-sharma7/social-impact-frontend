import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common";
import { ROUTES } from "@/utils/constants";
import { useAuthStore } from "@/store/authStore";

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Make a Difference in Your Community
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with meaningful volunteer opportunities and help create
              positive social impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to={
                    user?.role === "VOLUNTEER"
                      ? ROUTES.VOLUNTEER_DASHBOARD
                      : ROUTES.ORGANIZATION_DASHBOARD
                  }
                >
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to={ROUTES.REGISTER}>
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to={ROUTES.PROJECTS}>
                    <Button variant="outline" size="lg">
                      Browse Projects
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Projects</h3>
              <p className="text-gray-600">
                Browse through various volunteer opportunities that match your
                interests and skills.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Apply to projects and connect with organizations making a
                difference.
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Impact</h3>
              <p className="text-gray-600">
                Contribute your time and skills to create positive change in
                communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of volunteers and organizations creating positive
            change.
          </p>
          {!isAuthenticated && (
            <Link to={ROUTES.REGISTER}>
              <Button size="lg" variant="primary">
                Join Our Community
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
