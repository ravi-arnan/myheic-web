import Logo, { Wordmark } from '../components/Logo'

const SIZES = [16, 24, 32, 48, 64, 96, 128, 192]
const VARIANTS: Array<{ id: 'a' | 'b' | 'c'; name: string; tagline: string }> = [
  {
    id: 'a',
    name: 'A — ShutterM',
    tagline:
      'Custom geometric M dengan aperture dot kecil di V dip. Reads "M" jelas, dengan hint photo function.'
  },
  {
    id: 'b',
    name: 'B — LensM',
    tagline:
      'M dengan outer aperture ring + lens dot di tengah. Lebih kentara photo/lens identity.'
  },
  {
    id: 'c',
    name: 'C — StackM',
    tagline:
      'Dua tile offset dengan M di top — suggests format transformation (HEIC → JPG).'
  }
]

export default function LogoPreview(): React.JSX.Element {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)]">
          Logo concept comparison
        </h1>
        <p className="mt-2 text-[color:var(--color-ink-muted)]">
          Pilih varian yang paling kena. Tiap konsep dirender pada ukuran favicon (16/24/32),
          header (48), dan brand display (64-192).
        </p>
      </div>

      <div className="space-y-12">
        {VARIANTS.map((v) => (
          <section
            key={v.id}
            className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-whisper)] sm:p-8"
          >
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[color:var(--color-ink)]">
                  {v.name}
                </h2>
                <p className="mt-1 max-w-xl text-sm text-[color:var(--color-ink-muted)]">
                  {v.tagline}
                </p>
              </div>
              <code className="rounded bg-[color:var(--color-surface-soft)] px-2 py-1 text-xs text-[color:var(--color-ink-muted)]">
                variant=&quot;{v.id}&quot;
              </code>
            </div>

            <div className="space-y-6">
              {/* Sizes row — light surface */}
              <div className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)] p-6">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
                  Sizes (light)
                </p>
                <div className="flex flex-wrap items-end gap-6">
                  {SIZES.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <Logo variant={v.id} size={s} />
                      <span className="text-[10px] tabular-nums text-[color:var(--color-ink-soft)]">
                        {s}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes row — dark surface */}
              <div className="rounded-xl border border-[color:var(--color-line)] bg-[#0e0e10] p-6">
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#74778a]">
                  Sizes (dark)
                </p>
                <div className="flex flex-wrap items-end gap-6">
                  {SIZES.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <Logo variant={v.id} size={s} />
                      <span className="text-[10px] tabular-nums text-[#74778a]">
                        {s}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inline pairing — header simulation */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-4">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
                    Header (light)
                  </p>
                  <div className="flex items-center gap-2">
                    <Logo variant={v.id} size={36} />
                    <Wordmark />
                  </div>
                </div>
                <div className="rounded-xl border border-[color:var(--color-line)] bg-[#0e0e10] p-4">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#74778a]">
                    Header (dark)
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <Logo variant={v.id} size={36} />
                    <Wordmark />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-[color:var(--color-ink-muted)]">
        Pilih A, B, atau C, dan saya akan apply ke header, favicon, OG image, dan
        desktop app icon. Atau kalau mau hybrid (mis. ambil M dari A tapi pakai stacked tile dari C), kasih tau.
      </p>
    </main>
  )
}
