import Link from 'next/link'

const DOWNLOAD_URL =
  'https://github.com/ravi-arnan/myheic/releases/latest/download/MyHeic-Setup.exe'
const DONATE_URL = 'https://saweria.co/raviarnan'
const GITHUB_URL = 'https://github.com/ravi-arnan/myheic'

export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Faq />
      <Footer />
    </div>
  )
}

function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold">
            M
          </div>
          <span className="font-semibold tracking-tight">MyHeic</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
          <a href="#fitur" className="hover:text-white">
            Fitur
          </a>
          <a href="#cara" className="hover:text-white">
            Cara pakai
          </a>
          <a href="#faq" className="hover:text-white">
            FAQ
          </a>
        </nav>
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-800 sm:inline-flex"
        >
          Traktir kopi
        </a>
      </div>
    </header>
  )
}

function Hero(): React.JSX.Element {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(99,102,241,0.18) 0%, transparent 70%)'
        }}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <span className="mb-4 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-300">
          Gratis selamanya · Tanpa batas konversi
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Foto HEIC dari HP, jadi JPG{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            dalam sekali klik
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          HP Samsung atau iPhone simpan foto sebagai HEIC supaya hemat memori, tapi laptop
          ga bisa buka. MyHeic ubah HEIC ke JPG di komputer kamu — gratis, offline, dan
          tanpa upload ke server.
        </p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
          >
            <DownloadIcon />
            Download untuk Windows
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm text-slate-200 hover:border-slate-600 hover:bg-slate-900"
          >
            Lihat di GitHub
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Windows 10/11 · ~80MB · Tanpa instalasi codec tambahan
        </p>

        <div className="mt-16 w-full max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-indigo-900/10">
            <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
              <div className="ml-3 text-xs text-slate-500">MyHeic</div>
            </div>
            <div className="p-8">
              <div className="rounded-lg border-2 border-dashed border-slate-700 bg-slate-950/50 p-10 text-center text-sm text-slate-500">
                Drag & drop file HEIC ke sini
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { name: 'IMG_4521.heic', status: 'Done', size: '3.2 MB → 1.1 MB' },
                  { name: 'IMG_4522.heic', status: 'Done', size: '2.8 MB → 980 KB' },
                  { name: 'IMG_4523.heic', status: 'Converting', size: '—' }
                ].map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-3 rounded-md border border-slate-800 bg-slate-950/40 px-3 py-2 text-left text-xs"
                  >
                    <span
                      className={`inline-flex h-5 w-16 items-center justify-center rounded-full text-[10px] font-medium uppercase tracking-wide ${
                        f.status === 'Done'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {f.status}
                    </span>
                    <span className="flex-1 text-slate-300">{f.name}</span>
                    <span className="text-slate-500">{f.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features(): React.JSX.Element {
  const items = [
    {
      title: 'Gratis selamanya',
      description:
        'Tidak ada batas konversi, watermark, atau biaya tahunan. Semua fitur tersedia tanpa bayar.'
    },
    {
      title: '100% Offline',
      description:
        'Foto kamu tidak pernah meninggalkan komputer. Konversi terjadi di laptop sendiri.'
    },
    {
      title: 'Cepat & batch',
      description:
        'Convert ratusan file sekaligus. Drag & drop folder, klik convert, selesai.'
    },
    {
      title: 'Dirancang untuk awam',
      description:
        'Bahasa Indonesia, antarmuka simpel. Cocok untuk dipakai orang tua di rumah.'
    }
  ]
  return (
    <section id="fitur" className="border-t border-slate-800/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Yang bikin MyHeic beda
          </h2>
          <p className="mt-3 text-slate-400">
            Dibikin karena converter online berbayar Rp400rb/tahun itu bikin frustrasi.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks(): React.JSX.Element {
  const steps = [
    {
      number: '1',
      title: 'Download & install',
      description: 'Klik tombol download, jalankan installer. Selesai dalam 30 detik.'
    },
    {
      number: '2',
      title: 'Drop file HEIC',
      description:
        'Buka MyHeic, drag file dari File Explorer ke window-nya. Bisa banyak file sekaligus.'
    },
    {
      number: '3',
      title: 'Klik Convert',
      description:
        'File JPG akan tersimpan di folder yang sama (atau folder pilihan kamu). Langsung bisa dibuka di aplikasi apa saja.'
    }
  ]
  return (
    <section id="cara" className="border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Cara pakainya
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-indigo-600/20 text-base font-semibold text-indigo-300">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq(): React.JSX.Element {
  const items = [
    {
      q: 'Kenapa HP saya menyimpan foto sebagai HEIC, bukan JPG?',
      a: 'HEIC adalah format kompresi modern yang membuat file foto ~50% lebih kecil dengan kualitas yang sama. Beberapa Samsung dan semua iPhone modern menggunakannya saat memori menipis atau mode "high efficiency" aktif. Sayangnya, banyak laptop/PC yang belum bisa membukanya tanpa software tambahan.'
    },
    {
      q: 'Apakah foto saya di-upload ke server?',
      a: 'Tidak. Konversi terjadi 100% di komputer kamu — foto tidak pernah dikirim keluar. Kamu bahkan bisa pakai MyHeic tanpa internet.'
    },
    {
      q: 'Kenapa Windows menampilkan peringatan saat install?',
      a: 'Karena MyHeic belum ditandatangani digital (code signing certificate harganya jutaan/tahun, dan kami pilih tetap gratis). Windows memunculkan SmartScreen warning untuk software baru. Kamu cukup klik "More info" → "Run anyway" untuk lanjut.'
    },
    {
      q: 'Apakah benar-benar gratis selamanya?',
      a: 'Ya. Tidak ada batas konversi, tidak ada watermark, tidak ada langganan. Kalau kamu terbantu, kamu bisa traktir kopi via tombol donasi — tapi sepenuhnya opsional.'
    },
    {
      q: 'Versi Mac dan Linux kapan?',
      a: 'Saat ini fokus di Windows karena di sanalah masalah HEIC paling sering muncul (Mac sudah native support HEIC). Versi Mac/Linux mungkin menyusul kalau ada permintaan.'
    }
  ]
  return (
    <section id="faq" className="border-t border-slate-800/60">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pertanyaan umum
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 open:bg-slate-900/70"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-white">
                <span>{item.q}</span>
                <span className="text-slate-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(): React.JSX.Element {
  return (
    <footer className="mt-auto border-t border-slate-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
        <div>© {new Date().getFullYear()} MyHeic. Dibuat di Indonesia.</div>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300"
          >
            GitHub
          </a>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300"
          >
            Traktir kopi
          </a>
        </div>
      </div>
    </footer>
  )
}

function DownloadIcon(): React.JSX.Element {
  return (
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
