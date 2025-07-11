import type { Payload } from 'payload'

export default async function seedDatabase(payload: Payload) {
  try {
    //Groups
    const groups = [
      { name: 'Event calendar & scheduling', slug: 'eventcalendar', sortOrder: 1 },
      { name: 'Date & time selection', slug: 'datepicker', sortOrder: 2 },
      { name: 'Form & util components', slug: 'util', sortOrder: 3 },
    ]
    const createdGroups = await Promise.all(
      groups.map((group) => payload.create({ collection: 'groups', data: group })),
    )

    //Components
    const components = [
      { group: 'eventcalendar', view: 'timeline', label: 'Timeline', sortOrder: 1 },
      { group: 'eventcalendar', view: 'scheduler', label: 'Scheduler', sortOrder: 2 },
      { group: 'eventcalendar', view: 'agenda', label: 'Agenda', sortOrder: 3 },
      { group: 'eventcalendar', view: 'calendar', label: 'Calendar', sortOrder: 4 },
      { group: 'datepicker', view: 'datepicker', label: 'Datepicker', sortOrder: 1 },
      { group: 'datepicker', view: 'rangepicker', label: 'Range picker', sortOrder: 2 },
      { group: 'datepicker', view: 'timepicker', label: 'Time picker', sortOrder: 3 },
      { group: 'util', view: 'popup', label: 'Popup', sortOrder: 1 },
      { group: 'util', view: 'select', label: 'Select', sortOrder: 2 },
    ]
    const createdComponents = await Promise.all(
      components.map(async (component) => {
        const group = createdGroups.find((g) => g.slug === component.group)
        if (!group) {
          throw new Error(`Group not found for component: ${component.label}`)
        }
        return await payload.create({
          collection: 'components',
          data: { ...component, group: group.id },
        })
      }),
    )

    const componentMap: { [view: string]: string } = {}
    for (const component of createdComponents) {
      componentMap[component.view] = component.id
    }

    //Frameworks
    const frameworks = [
      {
        name: 'React',
        slug: 'react',
        template: `
          import { /* Component */ } from '@mobiscroll/react';
          import { useCallback, useEffect, useMemo, useState } from 'react';

          function App() {
            return (
              <>
                </* Component */
                 /* Component options */
                />
              </>
            );
          }

          export default App;
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png',
        sortOrder: 1,
      },
      {
        name: 'Vue',
        slug: 'vue',
        template: `
          <template>
            <mbsc-/* Component */
              /* Component options */
            ></mbsc-/* Component */>
          </template>

          <script>
          import { /* Component */ } from '@mobiscroll/vue';

          export default {
            name: 'App',
            components: { /* Component */ },
          };
          </script>
        `,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/800px-Vue.js_Logo_2.svg.png',
        sortOrder: 2,
      },
    ]
    const createdFrameworks = await Promise.all(
      frameworks.map((framework) => payload.create({ collection: 'frameworks', data: framework })),
    )

    //Presets
    const presets = [
      {
        name: 'Basic Config',
        slug: 'basic-config',
        description: 'Basic configuration for the selected component',
        component: 'timeline',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'basic' }],
        recommended: true,
        sortOrder: 0,
      },
      {
        name: 'Team Scheduling',
        slug: 'team-scheduling',
        description: 'Team scheduling preset with timeline view',
        component: 'timeline',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'scheduling' }, { tag: 'team' }],
        recommended: true,
        sortOrder: 1,
      },
      {
        name: 'Conference Planning',
        slug: 'conference-planning',
        description: 'Conference planning preset with agenda view',
        component: 'agenda',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'conference' }, { tag: 'planning' }],
        recommended: false,
        sortOrder: 2,
      },
      {
        name: 'Resource Booking',
        slug: 'resource-booking',
        description: 'Resource booking preset with scheduler view',
        component: 'scheduler',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'booking' }, { tag: 'resource' }],
        recommended: false,
        sortOrder: 3,
      },
      {
        name: 'Shift Planner',
        slug: 'shift-planner',
        description: 'Shift planning preset with timeline view',
        component: 'timeline',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'shift' }, { tag: 'planning' }],
        recommended: false,
        sortOrder: 4,
      },
      {
        name: 'Room Reservations',
        slug: 'room-reservations',
        description: 'Room reservation preset with calendar view',
        component: 'calendar',
        frameworks: ['react', 'vue'],
        tags: [{ tag: 'reservation' }, { tag: 'room' }],
        recommended: false,
        sortOrder: 5,
      },
    ]
    const createdPresets = await Promise.all(
      presets.map(async (preset) => {
        const componentId = componentMap[preset.component]
        if (!componentId) {
          throw new Error(`Component not found for preset: ${preset.name}`)
        }
        const frameworks = createdFrameworks
          .filter((f) => preset.frameworks.includes(f.slug))
          .map((f) => f.id)
        return await payload.create({
          collection: 'presets',
          data: { ...preset, component: componentId, frameworks },
        })
      }),
    )

    const presetMap: { [slug: string]: string } = {}
    for (const preset of createdPresets) {
      presetMap[preset.slug] = preset.id
    }

    //Configs
    const configs = [
      {
        preset: 'basic-config',
        config: {
          component: 'Eventcalendar',
          props: {
            clickToCreate: false,
            dragToMove: false,
            view: { timeline: { type: 'month' } },
            data: [],
            onCellClick: '/* handler function */',
          },
        },
        version: '1.0.0',
        createdBy: 'admin',
      },
      {
        preset: 'team-scheduling',
        config: {
          component: 'Eventcalendar',
          props: {
            clickToCreate: true,
            dragToMove: true,
            view: { timeline: { type: 'month' } },
            data: [],
            onCellClick: '/* handler function */',
          },
        },
        version: '1.0.0',
        createdBy: 'admin',
      },
    ]
    const createdConfigs = await Promise.all(
      configs.map(async (config) => {
        const presetId = presetMap[config.preset]
        if (!presetId) {
          throw new Error(`Preset not found for configuration: ${config.preset}`)
        }
        return await payload.create({
          collection: 'configs',
          data: { ...config, preset: presetId },
        })
      }),
    )

    return { success: true, message: 'Database seeding completed successfully!' }
  } catch (error) {
    console.error('Error during database seeding:', error)
    return {
      success: false,
      message: `Error during database seeding: ${(error as Error).message}`,
    }
  }
}
