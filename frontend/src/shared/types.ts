export enum SelectedPage {
  Activities = 'activities',
  ContactUs = 'contactus',
  Shared = 'shared',
  About = 'about',
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
}
