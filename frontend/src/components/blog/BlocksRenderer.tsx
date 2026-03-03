// Simple renderer for Strapi 5 rich text blocks (no external library required)

interface TextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
}

interface BlockNode {
  type: string
  level?: number
  format?: string
  url?: string
  children?: (TextNode | BlockNode)[]
}

function renderText(node: TextNode): React.ReactNode {
  let content: React.ReactNode = node.text

  if (node.code) content = <code className="bg-brand-neutral-100 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>
  if (node.bold) content = <strong>{content}</strong>
  if (node.italic) content = <em>{content}</em>
  if (node.underline) content = <u>{content}</u>
  if (node.strikethrough) content = <s>{content}</s>
  if (node.url) content = <a href={node.url} className="text-brand-blue hover:underline" target={node.url.startsWith('http') ? '_blank' : undefined} rel={node.url.startsWith('http') ? 'noopener noreferrer' : undefined}>{content}</a>

  return content
}

function renderChildren(children: (TextNode | BlockNode)[]): React.ReactNode {
  return children.map((child, i) => {
    if (child.type === 'text') return <span key={i}>{renderText(child as TextNode)}</span>
    if (child.type === 'link') {
      const block = child as BlockNode
      return (
        <a key={i} href={block.url} className="text-brand-blue hover:underline" target={block.url?.startsWith('http') ? '_blank' : undefined} rel={block.url?.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {block.children ? renderChildren(block.children as (TextNode | BlockNode)[]) : ''}
        </a>
      )
    }
    if (child.type === 'list-item') {
      const block = child as BlockNode
      return <li key={i}>{block.children ? renderChildren(block.children as (TextNode | BlockNode)[]) : ''}</li>
    }
    return null
  })
}

function renderBlock(block: BlockNode, index: number): React.ReactNode {
  const children = (block.children || []) as (TextNode | BlockNode)[]

  switch (block.type) {
    case 'paragraph':
      return <p key={index} className="mb-4">{renderChildren(children)}</p>

    case 'heading': {
      const level = block.level || 2
      const sizeClass = level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : level === 3 ? 'text-xl' : 'text-lg'
      const headingClass = `font-bold text-brand-neutral-900 mt-8 mb-4 ${sizeClass}`
      const content = renderChildren(children)
      if (level === 1) return <h1 key={index} className={headingClass}>{content}</h1>
      if (level === 3) return <h3 key={index} className={headingClass}>{content}</h3>
      if (level === 4) return <h4 key={index} className={headingClass}>{content}</h4>
      if (level === 5) return <h5 key={index} className={headingClass}>{content}</h5>
      if (level === 6) return <h6 key={index} className={headingClass}>{content}</h6>
      return <h2 key={index} className={headingClass}>{content}</h2>
    }

    case 'list':
      if (block.format === 'ordered') {
        return <ol key={index} className="list-decimal list-inside mb-4 space-y-1 pl-4">{renderChildren(children)}</ol>
      }
      return <ul key={index} className="list-disc list-inside mb-4 space-y-1 pl-4">{renderChildren(children)}</ul>

    case 'quote':
      return (
        <blockquote key={index} className="border-l-4 border-brand-blue pl-4 italic text-brand-neutral-900/70 my-6">
          {renderChildren(children)}
        </blockquote>
      )

    case 'code':
      return (
        <pre key={index} className="bg-brand-neutral-100 rounded-xl p-4 overflow-x-auto mb-4 text-sm font-mono">
          <code>{renderChildren(children)}</code>
        </pre>
      )

    case 'image': {
      const b = block as BlockNode & { image?: { url: string; width?: number; height?: number; alternativeText?: string } }
      if (!b.image?.url) return null
      return (
        <figure key={index} className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={b.image.url} alt={b.image.alternativeText || ''} width={b.image.width} height={b.image.height} className="rounded-xl w-full" loading="lazy" />
        </figure>
      )
    }

    default:
      return <div key={index}>{renderChildren(children)}</div>
  }
}

interface BlocksRendererProps {
  content: object[]
  className?: string
}

export default function BlocksRenderer({ content, className = '' }: BlocksRendererProps) {
  if (!content || !Array.isArray(content)) return null
  return (
    <div className={`prose-rnb ${className}`}>
      {content.map((block, i) => renderBlock(block as BlockNode, i))}
    </div>
  )
}
