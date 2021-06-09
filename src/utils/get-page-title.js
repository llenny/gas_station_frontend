import defaultSettings from '@/settings'

const title = defaultSettings.title || 'BurstTime'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
