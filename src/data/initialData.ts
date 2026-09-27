import { EventConfig, PromptQuote, AttendeeProfile, ConferencePhoto } from '../types';

export const INITIAL_EVENT_CONFIG: EventConfig = {
  name: 'SaaS Innovate & Scale Summit 2025',
  shortName: 'SaaS Innovate 2025',
  organizer: 'VentureScale Global & TechPulse',
  dates: 'Oct 24-26, 2025',
  location: 'San Francisco, CA • Moscone Center West & Live Stream',
  hashtags: [
    '#SaaSInnovate2025',
    '#FutureOfSaaS',
    '#B2BGrowth',
    '#ProductLed'
  ],
  linkedinHandle: 'company/venturescaleglobal',
  twitterHandle: 'SaaSInnovateConf',
  websiteUrl: 'https://saassummit2025.io',
  portalSlug: 'saas-innovate-2025',
  attendeeCount: 1248
};

export const INITIAL_PHOTOS: ConferencePhoto[] = [
  {
    id: 'photo-1',
    label: 'Keynote Stage',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAl5ehsm3OnP2q8gOdoiLxcwUVsFcnM91CTqAUt7HUoc1oenxqt4hsRSo1jDihfy3INt3Pio1Ywu07FxaPPxPqZAob6Z8xsX9fOPfwcCAY1Cwf1SxztPo1rCkVTpsIB177rbb78s_z3UcVxMErtp-CyZ5NQfLUlw3JsLNdFyk68NN_K3LnTrEYCt7nnb_2CfdXMww424rfp_XOyMFm5CekhKXi_L-sdknrBwXpvrwNzPZJZOn-v_i77w',
    caption: "Moscone Main Stage • SaaS Innovate '25",
    alt: 'High-impact wide perspective photo of a modern technology summit auditorium with keynote presentation on massive high-definition LED screens bathed in soft purple ambient lighting'
  },
  {
    id: 'photo-2',
    label: 'Keynote Stage Presentation',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfg_ETY7CkWOiArMktptja06yICeah86EkjDlBn2BFE7LerTHjHVr-ro5Mrh1iYB8Pe5P59im4UugitVPDeVD4PkZMmthRpiQbjMPz7jiaGyegixlhiUem09HSMF7EaDRE4jxhKyz-0oSqcN26SgohIM-RGbG_Cb_g1RBUuNJx80sdzNjLOjelKuvGcxdaI6dGo2tZyDjYoZ6k_f3zU6cQM7Qs5RpqjChHHstrDSGvxM93hJrgDNKLqw',
    caption: 'Elena Vance Keynote • Opening Stage',
    alt: 'Vibrant tech summit mainstage with dramatic purple and violet neon LED lighting, keynote speaker on stage presenting strategic metrics'
  },
  {
    id: 'photo-3',
    label: 'Expo Hall',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHoamIiXGoGwwI2y6GWb1csiEvr9jwFzSc0EAMCVx2wqibjwLSzymihHOheLW860sI5vWd35-LGWaUJgjVef7y3yxfNvJx21BJc69euBWu8BEDq1gOhRCH_fSknmW2fDpKgF1aQOKb8jiF0VTjBiouDj5__JTs13K676dYcqZb4eSZpStRHaO3YTwQ3nWdnIIXz9DEF54T0OBzdO0lEee22DqNZUlUevBBFd2CvvigC9ybbhIKc4mwsw',
    caption: 'Expo Hall Networking Hub',
    alt: 'Two enthusiastic product managers smiling and having an animated conversation in the sunlit conference expo hall holding attendee badges and lanyards'
  }
];

