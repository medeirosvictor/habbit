export enum SelectedPage {
  activities = 'activities',
  contactus = 'contactus',
  shared = 'shared',
  about = 'about',
}

export interface ActivityData {
  id: number
  title: string
  description: string
  is_habit: boolean
  created_at: Date
  last_updated: Date
  times_completed: number
  completed: boolean
  shared: boolean
  last_completed: Date | null
}
