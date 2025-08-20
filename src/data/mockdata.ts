import type { ActivityData } from "@/shared/types"

export const mockActivities: ActivityData[] = [
  {
    id: "1",
    title: "Take vitamins",
    description: "Daily vitamin D and omega-3 supplements",
    coverImage: "https://via.placeholder.com/300x200",
    altImage: "Vitamin bottles on a counter",
    isHabit: true,
    cost: 15,
    meta: {
      dateCreated: new Date("2024-01-15"),
      dateLastUpdated: new Date("2024-08-19"),
      numberOfTimesCompleted: 45,
      hasBeenCompletedToday: false,
      shared: true,
    }
  },
  {
    id: "2",
    title: "Morning jog",
    description: "30 minute run around the neighborhood",
    coverImage: "https://via.placeholder.com/300x200",
    altImage: "Person jogging in park",
    isHabit: true,
    cost: 0,
    meta: {
      dateCreated: new Date("2024-02-01"),
      dateLastUpdated: new Date("2024-08-19"),
      numberOfTimesCompleted: 28,
      hasBeenCompletedToday: true,
      shared: false,
    }
  },
  {
    id: "3",
    title: "Read for 1 hour",
    description: "Continue reading 'Atomic Habits'",
    coverImage: "https://via.placeholder.com/300x200",
    altImage: "Open book on desk",
    isHabit: false,
    cost: 25,
    meta: {
      dateCreated: new Date("2024-03-10"),
      dateLastUpdated: new Date("2024-08-18"),
      numberOfTimesCompleted: 12,
      hasBeenCompletedToday: false,
      shared: true,
    }
  }
];
