export interface TimelineItem {
  date: string;
  items: {
    title: string;
    body: string;
  }[];
}

export const TIMELINE: TimelineItem[] = [
  {
    date: '03.2023',
    items: [
      {
        title: 'Software Development Intern, Technomancer, Inc.',
        body: 'Started on the engineering side, learning how applications are built before ever touching a support ticket.'
      }
    ]
  },

  {
    date: '06.2023',
    items: [
      {
        title: 'QA Analyst, Technomancer, Inc.',
        body: 'Moved into quality assurance — reproducing issues, writing test cases, learning to separate a symptom from a root cause.'
      }
    ]
  },

  {
    date: '02.2024 - Current',
    items: [
      {
        title: 'Software Developer — L3 Support, Alliance Software Inc.',
        body: 'Joined as a developer for an airline-industry client, with L3 support layered on top: tickets, employee queries, technical investigation, code changes.'
      },
      {
        title: 'L2 Support',
        body: 'Handling support calls and BMC tickets for a German company with international operations across SharePoint, OneDrive, and Microsoft Teams, while adapting to their working schedule.'
      }
    ]
  }
];