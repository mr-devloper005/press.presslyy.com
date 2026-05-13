export const siteTaskDefinitions = [
  {
    key: 'mediaDistribution',
    label: 'Release media',
    route: '/press',
    description: 'Newswire stories, company announcements, and distributed press updates.',
    contentType: 'mediaDistribution',
    enabled: true,
  },
] as const

export const siteTaskViews = {
  mediaDistribution: '/press',
} as const
