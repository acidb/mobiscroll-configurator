export interface Group {
  id: string
  name: string
  slug: string
  sortOrder: number
  updatedAt: string
}

export interface Component {
  id: string
  label: string
  group: string
  view: string
  sortOrder: number
}

export interface Framework {
  id: string
  name: string
  slug: string
  template: number
  icon: string
}

export interface Preset {
  id: string
  name: string
  slug: string
  description: string
  component: string
}
