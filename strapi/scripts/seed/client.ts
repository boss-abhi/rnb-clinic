/**
 * Strapi Admin API client for seed scripts.
 * Authenticates with admin credentials, then uses the content-manager API
 * to create and publish documents.
 *
 * Requires a running Strapi instance (npm run develop / npm start).
 */

const BASE_URL = (process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'admin@thernbclinic.com'
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || ''

let jwt: string | null = null
const idMap: Record<string, Record<string, string>> = {} // contentType → name → documentId

async function login(): Promise<void> {
  if (!ADMIN_PASSWORD) {
    throw new Error(
      'STRAPI_ADMIN_PASSWORD not set. Copy strapi/.env.example → strapi/.env and fill in values.'
    )
  }
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })
  const body = (await res.json()) as { data?: { token?: string }; error?: unknown }
  if (!body.data?.token) {
    throw new Error(`Admin login failed: ${JSON.stringify(body)}`)
  }
  jwt = body.data.token
  console.log(`  ✓ Authenticated as ${ADMIN_EMAIL}`)
}

function authHeaders() {
  if (!jwt) throw new Error('Not authenticated — call login() first')
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${jwt}` }
}

/**
 * Create a collection-type document and publish it.
 * contentType: short name, e.g. "service" or "blog-post"
 */
async function create(contentType: string, data: Record<string, unknown>): Promise<string> {
  const uid = buildUID(contentType)
  const payload = {
    ...data,
    ...(data.publishedAt ? {} : { publishedAt: new Date().toISOString() }),
  }
  const res = await fetch(`${BASE_URL}/content-manager/collection-types/${uid}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  const body = (await res.json()) as { data?: { documentId?: string; id?: number }; error?: unknown }
  if (!res.ok || !body.data) {
    throw new Error(`Create ${contentType} failed (${res.status}): ${JSON.stringify(body)}`)
  }
  const documentId = body.data.documentId || String(body.data.id)
  return documentId
}

async function publish(contentType: string, documentId: string): Promise<void> {
  const uid = buildUID(contentType)
  const res = await fetch(
    `${BASE_URL}/content-manager/collection-types/${uid}/${documentId}/actions/publish`,
    { method: 'POST', headers: authHeaders() }
  )
  if (!res.ok) {
    const body = await res.text()
    console.warn(`  ⚠ Publish skipped for ${contentType}/${documentId} (${res.status})`) 
    console.warn(`    ${body.slice(0, 200)}`)
  }
}

/** Create + publish in one call. Returns documentId. */
export async function createAndPublish(
  contentType: string,
  data: Record<string, unknown>,
  nameKey = 'name'
): Promise<string> {
  const documentId = await create(contentType, data)
  await publish(contentType, documentId)
  const label = String((data[nameKey] ?? data['title'] ?? data['clinic_name']) || documentId)
  if (!idMap[contentType]) idMap[contentType] = {}
  idMap[contentType][label] = documentId
  return documentId
}

/** Create a draft (no publish — for Mode B blog posts or lead entries). */
export async function createDraft(
  contentType: string,
  data: Record<string, unknown>
): Promise<string> {
  const documentId = await create(contentType, data)
  const label = String((data['title'] ?? data['name']) || documentId)
  if (!idMap[contentType]) idMap[contentType] = {}
  idMap[contentType][label] = documentId
  return documentId
}

/** Update + publish a single-type document. */
export async function upsertSingleType(
  contentType: string,
  data: Record<string, unknown>
): Promise<void> {
  const uid = buildUID(contentType)
  // PUT creates or replaces
  const payload = {
    ...data,
    ...(data.publishedAt ? {} : { publishedAt: new Date().toISOString() }),
  }
  const res = await fetch(`${BASE_URL}/content-manager/single-types/${uid}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Upsert single-type ${contentType} failed (${res.status}): ${body}`)
  }
  // Publish
  const pub = await fetch(
    `${BASE_URL}/content-manager/single-types/${uid}/actions/publish`,
    { method: 'POST', headers: authHeaders() }
  )
  if (!pub.ok) {
    const body = await pub.text()
    console.warn(`  ⚠ Publish single-type skipped for ${contentType} (${pub.status})`)
    console.warn(`    ${body.slice(0, 200)}`)
  }
}

/** Look up a previously created document's ID by its name/title. */
export function getId(contentType: string, nameOrTitle: string): string {
  const id = idMap[contentType]?.[nameOrTitle]
  if (!id) {
    throw new Error(
      `ID not found for ${contentType}["${nameOrTitle}"]. ` +
      `Known keys: ${Object.keys(idMap[contentType] ?? {}).join(', ')}`
    )
  }
  return id
}

export function getIdMaybe(contentType: string, nameOrTitle: string): string | undefined {
  return idMap[contentType]?.[nameOrTitle]
}

export { login }

// UID builder: "service" → "api::service.service", "blog-post" → "api::blog-post.blog-post"
function buildUID(contentType: string): string {
  return `api::${contentType}.${contentType}`
}
