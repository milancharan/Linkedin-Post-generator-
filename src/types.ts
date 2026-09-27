export interface EventConfig {
  name: string;
  shortName: string;
  organizer: string;
  dates: string;
  location: string;
  hashtags: string[];
  linkedinHandle: string;
  twitterHandle: string;
  websiteUrl: string;
  portalSlug: string;
  attendeeCount: number;
}

export interface PromptQuote {
  id: string;
  speaker: string;
  title: string;
  quote: string;
  topic: string;
}

export interface AttendeeProfile {
  id: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
}

export interface ConferencePhoto {
  id: string;
  label: string;
  url: string;
  caption: string;
  alt: string;
}

export type VoiceTone =
  | 'Professional'
  | 'Grateful Attendee'
  | 'Key Takeaways'
  | 'Hot Take'
  | 'Community Story';