export const ATTENDEE_PROFILES: AttendeeProfile[] = [
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    role: 'Product Lead & Growth Architect | Scaling B2B SaaS | Speaker & Advisor',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGrCRFryuyqAc-RuVSjq-syAD4CiSVKGVuMJXFG8cUxv50zmhMocsBvuYxyHjxtU4tRVjcdDoS_6drFnGIvgwS7WIuPG9SQSOdHITo-mZGX17HsTcyCsobXhRhB0jEoiR0B60d8NfMF9LWdX-Kde_8PSYUTi4sQfyZgqzuDPrwNjIkL6Q6BbnBl_yAfToAMlLpMF6pFrFQyUJPnFJeH7rzJE88UtYezkEyBt8LaIoyELsLq9ByC_7BYQ',
    initials: 'SJ'
  },
  {
    id: 'marcus',
    name: 'Marcus Klein',
    role: 'VP of Engineering @ CloudFlow | Ex-Stripe | Building high-velocity SaaS stacks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    initials: 'MK'
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Head of Growth Marketing | B2B Community Builder | SaaS Angel Investor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    initials: 'ER'
  }
];

export const PRESEEDED_QUOTES: PromptQuote[] = [
  {
    id: 'q1',
    speaker: 'Elena Vance',
    title: 'Chief Product Officer, VentureScale',
    quote: 'In 2025, customer retention loops are 10x more capital efficient than hyper-aggressive top-of-funnel customer acquisition.',
    topic: 'Product-Led Growth'
  },
  {
    id: 'q2',
    speaker: 'Elena Vance',
    title: 'Chief Product Officer, VentureScale',
    quote: 'If your AI feature doesn’t eliminate 80% of manual friction, it is an obstacle, not an advantage.',
    topic: 'AI Workflows'
  },
  {
    id: 'q3',
    speaker: 'David Chen',
    title: 'Founder & CEO, ScaleMatrix',
    quote: 'Net Dollar Retention (NDR) is the ultimate truth-teller for SaaS unit economics.',
    topic: 'Finance & Metrics'
  },
  {
    id: 'q4',
    speaker: 'Priya Sharma',
    title: 'General Partner, AlphaHorizon Ventures',
    quote: 'Founders who understand organic distribution beat founders with big advertising budgets every single quarter.',
    topic: 'Venture Capital'
  },
  {
    id: 'q5',
    speaker: 'Marcus Thorne',
    title: 'VP Engineering, HyperSync',
    quote: 'Developer velocity is not about lines of code shipped; it is about mean time from customer feedback to deployed solution.',
    topic: 'Engineering Culture'
  },
  {
    id: 'q6',
    speaker: 'Chloe DuPont',
    title: 'Head of Community, TechPulse',
    quote: 'Community isn’t a marketing channel. It’s an ecosystem of peer-to-peer accountability.',
    topic: 'Community Growth'
  },
  {
    id: 'q7',
    speaker: 'Alex Rivera',
    title: 'Chief Revenue Officer, PulseCloud',
    quote: 'The modern B2B buyer has already done 70% of their homework before they ever speak with sales.',
    topic: 'GTM Strategy'
  },
  {
    id: 'q8',
    speaker: 'Samantha Wei',
    title: 'Design Director, Apex Studio',
    quote: 'The best enterprise UI is invisible—it anticipates intent rather than forcing configuration.',
    topic: 'Product Design'
  },
  {
    id: 'q9',
    speaker: 'Liam O’Connor',
    title: 'Security Principal, ShieldGrid',
    quote: 'Zero trust is not a buzzword; it is the fundamental baseline for high-growth enterprise SaaS.',
    topic: 'Cybersecurity'
  },
  {
    id: 'q10',
    speaker: 'Maya Lin',
    title: 'VP People & Culture, VentureScale',
    quote: 'Remote team culture is forged through asynchronous clarity and shared wins, not virtual happy hours.',
    topic: 'Team Operations'
  },
  {
    id: 'q11',
    speaker: 'Julian Banks',
    title: 'Chief Data Architect, StreamData',
    quote: 'Real-time observability without actionable alerting is just expensive noise.',
    topic: 'Data Infrastructure'
  },
  {
    id: 'q12',
    speaker: 'Tariq Al-Mansoor',
    title: 'VP Customer Success, ElevateHQ',
    quote: 'Onboarding is where your retention curve is decided. If days 1-14 fail, day 365 never arrives.',
    topic: 'Customer Success'
  },
  {
    id: 'q13',
    speaker: 'Hannah Scott',
    title: 'Partner, Catalyst Growth',
    quote: 'Pricing power comes from high switching costs combined with measurable ROI delivery.',
    topic: 'SaaS Pricing'
  },
  {
    id: 'q14',
    speaker: 'Elena Vance',
    title: 'Chief Product Officer, VentureScale',
    quote: 'The greatest competitive moat in enterprise software is user delight inside mundane daily workflows.',
    topic: 'Moat Building'
  }
];

