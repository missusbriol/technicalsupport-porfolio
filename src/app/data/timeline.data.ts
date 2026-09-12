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
        body: 'Built a foundation in how applications are designed, developed, and maintained—context I now use when investigating support issues.'
      }
    ]
  },

  {
    date: '06.2023',
    items: [
      {
        title: 'QA Analyst, Technomancer, Inc.',
        body: 'Reproduced reported issues, wrote test cases, and learned to distinguish symptoms from root causes before documenting findings.'
      }
    ]
  },

  {
    date: '02.2024 - Current',
    items: [
      {
        title: 'Software Developer & L3 Support, Alliance Software Inc.',
        body: 'Support an airline-sector client through ticket investigation, employee queries, application troubleshooting, and code changes when needed.'
      },
      {
        title: 'L2 Support — Microsoft 365 & BMC',
        body: 'Handle support calls and BMC tickets for an international German client, supporting SharePoint, OneDrive, and Microsoft Teams across their working schedule.'
      }
    ]
  }
];
