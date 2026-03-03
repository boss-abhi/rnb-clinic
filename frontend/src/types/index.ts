export * from './strapi'

export type NavLink = {
  label: string
  href: string
  children?: NavLink[]
}
