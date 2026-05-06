import { getAuditResponseGroups } from '@/lib/audit'

interface AuditPdfOptions {
  companyName: string
  contactName: string
  submittedAt: Date
  responses: Record<string, unknown>
}

const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const MARGIN = 54
const BODY_SIZE = 10
const LEADING = 14

function toPdfText(value: unknown) {
  return String(value ?? '')
    .replaceAll('\r\n', '\n')
    .replaceAll('\r', '\n')
    .replaceAll('\u2018', "'")
    .replaceAll('\u2019', "'")
    .replaceAll('\u201c', '"')
    .replaceAll('\u201d', '"')
    .replaceAll('\u2013', '-')
    .replaceAll('\u2014', '-')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
}

function escapePdfString(value: string) {
  return value
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
}

function wrapText(value: string, maxChars: number) {
  const paragraphs = toPdfText(value).split('\n')
  const lines: string[] = []

  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push('')
      continue
    }

    let line = ''
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word
      if (candidate.length > maxChars && line) {
        lines.push(line)
        line = word
      } else {
        line = candidate
      }
    }

    if (line) lines.push(line)
  }

  return lines
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function buildPdf(commandsByPage: string[][]) {
  const objects: string[] = []
  const addObject = (content: string) => {
    objects.push(content)
    return objects.length
  }

  const catalogId = addObject('<< /Type /Catalog /Pages 2 0 R >>')
  const pagesId = addObject('')
  const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>')
  const pageIds: number[] = []

  for (const commands of commandsByPage) {
    const content = commands.join('\n')
    const contentId = addObject(`<< /Length ${Buffer.byteLength(content, 'ascii')} >>\nstream\n${content}\nendstream`)
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`)
    pageIds.push(pageId)
  }

  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`

  let pdf = '%PDF-1.4\n'
  const offsets: number[] = [0]

  objects.forEach((content, index) => {
    offsets.push(Buffer.byteLength(pdf, 'ascii'))
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`
  })

  const xrefOffset = Buffer.byteLength(pdf, 'ascii')
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, 'ascii')
}

export function createAuditResponsesPdf({ companyName, contactName, submittedAt, responses }: AuditPdfOptions) {
  const pages: string[][] = [[]]
  let currentPage = pages[0]
  let y = PAGE_HEIGHT - MARGIN

  const addPage = () => {
    currentPage = []
    pages.push(currentPage)
    y = PAGE_HEIGHT - MARGIN
  }

  const addLine = (text: string, size = BODY_SIZE, gap = LEADING) => {
    if (y < MARGIN) addPage()
    currentPage.push(`BT /F1 ${size} Tf ${MARGIN} ${y} Td (${escapePdfString(text)}) Tj ET`)
    y -= gap
  }

  const addWrapped = (text: string, size = BODY_SIZE, maxChars = 92) => {
    for (const line of wrapText(text, maxChars)) {
      addLine(line, size)
    }
  }

  addLine(`${toPdfText(companyName)} Audit Responses`, 18, 24)
  addLine(`Client contact: ${toPdfText(contactName || 'Client')}`, 11)
  addLine(`Submitted: ${formatDate(submittedAt)}`, 11, 22)

  for (const group of getAuditResponseGroups(responses)) {
    addLine(group.title, 14, 20)

    for (const answer of group.answers) {
      addWrapped(`${answer.lead || 'Response'}:`, 10, 84)
      addWrapped(answer.value, 10, 84)
      y -= 4
    }

    y -= 6
  }

  return buildPdf(pages)
}
