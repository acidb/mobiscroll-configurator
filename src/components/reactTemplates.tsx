import React from 'react';
import { MbscCalendarEventData, MbscResource } from '@mobiscroll/react';
import Image from 'next/image';

/*
This file is for adding new Mobiscroll renderer functions ("templates").
Templates allow you to customize the rendering of elements like 'renderResource', 'renderHeader', etc.
See the full list of supported renderers in the docs: https://mobiscroll.com/docs/react/datepicker/api#renderers

If you want to add a new template for a renderer, follow these steps:

* STEP 1: Define the template here
   Below 'export const templates', add your template using this structure:

      yourTemplateName: {
        fn: (args: MbscResource | MbscCalendarEventData - or your own specific type ) => (
          <div>Your custom template</div>
        ),
        code: {
          tsx: // TSX code that will show in the code preview`.trim(),
          jsx: // JSX code, if applicable`.trim(),
          // You can add more keys: 'js', 'sfcjs', 'sfcts', 'template', 'html', etc.
        }
      }

  !!! IMPORTANT: The code in 'fn', 'tsx', 'jsx', etc. MUST be valid for that language.
  Supported languages: 'TSX', 'JSX', 'JS', 'SFCJS', 'SFCTS', 'SFC TS', 'SFC JS', 'TEMPLATE', 'HTML'.
  See all available language keys in './reactTemplates'.

  !!! IMPORTANT: For types, use Mobiscroll types like 'MbscResource', 'MbscCalendarEventData', etc., or your own.
  **Avoid using 'MbscResource' as the type.**

* STEP 2: Finalize in ConfigurationsSelector.tsx
  Once you've created the new template in 'export const templates',
  go to './ConfigurationsSelector.tsx' and follow the instructions at the top of the file
  (look for the comment "Finalizing new template add").

*/



