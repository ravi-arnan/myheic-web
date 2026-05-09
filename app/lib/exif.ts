import { parse as parseExif } from 'exifr'
import piexif from 'piexifjs'

type IfdMap = Record<number, unknown>

interface PiexifObject {
  '0th': IfdMap
  Exif: IfdMap
  GPS: IfdMap
  Interop: IfdMap
  '1st': IfdMap
  thumbnail?: string
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatExifDate(value: unknown): string | null {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value as string)
  if (Number.isNaN(date.getTime())) return null
  return `${date.getFullYear()}:${pad(date.getMonth() + 1)}:${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function rational(n: number, denom = 10000): [number, number] {
  return [Math.round(n * denom), denom]
}

export async function buildExifBytesFromHeic(file: File): Promise<string | null> {
  let parsed: Record<string, unknown> | undefined
  try {
    parsed = (await parseExif(file)) as Record<string, unknown> | undefined
  } catch (err) {
    console.warn('[EXIF parse failed]', err)
    return null
  }
  if (!parsed) return null

  const out: PiexifObject = {
    '0th': {},
    Exif: {},
    GPS: {},
    Interop: {},
    '1st': {}
  }

  const setIf = (
    target: IfdMap,
    tagId: number,
    value: unknown,
    transform?: (v: unknown) => unknown
  ): void => {
    if (value === undefined || value === null || value === '') return
    target[tagId] = transform ? transform(value) : value
  }

  // 0th IFD — image-level metadata
  setIf(out['0th'], piexif.ImageIFD.Make, parsed.Make)
  setIf(out['0th'], piexif.ImageIFD.Model, parsed.Model)
  setIf(out['0th'], piexif.ImageIFD.Software, parsed.Software)
  setIf(out['0th'], piexif.ImageIFD.ImageDescription, parsed.ImageDescription)
  setIf(out['0th'], piexif.ImageIFD.Artist, parsed.Artist)
  setIf(out['0th'], piexif.ImageIFD.Copyright, parsed.Copyright)
  setIf(out['0th'], piexif.ImageIFD.Orientation, parsed.Orientation)
  setIf(out['0th'], piexif.ImageIFD.XResolution, parsed.XResolution, (v) =>
    rational(Number(v), 1)
  )
  setIf(out['0th'], piexif.ImageIFD.YResolution, parsed.YResolution, (v) =>
    rational(Number(v), 1)
  )
  setIf(out['0th'], piexif.ImageIFD.ResolutionUnit, parsed.ResolutionUnit)
  const dt0 = formatExifDate(parsed.DateTime ?? parsed.ModifyDate)
  if (dt0) out['0th'][piexif.ImageIFD.DateTime] = dt0

  // Exif IFD — capture-specific metadata
  const dtOrig = formatExifDate(parsed.DateTimeOriginal)
  if (dtOrig) out.Exif[piexif.ExifIFD.DateTimeOriginal] = dtOrig
  const dtDigi = formatExifDate(parsed.DateTimeDigitized ?? parsed.CreateDate)
  if (dtDigi) out.Exif[piexif.ExifIFD.DateTimeDigitized] = dtDigi

  setIf(out.Exif, piexif.ExifIFD.ExposureTime, parsed.ExposureTime, (v) =>
    rational(Number(v))
  )
  setIf(out.Exif, piexif.ExifIFD.FNumber, parsed.FNumber, (v) =>
    rational(Number(v), 100)
  )
  const iso = parsed.ISO ?? parsed.ISOSpeedRatings ?? parsed.PhotographicSensitivity
  setIf(out.Exif, piexif.ExifIFD.ISOSpeedRatings, iso)
  setIf(out.Exif, piexif.ExifIFD.FocalLength, parsed.FocalLength, (v) =>
    rational(Number(v), 100)
  )
  setIf(out.Exif, piexif.ExifIFD.FocalLengthIn35mmFilm, parsed.FocalLengthIn35mmFormat)
  setIf(out.Exif, piexif.ExifIFD.LensModel, parsed.LensModel)
  setIf(out.Exif, piexif.ExifIFD.LensMake, parsed.LensMake)
  setIf(out.Exif, piexif.ExifIFD.ExposureBiasValue, parsed.ExposureCompensation, (v) =>
    rational(Number(v))
  )
  setIf(out.Exif, piexif.ExifIFD.MeteringMode, parsed.MeteringMode)
  setIf(out.Exif, piexif.ExifIFD.Flash, parsed.Flash)
  setIf(out.Exif, piexif.ExifIFD.WhiteBalance, parsed.WhiteBalance)
  setIf(out.Exif, piexif.ExifIFD.ColorSpace, parsed.ColorSpace ?? 1)
  setIf(out.Exif, piexif.ExifIFD.ExifVersion, parsed.ExifVersion)
  setIf(out.Exif, piexif.ExifIFD.PixelXDimension, parsed.ExifImageWidth)
  setIf(out.Exif, piexif.ExifIFD.PixelYDimension, parsed.ExifImageHeight)

  // GPS IFD
  const lat = parsed.latitude as number | undefined
  const lon = parsed.longitude as number | undefined
  if (typeof lat === 'number' && typeof lon === 'number') {
    out.GPS[piexif.GPSIFD.GPSLatitudeRef] = lat >= 0 ? 'N' : 'S'
    out.GPS[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lat))
    out.GPS[piexif.GPSIFD.GPSLongitudeRef] = lon >= 0 ? 'E' : 'W'
    out.GPS[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(Math.abs(lon))
    const alt = parsed.GPSAltitude as number | undefined
    if (typeof alt === 'number') {
      out.GPS[piexif.GPSIFD.GPSAltitudeRef] = alt >= 0 ? 0 : 1
      out.GPS[piexif.GPSIFD.GPSAltitude] = rational(Math.abs(alt), 100)
    }
  }

  try {
    return piexif.dump(out)
  } catch (err) {
    console.warn('[EXIF dump failed]', err)
    return null
  }
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error('FileReader error'))
    reader.readAsDataURL(blob)
  })
}

export function dataUrlToBlob(dataUrl: string, mime = 'image/jpeg'): Blob {
  const commaIdx = dataUrl.indexOf(',')
  const base64 = dataUrl.slice(commaIdx + 1)
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

export async function attachExifToJpeg(jpegBlob: Blob, exifBytes: string): Promise<Blob> {
  const dataUrl = await blobToDataUrl(jpegBlob)
  const merged = piexif.insert(exifBytes, dataUrl)
  return dataUrlToBlob(merged, 'image/jpeg')
}
