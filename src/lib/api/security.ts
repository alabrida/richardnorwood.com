export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export async function readJsonObject(request: Request) {
  try {
    const body = await request.json()
    return isRecord(body) ? body : null
  } catch {
    return null
  }
}

export function normalizeText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, maxLength)
}

export function normalizeOptionalText(value: unknown, maxLength = 500) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, maxLength) : undefined
}

export function normalizeEmail(value: unknown) {
  const email = normalizeText(value, 254)?.toLowerCase()
  if (!email) return null
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}

export function normalizeUrl(value: unknown) {
  const text = normalizeOptionalText(value, 2048)
  if (!text) return undefined

  try {
    const url = new URL(text.startsWith('http') ? text : `https://${text}`)
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : undefined
  } catch {
    return undefined
  }
}

export function normalizeUuid(value: unknown) {
  const text = normalizeText(value, 64)
  if (!text) return null
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(text)
    ? text
    : null
}

export function normalizeInteger(value: unknown, min: number, max: number) {
  const numberValue = typeof value === 'number' ? value : Number(value)
  if (!Number.isInteger(numberValue)) return null
  if (numberValue < min || numberValue > max) return null
  return numberValue
}

export function sanitizeJsonObject(value: unknown, maxStringLength = 1200) {
  if (!isRecord(value)) return null

  const sanitized: Record<string, string | number | boolean | null> = {}
  for (const [key, entry] of Object.entries(value).slice(0, 80)) {
    const safeKey = key.slice(0, 80)
    if (typeof entry === 'string') {
      sanitized[safeKey] = entry.trim().slice(0, maxStringLength)
    } else if (typeof entry === 'number' && Number.isFinite(entry)) {
      sanitized[safeKey] = entry
    } else if (typeof entry === 'boolean' || entry === null) {
      sanitized[safeKey] = entry
    }
  }

  return sanitized
}

export function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
