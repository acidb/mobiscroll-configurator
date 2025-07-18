import React, { useCallback } from 'react';
import { MbscCalendarEventData, MbscResource } from '@mobiscroll/react';

export const templates = {
  resourceTemplate: {
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
const resourceTemplate = useCallback((resource: MbscResource) => (
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
const resourceTemplate = (resource) => (
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
<template #resourceTemplate="resource">
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
<template #resourceTemplate="resource">
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
<ng-template #resourceTemplate let-resource>
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
  renderLabelContentTemplate: {
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
const renderLabelContentTemplate = useCallback((event: MbscCalendarEventData) => (
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
const renderLabelContentTemplate = (event) => (
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
const renderLabelContentTemplate = (event) => {
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
};

export const templateCodes = Object.fromEntries(
  Object.entries(templates).map(([k, v]) => [k, v.fn])
);

type Lang = 'TSX' | 'JSX' | 'JS' | 'SFCJS' | 'SFCTS' | 'SFC TS' | 'SFC JS' | 'TEMPLATE';

export const templateStrs = (lang: Lang = 'TSX') =>
  Object.fromEntries(
    Object.entries(templates).map(([k, v]) => {
      const key = lang.replace(/\s+/g, '').toLowerCase();
      return [k, v.code[key as keyof typeof v.code]];
    })
  );