export const SAMPLE_GENERATED_POSTS: Record<string, (event: EventConfig, notes: string) => string> = {
  'Grateful Attendee': (event, notes) => `Still processing the incredible energy from Day 1 at ${event.hashtags[0] || '#SaaSInnovate2025'}! 🚀

Massive thank you to ${event.organizer} and the organizing team for curating such a world-class summit.

My top 3 takeaways from today's keynotes:
1️⃣ Customer retention loops > hyper-aggressive top-of-funnel churn
2️⃣ AI is fundamentally rewriting the B2B sales development playbook
3️⃣ Community-led growth creates unmatched brand defensibility

${notes ? notes + '\n\n' : ''}Thrilled to reconnect with so many peers in the SaaS ecosystem. Who else is here in SF? Let's grab coffee! ☕

${event.hashtags.join(' ')} @${event.organizer.split('&')[0].trim()}`,

  'Professional': (event, notes) => `Key takeaways from the ${event.name}:

As enterprise SaaS shifts from growth-at-all-costs to efficient capital allocation, three strategic imperatives stood out:

• Unit Economics First: Prioritizing retention and Net Dollar Retention over raw acquisition.
• AI Operationalization: Embedding intelligence directly into GTM workflows rather than surface-level wrappers.
• Defensible Moats: Building authentic peer networks that augment product stickiness.

${notes ? `Key discussion note: "${notes}"\n\n` : ''}Kudos to ${event.organizer} for bringing industry leaders together for actionable discourse.

${event.hashtags.join(' ')} @${event.organizer.split('&')[0].trim()}`,

  'Key Takeaways': (event, notes) => `3 actionable lessons from ${event.shortName} that every B2B leader should implement:

📌 1. Retention is your highest-margin growth lever
Companies with 120%+ NDR compound twice as fast with half the burn.

📌 2. Modern buyers despise friction
If onboarding takes more than 15 minutes to time-to-value, you've already lost them.

📌 3. AI must solve real bottlenecks
Focus on workflow automation that saves hours, not gimmicks.

${notes ? `💡 Direct takeaway: ${notes}\n\n` : ''}What has been your biggest learning so far? Drop your thoughts below! 👇

${event.hashtags.join(' ')}`,

  'Hot Take': (event, notes) => `Unpopular opinion after Day 1 at ${event.hashtags[0] || '#SaaSInnovate2025'}:

Most SaaS companies don't have a "top of funnel" problem. They have a product retention problem disguised as marketing inefficiency.

If your churn rate is high, doubling your ad spend is just pouring water into a leaky bucket.

${notes ? `My key observation today: ${notes}\n\n` : ''}Agree or disagree? Let's discuss in the comments. 💬

${event.hashtags.join(' ')} @${event.organizer.split('&')[0].trim()}`,

  'Community Story': (event, notes) => `The best part of ${event.shortName}? The serendipitous conversations between keynote stages. 🤝

Ran into brilliant colleagues, discussed real-world scaling hurdles, and compared playbooks for 2025. Events like this remind us that software is built by people for people.

${notes ? `Personal highlight: ${notes}\n\n` : ''}Grateful to ${event.organizer} for creating this gathering space.

Who else is on the expo floor tomorrow? Let’s connect!

${event.hashtags.join(' ')}`
};
