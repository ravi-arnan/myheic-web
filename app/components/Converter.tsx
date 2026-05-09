'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { attachExifToJpeg, buildExifBytesFromHeic } from '../lib/exif'

type FileStatus = 'pending' | 'converting' | 'done' | 'error'

interface Item {
  id: string
  file: File
  name: string
  status: FileStatus
  outputUrl?: string
  inputBytes: number
  outputBytes?: number
  error?: string
}

function formatBytes(bytes: number | undefined): string {
  if (bytes === undefined) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function isHeicFile(file: File): boolean {
  if (/\.(heic|heif)$/i.test(file.name)) return true
  if (file.type === 'image/heic' || file.type === 'image/heif') return true
  return false
}

function jpgNameFor(name: string): string {
  return name.replace(/\.(heic|heif)$/i, '') + '.jpg'
}

export default function Converter(): React.JSX.Element {
  const t = useTranslations('converter')
  const [items, setItems] = useState<Item[]>([])
  const [quality, setQuality] = useState(80)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const dragCounter = useRef(0)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  const presetKey = useMemo<'maximum' | 'high' | 'recommended' | 'economy' | 'low'>(() => {
    if (quality >= 95) return 'maximum'
    if (quality >= 85) return 'high'
    if (quality >= 70) return 'recommended'
    if (quality >= 50) return 'economy'
    return 'low'
  }, [quality])

  const addFiles = useCallback((files: File[]) => {
    const heicFiles = files.filter(isHeicFile)
    if (heicFiles.length === 0) return
    setItems((prev) => {
      const existing = new Set(prev.map((i) => `${i.name}:${i.file.size}`))
      const additions: Item[] = heicFiles
        .filter((f) => !existing.has(`${f.name}:${f.size}`))
        .map((f) => ({
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
          file: f,
          name: f.name,
          status: 'pending',
          inputBytes: f.size
        }))
      return [...prev, ...additions]
    })
  }, [])

  useEffect(() => {
    return () => {
      setItems((prev) => {
        prev.forEach((i) => i.outputUrl && URL.revokeObjectURL(i.outputUrl))
        return prev
      })
    }
  }, [])

  useEffect(() => {
    const onDragEnter = (e: DragEvent): void => {
      e.preventDefault()
      const types = Array.from(e.dataTransfer?.types ?? [])
      if (!types.includes('Files')) return
      dragCounter.current += 1
      setIsDragging(true)
    }
    const onDragOver = (e: DragEvent): void => {
      const types = Array.from(e.dataTransfer?.types ?? [])
      if (!types.includes('Files')) return
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
    }
    const onDragLeave = (e: DragEvent): void => {
      const types = Array.from(e.dataTransfer?.types ?? [])
      if (!types.includes('Files')) return
      e.preventDefault()
      dragCounter.current -= 1
      if (dragCounter.current <= 0) {
        dragCounter.current = 0
        setIsDragging(false)
      }
    }
    const onDrop = (e: DragEvent): void => {
      const types = Array.from(e.dataTransfer?.types ?? [])
      if (!types.includes('Files')) return
      e.preventDefault()
      dragCounter.current = 0
      setIsDragging(false)
      const files = Array.from(e.dataTransfer?.files ?? [])
      addFiles(files)
    }

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('drop', onDrop)
    }
  }, [addFiles])

  const updateItem = (id: string, patch: Partial<Item>): void => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  const handlePick = (): void => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files ?? [])
    addFiles(files)
    e.target.value = ''
  }

  const handleRemove = (id: string): void => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id)
      if (target?.outputUrl) URL.revokeObjectURL(target.outputUrl)
      return prev.filter((i) => i.id !== id)
    })
  }

  const handleClear = (): void => {
    setItems((prev) => {
      prev.forEach((i) => i.outputUrl && URL.revokeObjectURL(i.outputUrl))
      return []
    })
  }

  const handleConvertAll = async (): Promise<void> => {
    const pending = items.filter((i) => i.status === 'pending' || i.status === 'error')
    if (pending.length === 0) return
    setIsConverting(true)
    const { heicTo } = await import('heic-to')
    for (const item of pending) {
      updateItem(item.id, { status: 'converting', error: undefined })
      try {
        const [jpegBlob, exifBytes] = await Promise.all([
          heicTo({
            blob: item.file,
            type: 'image/jpeg',
            quality: quality / 100
          }),
          buildExifBytesFromHeic(item.file)
        ])
        const finalBlob = exifBytes
          ? await attachExifToJpeg(jpegBlob, exifBytes)
          : jpegBlob
        const url = URL.createObjectURL(finalBlob)
        updateItem(item.id, {
          status: 'done',
          outputUrl: url,
          outputBytes: finalBlob.size
        })
      } catch (err) {
        updateItem(item.id, {
          status: 'error',
          error: err instanceof Error ? err.message : t('errorFallback')
        })
      }
    }
    setIsConverting(false)
  }

  const handleDownload = (item: Item): void => {
    if (!item.outputUrl) return
    const a = document.createElement('a')
    a.href = item.outputUrl
    a.download = jpgNameFor(item.name)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleDownloadAll = (): void => {
    items
      .filter((i) => i.status === 'done')
      .forEach((i, idx) => setTimeout(() => handleDownload(i), idx * 80))
  }

  const stats = useMemo(() => {
    const total = items.length
    const done = items.filter((i) => i.status === 'done').length
    const errors = items.filter((i) => i.status === 'error').length
    return { total, done, errors }
  }, [items])

  const canConvert = items.some((i) => i.status === 'pending' || i.status === 'error')

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)] px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-[color:var(--color-brand)] text-xs font-bold text-white">
              M
            </div>
            <span className="text-sm font-semibold text-[color:var(--color-ink)]">
              {t('cardTitle')}
            </span>
          </div>
          <div className="text-[11px] text-[color:var(--color-ink-soft)]">
            {t('cardTagline')}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <button
            type="button"
            onClick={handlePick}
            className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
              isDragging
                ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand-subtle)]'
                : 'border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)] hover:border-[color:var(--color-ink-soft)]'
            }`}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                isDragging
                  ? 'text-[color:var(--color-brand)]'
                  : 'text-[color:var(--color-ink-soft)]'
              }
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div className="text-sm font-semibold text-[color:var(--color-ink)]">
              {isDragging ? t('dropDragging') : t('dropIdle')}
            </div>
            <div className="text-xs text-[color:var(--color-ink-soft)]">{t('dropHint')}</div>
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              multiple
              accept=".heic,.heif,image/heic,image/heif"
              onChange={handleInputChange}
              className="hidden"
            />
          </button>

          {items.length > 0 && (
            <>
              <div className="mt-6 flex items-center justify-between text-xs text-[color:var(--color-ink-muted)]">
                <div>
                  {t('counterFiles', { total: stats.total, done: stats.done })}
                  {stats.errors > 0 ? t('counterErrors', { errors: stats.errors }) : ''}
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isConverting}
                  className="font-medium text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)] disabled:opacity-40"
                >
                  {t('clearAll')}
                </button>
              </div>

              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-2.5 text-sm shadow-[var(--shadow-whisper)]"
                  >
                    <StatusBadge status={item.status} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-[color:var(--color-ink)]">
                        {item.name}
                      </div>
                      <div className="truncate text-xs text-[color:var(--color-ink-soft)]">
                        {item.status === 'done' && item.outputBytes
                          ? `${formatBytes(item.inputBytes)} → ${formatBytes(item.outputBytes)} (${(item.outputBytes / item.inputBytes).toFixed(1)}x)`
                          : item.status === 'error'
                            ? (item.error ?? t('errorFallback'))
                            : formatBytes(item.inputBytes)}
                      </div>
                    </div>
                    {item.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="rounded-xl bg-[color:var(--color-brand)] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[color:var(--color-brand-dark)]"
                      >
                        {t('download')}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      disabled={isConverting && item.status === 'converting'}
                      className="text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)] disabled:opacity-40"
                      aria-label={t('removeAria')}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)] px-6 py-4">
          <div className="flex items-center gap-2">
            <span
              className="cursor-help text-xs font-medium text-[color:var(--color-ink-muted)]"
              title={t('qualityTooltip')}
            >
              {t('qualityLabel')} ⓘ
            </span>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={isConverting}
              className="w-32 accent-[color:var(--color-brand)]"
            />
            <span className="w-8 text-xs font-semibold tabular-nums text-[color:var(--color-ink)]">
              {quality}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-[color:var(--color-ink-soft)]">
              {t(`preset.${presetKey}`)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {stats.done > 1 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-2 text-sm font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-ink-soft)]"
              >
                {t('downloadAll')}
              </button>
            )}
            <button
              type="button"
              onClick={handleConvertAll}
              disabled={!canConvert || isConverting}
              className="rounded-xl bg-[color:var(--color-brand)] px-5 py-2 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-[color:var(--color-brand-dark)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              {isConverting ? t('convertBusy') : t('convertIdle')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: FileStatus }): React.JSX.Element {
  const t = useTranslations('converter.status')
  const map: Record<FileStatus, string> = {
    pending: 'bg-[color:var(--color-line-soft)] text-[color:var(--color-ink-muted)]',
    converting:
      'bg-[color:var(--color-warning-bg)] text-[color:var(--color-warning-ink)]',
    done: 'bg-[color:var(--color-success-bg)] text-[color:var(--color-success-ink)]',
    error: 'bg-[color:var(--color-danger-bg)] text-[color:var(--color-danger-ink)]'
  }
  return (
    <span
      className={`inline-flex h-5 w-20 items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-wide ${map[status]}`}
    >
      {t(status)}
    </span>
  )
}
