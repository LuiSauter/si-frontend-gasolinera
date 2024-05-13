export interface Breadcrumb {
  label: string
  path?: string
}

export interface IHeaderContext {
  breadcrumb: Breadcrumb[]
  handleBreadcrumb: (value: Breadcrumb[]) => void
}
