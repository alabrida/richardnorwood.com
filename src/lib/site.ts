export const SITE_URL = 'https://www.richardnorwood.com'
export const SITE_NAME = 'Richard Norwood'
export const SOCIAL_IMAGE_PATH = '/images/richard-headshot-2.jpg'

export function siteUrl(path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export const SOCIAL_IMAGE_URL = siteUrl(SOCIAL_IMAGE_PATH)