export const templates = {
  renderAgenda: {
    fn: (agenda: MbscResource) => (
      <div>{agenda.label || 'Agenda'}</div>
    ),
    code: {
      tsx: `
const renderAgenda = useCallback((agenda) => (
  <div>{agenda.label || 'Agenda'}</div>
), []);
      `.trim(),
      jsx: `
const renderAgenda = (agenda) => (
  <div>{agenda.label || 'Agenda'}</div>
)
      `.trim(),
      sfcjs: `
<template #renderAgenda="agenda">
  <div>{{ agenda.label || 'Agenda' }}</div>
</template>
      `.trim(),
      sfcts: `
<template #renderAgenda="agenda">
  <div>{{ agenda.label || 'Agenda' }}</div>
</template>
      `.trim(),
      template: `
<ng-template #renderAgenda let-agenda>
  <div>{{ agenda.label || 'Agenda' }}</div>
</ng-template>
      `.trim(),
    }
  },
  renderResource: {
    fn: (resource: MbscResource) => (
      <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
        <span className="font-semibold text-blue-800">{resource.name}</span>
        <span className="text-xs text-blue-400">Resource ID: {resource.id}</span>
        <span className="text-xs text-blue-400 italic mt-1">
          This is a test template to check rendering.
        </span>
      </div>
    ),
    code: {
      tsx: `
const renderResource = useCallback((resource: MbscResource) => (
  <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span className="font-semibold text-blue-800">{resource.name}</span>
    <span className="text-xs text-blue-400">Resource ID: {resource.id}</span>
    <span className="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
), []);
`.trim(),
      jsx: `
const renderResource = (resource) => (
  <div className="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span className="font-semibold text-blue-800">{resource.name}</span>
    <span className="text-xs text-blue-400">Resource ID: {resource.id}</span>
    <span className="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
)
`.trim(),
      sfcjs: `
<template #renderResource="resource">
  <div class="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span class="font-semibold text-blue-800">{{ resource.name }}</span>
    <span class="text-xs text-blue-400">Resource ID: {{ resource.id }}</span>
    <span class="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
</template>
`.trim(),
      sfcts: `
<template #renderResource="resource">
  <div class="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span class="font-semibold text-blue-800">{{ resource.name }}</span>
    <span class="text-xs text-blue-400">Resource ID: {{ resource.id }}</span>
    <span class="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
</template>
`.trim(),
      template: `
<ng-template #renderResource let-resource>
  <div class="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span class="font-semibold text-blue-800">{{ resource.name }}</span>
    <span class="text-xs text-blue-400">Resource ID: {{ resource.id }}</span>
    <span class="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
</ng-template>
`.trim(),
    },
  },
  resourceAvatarTemplate: {
    fn: (resource: MbscResource) => (
      <div className="flex items-center gap-3 p-1">
        {resource.img && (
          <Image
            src={resource.img}
            alt={resource.name || ''}
            width={32}
            height={32}
            className="rounded-full w-8 h-8 object-cover border border-blue-200"
          />
        )}
        <div>
          <div className="font-semibold">{resource.name}</div>
          {resource.description && (
            <div className="text-xs text-gray-500">{resource.description}</div>
          )}
        </div>
      </div>
    ),
    code: {
      tsx: `
const resourceAvatarTemplate = useCallback((resource: MbscResource) => (
  <div className="flex items-center gap-3 p-1">
    {resource.img && (
      <img
        src={resource.img}
        alt={resource.name}
        className="rounded-full w-8 h-8 object-cover border border-blue-200"
      />
    )}
    <div>
      <div className="font-semibold">{resource.name}</div>
      {resource.description && (
        <div className="text-xs text-gray-500">{resource.description}</div>
      )}
    </div>
  </div>
), []);
`.trim(),
      jsx: `
const resourceAvatarTemplate = (resource) => (
  <div className="flex items-center gap-3 p-1">
    {resource.img && (
      <img
        src={resource.img}
        alt={resource.name}
        className="rounded-full w-8 h-8 object-cover border border-blue-200"
      />
    )}
    <div>
      <div className="font-semibold">{resource.name}</div>
      {resource.description && (
        <div className="text-xs text-gray-500">{resource.description}</div>
      )}
    </div>
  </div>
)
`.trim(),
      vue: `
const resourceAvatarTemplate = (resource) => {
  return (
    <div class="flex items-center gap-3 p-1">
      <img
        v-if="resource.img"
        :src="resource.img"
        :alt="resource.name"
        class="rounded-full w-8 h-8 object-cover border border-blue-200"
      />
      <div>
        <div class="font-semibold">{resource.name}</div>
        <div v-if="resource.description" class="text-xs text-gray-500">
          {resource.description}
        </div>
      </div>
    </div>
  );
}
`.trim(),
    },
  },
  eventTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const eventTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const eventTemplate = ('event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const eventTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderEventTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderEventTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderEventTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderEventTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderEvent: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderEvent = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderEvent = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderEvent = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderLabelContent: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderLabelContent = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderLabelContent = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderLabelContent = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  scheduleEventContentTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const scheduleEventContentTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const scheduleEventContentTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const scheduleEventContentTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderItemTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderItemTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderItemTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderItemTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderSlotTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderSlotTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderSlotTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderSlotTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  renderHeaderTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const renderHeaderTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const renderHeaderTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const renderHeaderTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  taskResourceTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const taskResourceTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const taskResourceTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const taskResourceTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },
  taskHeaderTemplate: {
    fn: (event: MbscCalendarEventData) => (
      <div className="flex flex-col p-2">
        <span className="font-semibold text-blue-800">{event.title}</span>
        <span className="text-xs text-gray-500">
          {event.allDay ? event.allDay : `${event.start} - ${event.end}`}
        </span>
        {event.isMultiDay && (
          <span className="text-xs text-blue-400">
            {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
          </span>
        )}
        {event.original?.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const taskHeaderTemplate = useCallback((event: MbscCalendarEventData) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const taskHeaderTemplate = (event) => (
  <div className="flex flex-col p-2">
    <span className="font-semibold text-blue-800">{event.title}</span>
    <span className="text-xs text-gray-500">
      {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
    </span>
    {event.isMultiDay && (
      <span className="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
    )}
    {event.original?.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.original.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const taskHeaderTemplate = (event) => {
  return (
    <div class="flex flex-col p-2">
      <span class="font-semibold text-blue-800">{event.title}</span>
      <span class="text-xs text-gray-500">
        {event.allDay ? event.allDay : \`\${event.start} - \${event.end}\`}
      </span>
      <span v-if="event.isMultiDay" class="text-xs text-blue-400">
        {event.lastDay ? 'Last day of multi-day event' : 'Multi-day event'}
      </span>
      <span v-if="event.original?.tooltip" class="text-xs text-blue-400 italic">
        {event.original.tooltip}
      </span>
    </div>
  );
}
`.trim(),
    },
  },

  renderAgendaEmpty: {
    fn: () => (
      <div>No agenda events.</div>
    ),
    code: {
      tsx: `
const renderAgendaEmpty = useCallback(() => (
  <div>No agenda events.</div>
), []);
      `.trim(),
      jsx: `
const renderAgendaEmpty = () => (
  <div>No agenda events.</div>
)
      `.trim(),
      sfcjs: `
<template #renderAgendaEmpty>
  <div>No agenda events.</div>
</template>
      `.trim(),
      sfcts: `
<template #renderAgendaEmpty>
  <div>No agenda events.</div>
</template>
      `.trim(),
      template: `
<ng-template #renderAgendaEmpty>
  <div>No agenda events.</div>
</ng-template>
      `.trim(),
    }
  },
  renderDay: {
    fn: (day: MbscResource) => (
      <div>{day.day}</div>
    ),
    code: {
      tsx: `
const renderDay = useCallback((day) => (
  <div>{day.day}</div>
), []);
      `.trim(),
      jsx: `
const renderDay = (day) => (
  <div>{day.day}</div>
)
      `.trim(),
      sfcjs: `
<template #renderDay="day">
  <div>{{ day.day }}</div>
</template>
      `.trim(),
      sfcts: `
<template #renderDay="day">
  <div>{{ day.day }}</div>
</template>
      `.trim(),
      template: `
<ng-template #renderDay let-day>
  <div>{{ day.day }}</div>
</ng-template>
      `.trim(),
    }
  },
  renderBufferAfter: {
    fn: () => (<div>Buffer after</div>),
    code: {
      tsx: `
const renderBufferAfter = useCallback(() => (
  <div>Buffer after</div>
), []);
    `.trim(),
      jsx: `
const renderBufferAfter = () => (
  <div>Buffer after</div>
)
    `.trim(),
      sfcjs: `
<template #renderBufferAfter>
  <div>Buffer after</div>
</template>
    `.trim(),
      sfcts: `
<template #renderBufferAfter>
  <div>Buffer after</div>
</template>
    `.trim(),
      template: `
<ng-template #renderBufferAfter>
  <div>Buffer after</div>
</ng-template>
    `.trim(),
    }
  },
  renderBufferBefore: {
    fn: () => (<div>Buffer before</div>),
    code: {
      tsx: `
const renderBufferBefore = useCallback(() => (
  <div>Buffer before</div>
), []);
    `.trim(),
      jsx: `
const renderBufferBefore = () => (
  <div>Buffer before</div>
)
    `.trim(),
      sfcjs: `
<template #renderBufferBefore>
  <div>Buffer before</div>
</template>
    `.trim(),
      sfcts: `
<template #renderBufferBefore>
  <div>Buffer before</div>
</template>
    `.trim(),
      template: `
<ng-template #renderBufferBefore>
  <div>Buffer before</div>
</ng-template>
    `.trim(),
    }
  },
  renderDayContent: {
    fn: (day: MbscResource) => (<div>{day.label || 'Day'}</div>),
    code: {
      tsx: `
const renderDayContent = useCallback((day) => (
  <div>{day.label || 'Day'}</div>
), []);
    `.trim(),
      jsx: `
const renderDayContent = (day) => (
  <div>{day.label || 'Day'}</div>
)
    `.trim(),
      sfcjs: `
<template #renderDayContent="day">
  <div>{{ day.label || 'Day' }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderDayContent="day">
  <div>{{ day.label || 'Day' }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderDayContent let-day>
  <div>{{ day.label || 'Day' }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderDayFooter: {
    fn: () => (<div>Day footer</div>),
    code: {
      tsx: `
const renderDayFooter = useCallback(() => (
  <div>Day footer</div>
), []);
    `.trim(),
      jsx: `
const renderDayFooter = () => (
  <div>Day footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderDayFooter>
  <div>Day footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderDayFooter>
  <div>Day footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderDayFooter>
  <div>Day footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderEventContent: {
    fn: (event: MbscResource) => (<div>{event.title}</div>),
    code: {
      tsx: `
const renderEventContent = useCallback((event) => (
  <div>{event.title}</div>
), []);
    `.trim(),
      jsx: `
const renderEventContent = (event) => (
  <div>{event.title}</div>
)
    `.trim(),
      sfcjs: `
<template #renderEventContent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderEventContent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderEventContent let-event>
  <div>{{ event.title }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderHeader: {
    fn: (header: MbscResource) => (<div>{header.label || 'Header'}</div>),
    code: {
      tsx: `
const renderHeader = useCallback((header) => (
  <div>{header.label || 'Header'}</div>
), []);
    `.trim(),
      jsx: `
const renderHeader = (header) => (
  <div>{header.label || 'Header'}</div>
)
    `.trim(),
      sfcjs: `
<template #renderHeader="header">
  <div>{{ header.label || 'Header' }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderHeader="header">
  <div>{{ header.label || 'Header' }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderHeader let-header>
  <div>{{ header.label || 'Header' }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderHour: {
    fn: (hour: MbscResource) => (<div>{hour.label || hour.hour}</div>),
    code: {
      tsx: `
const renderHour = useCallback((hour) => (
  <div>{hour.label || hour.hour}</div>
), []);
    `.trim(),
      jsx: `
const renderHour = (hour) => (
  <div>{hour.label || hour.hour}</div>
)
    `.trim(),
      sfcjs: `
<template #renderHour="hour">
  <div>{{ hour.label || hour.hour }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderHour="hour">
  <div>{{ hour.label || hour.hour }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderHour let-hour>
  <div>{{ hour.label || hour.hour }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderHourFooter: {
    fn: () => (<div>Hour footer</div>),
    code: {
      tsx: `
const renderHourFooter = useCallback(() => (
  <div>Hour footer</div>
), []);
    `.trim(),
      jsx: `
const renderHourFooter = () => (
  <div>Hour footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderHourFooter>
  <div>Hour footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderHourFooter>
  <div>Hour footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderHourFooter>
  <div>Hour footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderLabel: {
    fn: (label: MbscResource) => (<div>{label.label}</div>),
    code: {
      tsx: `
const renderLabel = useCallback((label) => (
  <div>{label.label}</div>
), []);
    `.trim(),
      jsx: `
const renderLabel = (label) => (
  <div>{label.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderLabel="label">
  <div>{{ label.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderLabel="label">
  <div>{{ label.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderLabel let-label>
  <div>{{ label.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderMonth: {
    fn: (month: MbscResource) => (<div>{month.label}</div>),
    code: {
      tsx: `
const renderMonth = useCallback((month) => (
  <div>{month.label}</div>
), []);
    `.trim(),
      jsx: `
const renderMonth = (month) => (
  <div>{month.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderMonth="month">
  <div>{{ month.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderMonth="month">
  <div>{{ month.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderMonth let-month>
  <div>{{ month.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderMonthFooter: {
    fn: () => (<div>Month footer</div>),
    code: {
      tsx: `
const renderMonthFooter = useCallback(() => (
  <div>Month footer</div>
), []);
    `.trim(),
      jsx: `
const renderMonthFooter = () => (
  <div>Month footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderMonthFooter>
  <div>Month footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderMonthFooter>
  <div>Month footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderMonthFooter>
  <div>Month footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderQuarter: {
    fn: (quarter: MbscResource) => (<div>{quarter.label}</div>),
    code: {
      tsx: `
const renderQuarter = useCallback((quarter) => (
  <div>{quarter.label}</div>
), []);
    `.trim(),
      jsx: `
const renderQuarter = (quarter) => (
  <div>{quarter.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderQuarter="quarter">
  <div>{{ quarter.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderQuarter="quarter">
  <div>{{ quarter.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderQuarter let-quarter>
  <div>{{ quarter.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderQuarterFooter: {
    fn: () => (<div>Quarter footer</div>),
    code: {
      tsx: `
const renderQuarterFooter = useCallback(() => (
  <div>Quarter footer</div>
), []);
    `.trim(),
      jsx: `
const renderQuarterFooter = () => (
  <div>Quarter footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderQuarterFooter>
  <div>Quarter footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderQuarterFooter>
  <div>Quarter footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderQuarterFooter>
  <div>Quarter footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderResourceEmpty: {
    fn: () => (<div>No resources.</div>),
    code: {
      tsx: `
const renderResourceEmpty = useCallback(() => (
  <div>No resources.</div>
), []);
    `.trim(),
      jsx: `
const renderResourceEmpty = () => (
  <div>No resources.</div>
)
    `.trim(),
      sfcjs: `
<template #renderResourceEmpty>
  <div>No resources.</div>
</template>
    `.trim(),
      sfcts: `
<template #renderResourceEmpty>
  <div>No resources.</div>
</template>
    `.trim(),
      template: `
<ng-template #renderResourceEmpty>
  <div>No resources.</div>
</ng-template>
    `.trim(),
    }
  },
  renderResourceFooter: {
    fn: () => (<div>Resource footer</div>),
    code: {
      tsx: `
const renderResourceFooter = useCallback(() => (
  <div>Resource footer</div>
), []);
    `.trim(),
      jsx: `
const renderResourceFooter = () => (
  <div>Resource footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderResourceFooter>
  <div>Resource footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderResourceFooter>
  <div>Resource footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderResourceFooter>
  <div>Resource footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderResourceHeader: {
    fn: () => (<div>Resource header</div>),
    code: {
      tsx: `
const renderResourceHeader = useCallback(() => (
  <div>Resource header</div>
), []);
    `.trim(),
      jsx: `
const renderResourceHeader = () => (
  <div>Resource header</div>
)
    `.trim(),
      sfcjs: `
<template #renderResourceHeader>
  <div>Resource header</div>
</template>
    `.trim(),
      sfcts: `
<template #renderResourceHeader>
  <div>Resource header</div>
</template>
    `.trim(),
      template: `
<ng-template #renderResourceHeader>
  <div>Resource header</div>
</ng-template>
    `.trim(),
    }
  },
  renderScheduleEvent: {
    fn: (event: MbscResource) => (<div>{event.title}</div>),
    code: {
      tsx: `
const renderScheduleEvent = useCallback((event) => (
  <div>{event.title}</div>
), []);
    `.trim(),
      jsx: `
const renderScheduleEvent = (event) => (
  <div>{event.title}</div>
)
    `.trim(),
      sfcjs: `
<template #renderScheduleEvent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderScheduleEvent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderScheduleEvent let-event>
  <div>{{ event.title }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderScheduleEventContent: {
    fn: (event: MbscResource) => (<div>{event.title}</div>),
    code: {
      tsx: `
const renderScheduleEventContent = useCallback((event) => (
  <div>{event.title}</div>
), []);
    `.trim(),
      jsx: `
const renderScheduleEventContent = (event) => (
  <div>{event.title}</div>
)
    `.trim(),
      sfcjs: `
<template #renderScheduleEventContent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderScheduleEventContent="event">
  <div>{{ event.title }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderScheduleEventContent let-event>
  <div>{{ event.title }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderSidebar: {
    fn: () => (<div>Sidebar</div>),
    code: {
      tsx: `
const renderSidebar = useCallback(() => (
  <div>Sidebar</div>
), []);
    `.trim(),
      jsx: `
const renderSidebar = () => (
  <div>Sidebar</div>
)
    `.trim(),
      sfcjs: `
<template #renderSidebar>
  <div>Sidebar</div>
</template>
    `.trim(),
      sfcts: `
<template #renderSidebar>
  <div>Sidebar</div>
</template>
    `.trim(),
      template: `
<ng-template #renderSidebar>
  <div>Sidebar</div>
</ng-template>
    `.trim(),
    }
  },
  renderSidebarFooter: {
    fn: () => (<div>Sidebar footer</div>),
    code: {
      tsx: `
const renderSidebarFooter = useCallback(() => (
  <div>Sidebar footer</div>
), []);
    `.trim(),
      jsx: `
const renderSidebarFooter = () => (
  <div>Sidebar footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderSidebarFooter>
  <div>Sidebar footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderSidebarFooter>
  <div>Sidebar footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderSidebarFooter>
  <div>Sidebar footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderSidebarHeader: {
    fn: () => (<div>Sidebar header</div>),
    code: {
      tsx: `
const renderSidebarHeader = useCallback(() => (
  <div>Sidebar header</div>
), []);
    `.trim(),
      jsx: `
const renderSidebarHeader = () => (
  <div>Sidebar header</div>
)
    `.trim(),
      sfcjs: `
<template #renderSidebarHeader>
  <div>Sidebar header</div>
</template>
    `.trim(),
      sfcts: `
<template #renderSidebarHeader>
  <div>Sidebar header</div>
</template>
    `.trim(),
      template: `
<ng-template #renderSidebarHeader>
  <div>Sidebar header</div>
</ng-template>
    `.trim(),
    }
  },
  renderSlot: {
    fn: (slot: MbscResource) => (<div>{slot.label}</div>),
    code: {
      tsx: `
const renderSlot = useCallback((slot) => (
  <div>{slot.label}</div>
), []);
    `.trim(),
      jsx: `
const renderSlot = (slot) => (
  <div>{slot.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderSlot="slot">
  <div>{{ slot.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderSlot="slot">
  <div>{{ slot.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderSlot let-slot>
  <div>{{ slot.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderWeek: {
    fn: (week: MbscResource) => (<div>{week.label}</div>),
    code: {
      tsx: `
const renderWeek = useCallback((week) => (
  <div>{week.label}</div>
), []);
    `.trim(),
      jsx: `
const renderWeek = (week) => (
  <div>{week.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderWeek="week">
  <div>{{ week.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderWeek="week">
  <div>{{ week.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderWeek let-week>
  <div>{{ week.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderWeekFooter: {
    fn: () => (<div>Week footer</div>),
    code: {
      tsx: `
const renderWeekFooter = useCallback(() => (
  <div>Week footer</div>
), []);
    `.trim(),
      jsx: `
const renderWeekFooter = () => (
  <div>Week footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderWeekFooter>
  <div>Week footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderWeekFooter>
  <div>Week footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderWeekFooter>
  <div>Week footer</div>
</ng-template>
    `.trim(),
    }
  },
  renderYear: {
    fn: (year: MbscResource) => (<div>{year.label}</div>),
    code: {
      tsx: `
const renderYear = useCallback((year) => (
  <div>{year.label}</div>
), []);
    `.trim(),
      jsx: `
const renderYear = (year) => (
  <div>{year.label}</div>
)
    `.trim(),
      sfcjs: `
<template #renderYear="year">
  <div>{{ year.label }}</div>
</template>
    `.trim(),
      sfcts: `
<template #renderYear="year">
  <div>{{ year.label }}</div>
</template>
    `.trim(),
      template: `
<ng-template #renderYear let-year>
  <div>{{ year.label }}</div>
</ng-template>
    `.trim(),
    }
  },
  renderYearFooter: {
    fn: () => (<div>Year footer</div>),
    code: {
      tsx: `
const renderYearFooter = useCallback(() => (
  <div>Year footer</div>
), []);
    `.trim(),
      jsx: `
const renderYearFooter = () => (
  <div>Year footer</div>
)
    `.trim(),
      sfcjs: `
<template #renderYearFooter>
  <div>Year footer</div>
</template>
    `.trim(),
      sfcts: `
<template #renderYearFooter>
  <div>Year footer</div>
</template>
    `.trim(),
      template: `
<ng-template #renderYearFooter>
  <div>Year footer</div>
</ng-template>
    `.trim(),
    }
  },

};

export const templateCodes = Object.fromEntries(
  Object.entries(templates).map(([k, v]) => [k, v.fn])
);

export type Lang = 'TSX' | 'JSX' | 'JS' | 'SFCJS' | 'SFCTS' | 'SFC TS' | 'SFC JS' | 'TEMPLATE' | 'HTML' | 'JS';

export const templateStrs = (lang: Lang = 'TSX') =>
  Object.fromEntries(
    Object.entries(templates).map(([k, v]) => {
      const key = lang.replace(/\s+/g, '').toLowerCase();
      return [k, v.code[key as keyof typeof v.code]];
    })
  );