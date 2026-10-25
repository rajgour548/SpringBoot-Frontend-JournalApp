
import api from "./api";

export interface DashboardStats {
  totalEntries: number;
  entriesThisMonth: number;
  overallMood: string;
  moodDistribution: Record<string, number>;
  currentStreak: number;
  frequentEmotions: Record<string, number>;
}

export const fetchDashboardStats =
  async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>(
      "/user/dashboard"
    );

    return response.data;
  };
