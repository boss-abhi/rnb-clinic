interface SchemaOrgProps {
  schema: object | null | undefined
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  if (!schema) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
