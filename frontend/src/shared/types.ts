export enum SelectedPage {
  Activities = 'activities',
  ContactUs = 'contactus',
  Shared = 'shared',
  About = 'about',
}

export interface ActivityData {
  id: string
  title: string
  description: string
  isHabit: boolean
  dateCreated: Date
  dateLastUpdated: Date
  timesCompleted: number
  hasBeenCompletedToday: boolean
  shared: boolean
}
