// This is the idea how the templates can be added 

import React from 'react';
import { MbscResource } from '@mobiscroll/react';

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
      template: `<ng-template #resourceTemplate let-resource>
  <div class="px-3 py-2 bg-blue-50 border-l-4 border-blue-600 rounded flex flex-col">
    <span class="font-semibold text-blue-800">{{ resource.name }}</span>
    <span class="text-xs text-blue-400">Resource ID: {{ resource.id }}</span>
    <span class="text-xs text-blue-400 italic mt-1">
      This is a test template to check rendering.
    </span>
  </div>
</ng-template>
      `.trim(),
    }
  },
  eventTemplate: {
    fn: (event: any) => (
      <div>{event.title}</div>
    ),
    code: {
      tsx: `
const eventTemplate = useCallback((event: any) => (
  <div>
    {event.title}
  </div>
), []);
`.trim(),
      jsx: `
const eventTemplate = (event) => (
  <div>
    {event.title}
  </div>
)
`.trim(),
      vue: `
const eventTemplate = (event) => {
  return (
    <div>
      {event.title}
    </div>
  );
}
`.trim()
    }
  },
  resourceAvatarTemplate: {
    fn: (resource: any) => (
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
const resourceAvatarTemplate = useCallback((resource: any) => (
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
`.trim()
    }
  },
  scheduleEventContentTemplate: {
    fn: (event: any) => (
      <div className="flex flex-col">
        <span className="font-semibold text-blue-800">
          {event.type === 'availability' ? 'Available' : event.type}
        </span>
        <span className="text-xs text-gray-500">
          {event.start} - {event.end}
        </span>
        {event.tooltip && (
          <span className="text-xs text-blue-400 italic">{event.tooltip}</span>
        )}
      </div>
    ),
    code: {
      tsx: `
const scheduleEventContentTemplate = useCallback((event: any) => (
  <div className="flex flex-col">
    <span className="font-semibold text-blue-800">
      {event.type === 'availability' ? 'Available' : event.type}
    </span>
    <span className="text-xs text-gray-500">
      {event.start} - {event.end}
    </span>
    {event.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.tooltip}</span>
    )}
  </div>
), []);
`.trim(),
      jsx: `
const scheduleEventContentTemplate = (event) => (
  <div className="flex flex-col">
    <span className="font-semibold text-blue-800">
      {event.type === 'availability' ? 'Available' : event.type}
    </span>
    <span className="text-xs text-gray-500">
      {event.start} - {event.end}
    </span>
    {event.tooltip && (
      <span className="text-xs text-blue-400 italic">{event.tooltip}</span>
    )}
  </div>
)
`.trim(),
      vue: `
const scheduleEventContentTemplate = (event) => {
  return (
    <div class="flex flex-col">
      <span class="font-semibold text-blue-800">
        {event.type === 'availability' ? 'Available' : event.type}
      </span>
      <span class="text-xs text-gray-500">
        {event.start} - {event.end}
      </span>
      <span v-if="event.tooltip" class="text-xs text-blue-400 italic">
        {event.tooltip}
      </span>
    </div>
  );
}
`.trim()
    }
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

