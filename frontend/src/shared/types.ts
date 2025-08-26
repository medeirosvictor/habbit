export enum SelectedPage {
  Activities = 'activities',
  ContactUs = 'contactus',
  Shared = 'shared',
  About = 'about'
}

export interface ActivityMeta {
  dateCreated: Date | string;
  dateLastUpdated: Date | string;
  numberOfTimesCompleted: number;
  hasBeenCompletedToday: boolean;
  shared: boolean;
}

export interface ActivityData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  altImage: string;
  isHabit: boolean;
  cost: number | string;
  meta: ActivityMeta;
}
