export const SITE_URL = 'https://www.richardnorwood.com'
export const SITE_NAME = 'Richard Norwood'

export function siteUrl(path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}
