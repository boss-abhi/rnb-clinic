export interface GoogleReview {
  author: string
  rating: number
  text: string
  relativeTime?: string
  profilePhotoUrl?: string
}

interface PlacesReview {
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: {
    displayName?: string
    photoUri?: string
  }
}

interface PlacesDetailsResponse {
  reviews?: PlacesReview[]
}

export async function getGoogleReviews(limit = 6): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJV0LAqzHh9DkRg6urWNWMp3o'

  if (!apiKey) return []

  const url = `https://places.googleapis.com/v1/places/${placeId}`
  const res = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'reviews',
    },
    cache: 'no-store',
  })

  if (!res.ok) return []

  const data = (await res.json()) as PlacesDetailsResponse
  const reviews = (data.reviews || []).slice(0, limit)

  return reviews
    .filter((r) => r.text?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName || 'Google User',
      rating: r.rating || 5,
      text: r.text?.text || '',
      relativeTime: r.relativePublishTimeDescription,
      profilePhotoUrl: r.authorAttribution?.photoUri,
    }))
}
