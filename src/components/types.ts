/*
 
 This file will and must be deleted in the future.
 It is only here to provide a context for the code that is being edited.
 It is not part of the final codebase.
 
 */


export interface ConfigurationOption {
    prop: string;
    description?: string;
    values: boolean | string[];
}

export interface Configuration {
    id: string;
    description?: string;
    config: {
        configurations: ConfigurationOption[];
    };
}


export const sampleConfigurations: Configuration[] = [
  
  {
    id: 'calendar',
    description: 'Calendar specific settings.',
    config: {
      configurations: [
        {
          prop: 'theme',
          description: 'Specifies the visual appearance of the component.',
          values: ['ios', 'material', 'windows'],
        },
        {
          prop: 'dragToCreate',
          description: 'Dragging on an empty cell will create a new event.',
          values: false,
        }
      ]
    }
  }
];
