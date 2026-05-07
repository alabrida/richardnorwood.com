'use client'

import { type ChangeEvent, useMemo, useRef, useState } from 'react'
import styles from './PortalDashboard.module.css'

interface RepairedEntry {
  original: string
  repaired: string
}

interface RepairResult {
  entryCount: number
  repairedEntries: RepairedEntry[]
  outputName: string
  blob: Blob
}

const WINDOWS_RESERVED_NAMES = new Set([
  'CON',
  'PRN',
  'AUX',
  'NUL',
  'COM1',
  'COM2',
  'COM3',
  'COM4',
  'COM5',
  'COM6',
  'COM7',
  'COM8',
  'COM9',
  'LPT1',
  'LPT2',
  'LPT3',
  'LPT4',
  'LPT5',
  'LPT6',
  'LPT7',
  'LPT8',
  'LPT9',
])

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function sanitizePathSegment(segment: string) {
  const sanitized = segment
    .replace(/[<>:"\\|?*\u0000-\u001F]/g, '-')
    .replace(/-+/g, '-')
    .replace(/[ .]+$/g, '')
    .trim()

  const fallback = !sanitized || sanitized === '.' || sanitized === '..' ? 'file' : sanitized
  const extensionIndex = fallback.lastIndexOf('.')
  const baseName = extensionIndex > 0 ? fallback.slice(0, extensionIndex) : fallback
  const extension = extensionIndex > 0 ? fallback.slice(extensionIndex) : ''

  if (WINDOWS_RESERVED_NAMES.has(baseName.toUpperCase())) {
    return `${baseName}-file${extension}`
  }

  return fallback
}

function sanitizeZipPath(path: string) {
  const isDirectory = path.endsWith('/')
  const segments = path.split('/').filter(Boolean).map(sanitizePathSegment)
  const sanitized = segments.join('/')
  return isDirectory ? `${sanitized}/` : sanitized
}

function makeUniquePath(path: string, usedPaths: Set<string>) {
  if (!usedPaths.has(path)) {
    usedPaths.add(path)
    return path
  }

  const isDirectory = path.endsWith('/')
  const normalized = isDirectory ? path.slice(0, -1) : path
  const slashIndex = normalized.lastIndexOf('/')
  const directory = slashIndex >= 0 ? `${normalized.slice(0, slashIndex + 1)}` : ''
  const filename = slashIndex >= 0 ? normalized.slice(slashIndex + 1) : normalized
  const extensionIndex = filename.lastIndexOf('.')
  const base = extensionIndex > 0 ? filename.slice(0, extensionIndex) : filename
  const extension = extensionIndex > 0 ? filename.slice(extensionIndex) : ''

  let index = 2
  let candidate = ''
  do {
    candidate = `${directory}${base}-${index}${extension}${isDirectory ? '/' : ''}`
    index += 1
  } while (usedPaths.has(candidate))

  usedPaths.add(candidate)
  return candidate
}

function getOutputZipName(name: string) {
  const baseName = name.replace(/\.zip$/i, '')
  return `${sanitizePathSegment(baseName)}-windows-safe.zip`
}

export default function ZipFileCleanerTool() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [result, setResult] = useState<RepairResult | null>(null)
  const [status, setStatus] = useState<'idle' | 'working' | 'ready' | 'error'>('idle')
  const [message, setMessage] = useState('Choose a ZIP file to create a clean copy.')

  const repairSummary = useMemo(() => {
    if (!result) return null

    return {
      changedCount: result.repairedEntries.length,
    }
  }, [result])

  const resetResult = () => {
    setResult(null)
    setStatus('idle')
    setMessage('Choose a ZIP file to create a clean copy.')
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    setResult(null)

    if (!file) {
      resetResult()
      return
    }

    if (!file.name.toLowerCase().endsWith('.zip')) {
      setStatus('error')
      setMessage('Choose a .zip file.')
      return
    }

    setStatus('working')
    setMessage('Preparing your clean ZIP...')

    try {
      const [{ default: JSZip }, buffer] = await Promise.all([
        import('jszip'),
        file.arrayBuffer(),
      ])

      const sourceZip = await JSZip.loadAsync(buffer)
      const repairedZip = new JSZip()
      const usedPaths = new Set<string>()
      const repairedEntries: RepairedEntry[] = []
      const entries = Object.values(sourceZip.files)

      for (const entry of entries) {
        const sanitizedPath = sanitizeZipPath(entry.name)
        const repairedPath = makeUniquePath(sanitizedPath, usedPaths)

        if (entry.name !== repairedPath) {
          repairedEntries.push({ original: entry.name, repaired: repairedPath })
        }

        if (entry.dir) {
          repairedZip.folder(repairedPath.replace(/\/$/, ''))
          continue
        }

        const content = await entry.async('uint8array')
        repairedZip.file(repairedPath, content, {
          date: entry.date,
          comment: entry.comment,
          unixPermissions: entry.unixPermissions,
          dosPermissions: entry.dosPermissions,
        })
      }

      const blob = await repairedZip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      })

      setResult({
        entryCount: entries.length,
        repairedEntries,
        outputName: getOutputZipName(file.name),
        blob,
      })
      setStatus('ready')
      setMessage(
        repairedEntries.length > 0
          ? 'Your clean ZIP is ready to download.'
          : 'Your ZIP is ready to download.'
      )
    } catch {
      setStatus('error')
      setMessage('This ZIP could not be prepared. Try a fresh ZIP export.')
    }
  }

  const handleDownload = () => {
    if (!result) return

    const url = URL.createObjectURL(result.blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = result.outputName
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`${styles.card} ${styles.toolCard}`}>
      <div>
        <div className={styles.cardHeaderRow}>
          <h3 className={styles.cardTitle}>ZIP File Cleaner</h3>
          <span className={styles.localOnlyBadge}>Local Only</span>
        </div>
        <h4 className={styles.cardSubTitle}>Clean ZIP download</h4>
        <p className={styles.cardText}>
          Choose a ZIP file and download a clean copy. Processing stays on this device.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".zip,application/zip"
          className={styles.zipInput}
          onChange={handleFileChange}
        />

        <button type="button" className={styles.secondaryToolBtn} onClick={() => inputRef.current?.click()}>
          Choose ZIP file
        </button>

        {selectedFile && (
          <div className={styles.zipFileMeta}>
            <span>{selectedFile.name}</span>
            <small>{formatFileSize(selectedFile.size)}</small>
          </div>
        )}

        <div className={`${styles.zipStatus} ${status === 'error' ? styles.zipStatusError : ''}`}>
          {status === 'working' && <span className={styles.zipSpinner} aria-hidden="true" />}
          <span>{message}</span>
        </div>

        {result && repairSummary && (
          <div className={styles.zipRepairSummary}>
            <div className={styles.zipRepairStats}>
              <div>
                <strong>{result.entryCount}</strong>
                <span>items checked</span>
              </div>
              <div>
                <strong>{repairSummary.changedCount}</strong>
                <span>updates made</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={handleDownload}
        disabled={!result || status !== 'ready'}
      >
        <span className={styles.primaryBtnText}>Download clean ZIP</span>
      </button>
    </div>
  )
}
