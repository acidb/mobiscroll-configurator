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


export interface FrameworkTemplate {
  label: string;
  template: string;
}

export interface Framework {
  id: string
  name: string
  slug: string
  template: string
  templates: FrameworkTemplate[];
  icon: string
}

export interface Preset {
  id: string
  name: string
  slug: string
  description: string
  component: string
}

export interface ConfigurationOption {
  type: string;
  title: string;
  component: string;
  props: Record<string, string>;
  data: Record<string, string>;
  hooks: Record<string, string>;
  templates: Record<string, string>;
  types: string[];
  reactHooks: string[];
}

export interface Config {
  id: string;
  preset: Preset | null;
  config: ConfigurationOption;
}

export interface User {
  id: string;
  email: string;
}

export interface Setting {
  type: string
  display?: string
  description: string
  values?: string[]
  value?: string
  default: string
}

export interface GroupedSettings {
  [group: string]: {
    [settingKey: string]: Setting
  }
}




export type ViewType = "month" | "week" | "day";


export interface ViewModeConfig {
  type: ViewType;
  eventDisplay?: string;
  startTime?: string;
  endTime?: string;
  allDay?: boolean;


}


export interface ViewConfig {
  calendar?: ViewModeConfig;
  timeline?: ViewModeConfig;
  agenda?: ViewModeConfig;
  schedule?: ViewModeConfig;

  ///
}



