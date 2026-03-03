export interface InstagramVideo {
  url: string
  title: string
}

function parseList(raw: string): string[] {
  return raw
    .split(/[\n,]/g)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function getInstagramVideosFromCms(cmsValue?: string | null): InstagramVideo[] {
  const urls = parseList(cmsValue || '')
  return urls.map((url, idx) => ({
    url,
    title: `Instagram video ${idx + 1}`,
  }))
}

export function toInstagramEmbedUrl(url: string): string {
  const raw = url.trim()
  const noQuery = raw.split('?')[0].split('#')[0].replace(/\/+$/, '')
  return `${noQuery}/embed`
}
