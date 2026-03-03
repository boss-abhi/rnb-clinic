// Strapi 5 Blocks (rich text) helper builders
// Keeps seed data readable in TypeScript

type TextNode = { type: 'text'; text: string; bold?: boolean; italic?: boolean }

const txt = (text: string, bold?: boolean, italic?: boolean): TextNode => ({
  type: 'text',
  text,
  ...(bold ? { bold: true } : {}),
  ...(italic ? { italic: true } : {}),
})

export const h2 = (text: string) => ({
  type: 'heading',
  level: 2,
  children: [txt(text)],
})

export const h3 = (text: string) => ({
  type: 'heading',
  level: 3,
  children: [txt(text)],
})

export const p = (text: string) => ({
  type: 'paragraph',
  children: [txt(text)],
})

export const pb = (before: string, bold: string, after = '') => ({
  type: 'paragraph',
  children: [txt(before), txt(bold, true), ...(after ? [txt(after)] : [])],
})

export const ul = (...items: string[]) => ({
  type: 'list',
  format: 'unordered',
  children: items.map(item => ({
    type: 'list-item',
    children: [txt(item)],
  })),
})

export const ol = (...items: string[]) => ({
  type: 'list',
  format: 'ordered',
  children: items.map(item => ({
    type: 'list-item',
    children: [txt(item)],
  })),
})

// link node (for embedding in paragraphs)
export const link = (text: string, url: string) => ({
  type: 'link' as const,
  url,
  children: [txt(text)],
})

// paragraph with embedded internal link
export const plink = (before: string, linkText: string, url: string, after = '') => ({
  type: 'paragraph',
  children: [
    ...(before ? [txt(before)] : []),
    link(linkText, url),
    ...(after ? [txt(after)] : []),
  ],
})
