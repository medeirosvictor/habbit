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

export interface ProfileData {
  id: number
  username: string
  email: string
  friends: Array<number>
  activities: Array<number>
  avatar_url: string | undefined
}

export interface MessageTypes {
  type: 'success' | 'error' | 'info'
  text: string
}
