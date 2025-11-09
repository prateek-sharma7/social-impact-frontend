import React from "react";
import { Card, CardContent, Tooltip } from "@/components/common";
import { AchievementResponse } from "@/types/dashboard.types";
import { formatRelativeTime } from "@/utils/helpers";

interface AchievementCardProps {
  achievement: AchievementResponse;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
}) => {
  const getBadgeIcon = () => {
    // Map badge icons to emojis or custom icons
    const iconMap: Record<string, string> = {
      "first-project": "🌟",
      "5-projects": "🎯",
      "10-projects": "🏆",
      "50-hours": "⏰",
      "100-hours": "⏱️",
      "team-player": "🤝",
      consistent: "📅",
      "impact-maker": "💪",
    };
    return iconMap[achievement.badgeIcon] || "🏅";
  };

  return (
    <Tooltip content={achievement.description}>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow"
        padding="sm"
      >
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{getBadgeIcon()}</div>
            <h5 className="font-semibold text-gray-900 text-sm line-clamp-2">
              {achievement.title}
            </h5>
            <p className="text-xs text-gray-500 mt-1">
              {formatRelativeTime(achievement.earnedAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Tooltip>
  );
};
