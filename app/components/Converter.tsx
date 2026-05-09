'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

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

function qualityLabel(q: number): string {
  if (q >= 95) return 'Maksimum'
  if (q >= 85) return 'Tinggi'
  if (q >= 70) return 'Disarankan'
  if (q >= 50) return 'Hemat'
  return 'Rendah'
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
  const [items, setItems] = useState<Item[]>([])
  const [quality, setQuality] = useState(80)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const dragCounter = useRef(0)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

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
      // Free blob URLs on unmount
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
        const blob = await heicTo({
          blob: item.file,
          type: 'image/jpeg',
          quality: quality / 100
        })
        const url = URL.createObjectURL(blob)
        updateItem(item.id, {
          status: 'done',
          outputUrl: url,
          outputBytes: blob.size
        })
      } catch (err) {
        updateItem(item.id, {
          status: 'error',
          error: err instanceof Error ? err.message : 'Gagal konversi file ini'
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
    <div className="w-full max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-indigo-900/10">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
              M
            </div>
            <span className="text-sm font-medium text-slate-200">Converter Online</span>
          </div>
          <div className="text-[11px] text-slate-500">100% di browser kamu · tanpa upload</div>
        </div>

        <div className="p-6 sm:p-8">
          <button
            type="button"
            onClick={handlePick}
            className={`flex w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center transition-colors ${
              isDragging
                ? 'border-indigo-400 bg-indigo-500/10'
                : 'border-slate-700 bg-slate-950/50 hover:border-slate-600'
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
              className={isDragging ? 'text-indigo-300' : 'text-slate-500'}
              aria-hidden
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <div className="text-sm font-medium text-slate-200">
              {isDragging ? 'Lepaskan untuk upload' : 'Drag & drop file HEIC ke sini'}
            </div>
            <div className="text-xs text-slate-500">atau klik untuk pilih file</div>
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
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <div>
                  {stats.total} file · {stats.done} selesai
                  {stats.errors > 0 ? ` · ${stats.errors} error` : ''}
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isConverting}
                  className="text-slate-500 hover:text-slate-300 disabled:opacity-40"
                >
                  Hapus semua
                </button>
              </div>

              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2.5 text-sm"
                  >
                    <StatusBadge status={item.status} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-slate-200">{item.name}</div>
                      <div className="truncate text-xs text-slate-500">
                        {item.status === 'done' && item.outputBytes
                          ? `${formatBytes(item.inputBytes)} → ${formatBytes(item.outputBytes)} (${(item.outputBytes / item.inputBytes).toFixed(1)}x)`
                          : item.status === 'error'
                            ? (item.error ?? 'Gagal konversi')
                            : formatBytes(item.inputBytes)}
                      </div>
                    </div>
                    {item.status === 'done' && (
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500"
                      >
                        Download
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      disabled={isConverting && item.status === 'converting'}
                      className="text-xs text-slate-500 hover:text-rose-400 disabled:opacity-40"
                      aria-label="Hapus"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 bg-slate-950/40 px-6 py-4">
          <div className="flex items-center gap-2">
            <span
              className="cursor-help text-xs text-slate-400"
              title="JPG selalu lebih besar dari HEIC karena kompresi HEIC (HEVC) lebih efisien. Slider ini kontrol kualitas/ukuran JPG-nya saja. Disarankan 75-85."
            >
              Quality ⓘ
            </span>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={isConverting}
              className="w-32 accent-indigo-500"
            />
            <span className="w-8 text-xs tabular-nums text-slate-300">{quality}</span>
            <span className="text-[10px] uppercase tracking-wide text-slate-500">
              {qualityLabel(quality)}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {stats.done > 1 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-600 hover:bg-slate-800"
              >
                Download semua
              </button>
            )}
            <button
              type="button"
              onClick={handleConvertAll}
              disabled={!canConvert || isConverting}
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConverting ? 'Converting…' : 'Convert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: FileStatus }): React.JSX.Element {
  const map: Record<FileStatus, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-slate-700 text-slate-300' },
    converting: { label: 'Converting', className: 'bg-amber-500/20 text-amber-300' },
    done: { label: 'Done', className: 'bg-emerald-500/20 text-emerald-300' },
    error: { label: 'Error', className: 'bg-rose-500/20 text-rose-300' }
  }
  const item = map[status]
  return (
    <span
      className={`inline-flex h-5 w-16 items-center justify-center rounded-full text-[10px] font-medium uppercase tracking-wide ${item.className}`}
    >
      {item.label}
    </span>
  )
}
