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
  group: Group
  view: string
  sortOrder: number
}

export interface Framework {
  id: string
  name: string
  slug: string
  template: string
  icon: string
}

export interface Preset {
  id: string
  name: string
  slug: string
  description: string
  component: string
  sortOrder: number
}

export interface ConfigurationOption {
  component: string;
  props: Record<string, any>;
}

export interface Config {
  id: string;
  preset: Preset | null;
  config: ConfigurationOption;
}



