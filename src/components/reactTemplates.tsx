import React from 'react';

export const templates = {
  resourceTemplate: {
    fn: (resource: any) => (
      <div>
        {resource.name} - {resource.id} This is a test template this is long so I can see if it's working properly or not
      </div>
    ),
    code: {
      tsx: `
const resourceTemplate = useCallback((resource: any) => (
  <div>
    {resource.name} - {resource.id} This is a test template this is long so I can see if it's working properly or not
  </div>
), []);
`.trim(),
      jsx: `
const resourceTemplate = (resource) => (
  <div>
    {resource.name} - {resource.id} This is a test template this is long so I can see if it's working properly or not
  </div>
)
`.trim(),
      vue: `
const resourceTemplate = (resource) => {
  return (
    <div>
      {resource.name} - {resource.id} This is a test template this is long so I can see if it's working properly or not
    </div>
  );
}
`.trim()
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
};

export const templateCodes = Object.fromEntries(
  Object.entries(templates).map(([k, v]) => [k, v.fn])
);

type Lang = 'TSX' | 'JSX' | 'JS';

export const templateStrs = (lang: Lang = 'TSX') =>
  Object.fromEntries(
    Object.entries(templates).map(([k, v]) => [k, v.code[lang.toLowerCase() as keyof typeof v.code]])
  );
