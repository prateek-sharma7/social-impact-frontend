import React from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { APP_NAME, ROUTES } from "@/utils/constants";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Browse Projects", href: ROUTES.PROJECTS },
      { label: "For Organizations", href: "/organizations" },
      { label: "For Volunteers", href: "/volunteers" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Impact", href: "/impact" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Guidelines", href: "/guidelines" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "F" },
    { name: "Twitter", href: "#", icon: "T" },
    { name: "LinkedIn", href: "#", icon: "L" },
    { name: "Instagram", href: "#", icon: "I" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SI</span>
              </div>
              <span className="ml-3 text-xl font-display font-bold text-white">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm mb-4">
              Connecting volunteers with meaningful projects to create lasting
              social impact.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:col-span-4">
            {/* Platform */}
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a
                  href="mailto:contact@socialimpact.com"
                  className="text-sm hover:text-white"
                >
                  contact@socialimpact.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <a href="tel:+1234567890" className="text-sm hover:text-white">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPinIcon className="h-5 w-5 text-primary-500" />
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-sm">123 Impact Street, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-gray-500">
              © {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2 sm:mt-0">
              Made with ❤️ for social good
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
