'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import FrameworkSection from './FrameworkSection'
import { Group, Component, Framework, Preset, Config, User, GroupedSettings } from './types'
import { LivePreview } from '@/components/LivePreview'
import { CodePreview } from '@/components/CodePreview'
import { ConfigurationsSelector } from '@/components/ConfigurationSelector'
import { filterInvalidProps, genCodeWithTopVars } from '@/utils/genPropsToString'
import { templateStrs, Lang } from '@/components/reactTemplates'
import { toVueEventName, hookStrs } from '@/components/reactHooks'
import { MbscEventcalendarView } from "@mobiscroll/react";


export type CodeSnippet = {
  label: 'TSX' | 'JSX' | 'jquery' | 'vue' | 'react' | 'Component' | 'Template' | 'SFC JS' | 'SFC TS' | 'HTML' | 'JS';
  code: string;
};

export const exampleSnippets: CodeSnippet[] = [
  {
    label: 'TSX',
    code: `
import React from 'react';

export default function HelloWorld() {
  return <div>Hello, world!</div>;
}
`.trim(),
  }
];


export default function ConfiguratorClient({
  groups,
  components,
  frameworks,
  filteredPresets,
  selectedGroup,
  selectedComponent,
  selectedFramework,
  settings,
  config,
  user,
  configProps
}: {
  groups: Group[]
  components: Component[]
  frameworks: Framework[]
  filteredPresets: Preset[]
  selectedGroup: string | null
  selectedComponent: string | null
  selectedFramework: string | null
  settings: GroupedSettings
  config: Config
  user: User | null
  configProps: Record<string, string | number | boolean | null | undefined | MbscEventcalendarView>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [frameworkObj, setFrameworkObj] = useState<Framework | null>(null)
  const [groupObj, setGroupObj] = useState<Group | null>(null)
  const [currentConfig, setCurrentConfig] = useState<Config | null>(null)
  const [code, setCode] = useState<CodeSnippet[]>(exampleSnippets)
  const [props, setProps] = useState<Record<string, string | number | boolean | null | MbscEventcalendarView>>({})
  const [data, setData] = useState<Record<string, string>>({})
  const [template, setTemplate] = useState<Record<string, string>>({})
  const [hooks, setHooks] = useState<Record<string, string>>({})

  const selectedPreset = searchParams.get('preset') || null
  const isLoading = !(currentConfig && frameworkObj && groupObj && code)

  const mergeConfigProps = (
    configProps: Record<string, string | number | boolean | null | undefined | MbscEventcalendarView>,
    config: Config,
    settings: GroupedSettings,
    templates: Record<string, string>
  ) => {
    const mergedProps: Record<string, string | number | boolean | null | MbscEventcalendarView> = {
      ...config.config.props,
    };

    const settingKeys = Object.values(settings)
      .flatMap(group => Object.keys(group));

    Object.keys(configProps).forEach(key => {
      if (
        key !== 'view' &&
        key !== 'template' &&
        settingKeys.includes(key)
      ) {
        if (templates && Object.prototype.hasOwnProperty.call(templates, key)) {
          console.log(`[mergeConfigProps] Skipping key "${key}" because it exists in templates. Value:`, configProps[key]);
          delete mergedProps[key];
          return;
        }

        const val = configProps[key];
        if (val === 'true') {
          mergedProps[key] = true;
        } else if (val === 'false') {
          mergedProps[key] = false;
        } else if (val !== undefined) {
          mergedProps[key] = val;
        }
      }
    });

    console.log('[mergeConfigProps] Final mergedProps:', mergedProps);

    return mergedProps;
  };




  function updateSelections(updates: Record<string, string | null>) {
    const newQuery = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newQuery.set(key, value)
      } else {
        newQuery.delete(key)
      }
    })
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  const updateSelection = (key: string, value: string | null) => {
    const newQuery = new URLSearchParams(searchParams.toString());

    if (value) {
      newQuery.set(key, value);
      router.push(`${pathname}?${newQuery.toString()}`, { scroll: false });
    } else {
      if (key === 'group') {
        router.push('/configurator', { scroll: false });
        return;
      }

      newQuery.delete(key);

      let keepKeys: Set<string> | null = null;

      if (key === 'component') {
        keepKeys = new Set(['group']);
      } else if (key === 'preset') {
        keepKeys = new Set(['group', 'component']);
      }

      if (keepKeys) {
        Array.from(newQuery.keys()).forEach(paramKey => {
          if (!keepKeys!.has(paramKey)) {
            newQuery.delete(paramKey);
          }
        });
      }

      router.push(`${pathname}?${newQuery.toString()}`, { scroll: false });
    }
  };


  useEffect(() => {
    if (selectedFramework) {
      const framework = frameworks.find(f => f.slug === selectedFramework)
      setFrameworkObj(framework || null)
      if (framework && framework.templates) {
        const tsxTemplate = framework.templates.find(t => t.label === 'TSX')?.template || '';
        setCode(tsxTemplate ? [{ label: 'TSX', code: tsxTemplate }] : exampleSnippets);
      } else {
        setCode(exampleSnippets)
      }
    } else {
      setFrameworkObj(null)
    }
  }, [selectedFramework, frameworks])

  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find(g => g.slug === selectedGroup)
      if (!group) {
        console.error('Group not found:', selectedGroup)
        return
      }
      setGroupObj(group || null)
    } else {
      setGroupObj(null)
    }
  }, [selectedGroup, groups])

  useEffect(() => {
    if (selectedPreset && config?.preset?.slug === selectedPreset) {
      const mergedProps: Record<string, string | number | boolean | null | MbscEventcalendarView> = {};
      const templateProps: Record<string, string> = {};
      const hookProps: Record<string, string> = {};


      Object.entries(settings).forEach(([groupName, groupSettings]) => {
        Object.entries(groupSettings).forEach(([key, setting]) => {
          if (groupName === 'Renders' && configProps[key] !== undefined) {
            templateProps[key] = String(configProps[key]);
          } else if (groupName === 'Events' && configProps[key] !== undefined) {
            hookProps[key] = String(configProps[key]);
          } else if (groupName !== 'Renders' && groupName !== 'Events' && configProps[key] !== undefined) {

            const val = configProps[key];
            if (val === 'true') {
              mergedProps[key] = true;
            } else if (val === 'false') {
              mergedProps[key] = false;
            } else if (val !== undefined) {
              mergedProps[key] = val;
            }
          }
        });
      });


      const finalMergedProps = { ...config.config.props, ...mergedProps };


      setProps(filterInvalidProps(finalMergedProps));
      setCurrentConfig({ ...config, config: { ...config.config, props: finalMergedProps } });
      setTemplate({ ...config.config.templates, ...templateProps });
      setHooks({ ...config.config.hooks, ...hookProps });
    } else {
      setCurrentConfig(null);
      setProps({});
      setTemplate({});
      setHooks({});
    }
  }, [selectedPreset, config, configProps, settings]);

  useEffect(() => {
    if (frameworkObj && currentConfig) {
      const {
        templateInlineProps,
        extractedValues,
        extractedInlineValues,
        componentName: effectiveComponentName,
      } = genCodeWithTopVars(
        frameworkObj.slug,
        currentConfig.config.component || '',
        props,
        currentConfig.config.data,
        template

      )

      function isFilled(val: string | object | null) {
        if (Array.isArray(val)) return val.length > 0
        if (typeof val === 'object' && val !== null) return Object.keys(val).length > 0
        if (typeof val === 'string') return val.length > 0
        if (val === undefined || val === null) return false
        return true
      }

      const eventData = extractedValues.data ?? []
      const view = extractedValues.view ?? []
      const resources = extractedValues.resources ?? []
      const invalid = extractedValues.invalid ?? []
      const colors = extractedValues.colors ?? []

      const inlineData = extractedInlineValues.data ?? []
      const inlineResources = extractedInlineValues.resources ?? []
      const inlineInvalid = extractedInlineValues.invalid ?? []
      const inlineColors = extractedInlineValues.colors ?? []

      function getComponentTemplateProps(templates: Record<string, string>): string {
        if (!templates) return '';
        if (frameworkObj?.slug === 'angular') {
          return Object.entries(templates)
            .map(([prop, fnName]) => `[${prop}]="${fnName}"`)
            .join('\n  ');
        } else if (frameworkObj?.slug === 'javascript' || frameworkObj?.slug === 'jquery') {
          return Object.entries(templates)
            .map(([prop, fnName]) => `${prop}:${fnName}`)
            .join('\n  ');
        }

        return Object.entries(templates)
          .map(([prop, fnName]) => `${prop}={${fnName}}`)
          .join('\n  ')
      }

      function getComponentHookProps(hooks: Record<string, string>): string {
        if (!hooks) return ''
        if (frameworkObj?.slug === 'vue') {
          return Object.entries(hooks)
            .map(([prop, fnName]) => `@${toVueEventName(prop)}="${fnName}"`)
            .join('\n  ');
        }
        else if (frameworkObj?.slug === 'javascript' || frameworkObj?.slug === 'jquery') {
          return Object.entries(hooks)
            .map(([prop, fnName]) => `${prop}:${fnName}`)
            .join('\n  ');
        } else if (frameworkObj?.slug === 'angular') {
          return Object.entries(hooks)
            .map(([prop, fnName]) => `(${prop})="${fnName}()"`)
            .join('\n  ');
        }
        return Object.entries(hooks)
          .map(([prop, fnName]) => `${prop}={${fnName}}`)
          .join('\n  ')
      }

      function formatFrameworkProp(key: string, varName: string): string {
        switch (frameworkObj?.slug) {
          case 'react':
            return `${key}={${varName}}`
          case 'vue':
            return `:${key}="${varName}"`
          case 'angular':
            return `[${key}]="${varName}"`
          case 'jquery':
            return `${key}: ${varName},`
          default:
            return `${key}: ${varName},`
        }
      }

      function toUnquotedObjectString(
        data: string | number | boolean | undefined | null | Record<string, string>,
        indentLevel = 2
      ): string {
        if (data === undefined) return 'undefined';
        if (data === null) return 'null';
        if (typeof data === 'string') return `"${data}"`;
        if (typeof data === 'number' || typeof data === 'boolean') return String(data);

        const indent = ' '.repeat(indentLevel * 2);

        if (Array.isArray(data)) {
          if (!data.length) return '[]';
          return '[\n' +
            data
              .map(item => indent + toUnquotedObjectString(item, indentLevel + 1))
              .join(',\n') +
            '\n' + ' '.repeat((indentLevel - 1) * 2) + ']';
        }

        if (typeof data === 'object') {
          const entries = Object.entries(data).map(
            ([key, value]) =>
              `${indent}${key}: ${toUnquotedObjectString(value, indentLevel + 1)}`
          );
          return '{\n' + entries.join(',\n') + '\n' + ' '.repeat((indentLevel - 1) * 2) + '}';
        }

        return String(data);
      }

      const componentTemplateProps = getComponentTemplateProps(template)
      const componentHookProps = getComponentHookProps(currentConfig.config.hooks)

      function getTemplateStrBlock(templates: Record<string, string>, lang = 'tsx') {
        if (!templates) return ''
        return Object.values(templates)
          .map((fnName) => {
            return templateStrs(lang as Lang)?.[fnName] || '';
          })
          .filter(Boolean)
          .join('\n\n')
      }


      function getHooksStrBlock(hooks: Record<string, string>, lang = 'tsx') {
        if (!hooks) return ''
        return Object.values(hooks)
          .map((fnName) => hookStrs(lang as Lang)?.[fnName] || '')
          .filter(Boolean)
          .join('\n\n')
      }

      const typeImports = currentConfig.config.types || [];
      const reactHookImports = currentConfig.config.reactHooks || [];
      setData(currentConfig.config.data)
      setHooks(currentConfig.config.hooks)

      const hasData = isFilled(eventData)
      const hasResources = isFilled(resources)
      const hasInvalid = isFilled(invalid)
      const hasColors = isFilled(colors)

      const hasInlineData = hasData && isFilled(inlineData)
      const hasInlineResources = hasResources && isFilled(inlineResources)
      const hasInlineInvalid = hasInvalid && isFilled(inlineInvalid)
      const hasInlineColors = hasColors && isFilled(inlineColors)

      const allowedLabels = [
        'TSX', 'JSX', 'jquery', 'vue', 'react', 'Component', 'Template', 'SFC JS', 'SFC TS', 'HTML', 'JS'
      ] as const;

      const codeObj = frameworkObj.templates
        .filter((t) => allowedLabels.includes(t.label as typeof allowedLabels[number]))
        .map((t) => ({
          label: t.label as CodeSnippet['label'],
          code: t.template
            .replace(/\/\* Component \*\//g, effectiveComponentName || '')
            .replace(
              /\/\* imports \*\//g,
              frameworkObj.slug === 'vue' ? "import { ref } from 'vue';\n" : ''
            )
            .replace(
              /\/\* type \*\//g,
              typeImports.length
                ? `${typeImports.join(', ')}`
                : ''
            )

            .replace(
              /\/\* react hooks \*\//g,
              reactHookImports.length
                ? `${reactHookImports.join(', ')}`
                : ''
            )

            .replace(
              /\/\* view \*\//g,
              isFilled(view)
                ? frameworkObj.slug === 'vue'
                  ? `const myView = ref(${toUnquotedObjectString(view, 2)});`
                  : `const myView = ${JSON.stringify(view, null, 2)};`
                : ''
            )
            .replace(
              /\/\* data \*\//g,
              hasData
                ? frameworkObj.slug === 'vue'
                  ? `const myData = ref(${toUnquotedObjectString(eventData, 2)});`
                  : `const myData = ${JSON.stringify(eventData, null, 2)};`
                : ''
            )
            .replace(
              /\/\* resources \*\//g,
              hasResources
                ? frameworkObj.slug === 'vue'
                  ? `const myResources = ref(${toUnquotedObjectString(resources, 2)});`
                  : `const myResources = ${JSON.stringify(resources, null, 2)};`
                : ''
            )
            .replace(
              /\/\* invalids \*\//g,
              hasInvalid
                ? frameworkObj.slug === 'vue'
                  ? `const myInvalid = ref(${toUnquotedObjectString(invalid, 2)});`
                  : `const myInvalid = ${JSON.stringify(invalid, null, 2)};`
                : ''
            )
            .replace(
              /\/\* colors \*\//g,
              hasColors
                ? frameworkObj.slug === 'vue'
                  ? `const myColors = ref(${toUnquotedObjectString(colors, 2)});`
                  : `const myColors = ${JSON.stringify(colors, null, 2)};`
                : ''
            )
            .replace(/\/\* templates \*\//g, '\n\n' + getTemplateStrBlock(template, t.label))
            .replace(/\/\* hooks \*\//g, '\n\n' + getHooksStrBlock(currentConfig.config.hooks, t.label))
            .replace(/\/\* Component data \*\//g, hasInlineData ? formatFrameworkProp('data', 'myData') : '')
            .replace(
              /\/\* Component resources \*\//g,
              hasInlineResources ? formatFrameworkProp('resources', 'myResources') : ''
            )
            .replace(/\/\* Component invalids \*\//g, hasInlineInvalid ? formatFrameworkProp('invalid', 'myInvalid') : '')
            .replace(/\/\* Component colors \*\//g, hasInlineColors ? formatFrameworkProp('colors', 'myColors') : '')
            .replace(/\/\* Component hooks \*\//g, componentHookProps)
            .replace(/\/\* Component templates \*\//g, componentTemplateProps)
            .replace(/\/\* Component options \*\//g, templateInlineProps)
            .replace(/\/\* \w+ \*\//g, '')
        }))

      setCode(codeObj)
    }
  }, [frameworkObj, currentConfig, props, template])


  const isScheduler =
    selectedComponent === 'scheduler' ||
    selectedComponent === 'timeline'

  const previewAreaClass = `w-full xl:w-[80%] gap-8 flex ${isScheduler ? 'flex-col-reverse ' : 'flex-col lg:flex-row'
    } gap-1 transition-all duration-500 ease-in-out`


  const handleTemplateChange = (newTemplates: Record<string, string>) => {
    setTemplate(newTemplates);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col xl:flex-row gap-6 items-start transition-all duration-500 ease-in-out">
        <div className="w-full lg:w-[20%] mg:w-[5%] xl:sticky xl:top-3 self-start">
          <ConfigurationsSelector
            configurations={{
              ...props,
              ...template
            }}
            onChange={setProps}
            templates={template}
            onTemplateChange={handleTemplateChange}
            selected={props}

            groups={groups}
            components={components}
            filteredPresets={filteredPresets}
            selectedGroup={selectedGroup}
            selectedComponent={selectedComponent}
            selectedPreset={selectedPreset}
            updateSelection={updateSelection}
            updateSelections={updateSelections}
            settings={settings}
            config={currentConfig}
            user={user}
          />
        </div>

        <div className={previewAreaClass}>
          <div className={`flex flex-col w-full overflow-auto max-w-full transition-all duration-500 ease-in-out`}>
            <>
              <FrameworkSection
                frameworks={frameworks}
                selectedFramework={selectedFramework}
                selectedComponent={selectedComponent}
                updateSelection={updateSelection}
              />
              {isLoading ? (
                <CodePreview fullCode={exampleSnippets} />
              ) : (
                <CodePreview fullCode={code} />
              )}
            </>
          </div>
          <div
            className={
              isScheduler
                ? 'w-full min-h-[700px] flex flex-col justify-center items-center p-0 m-0'
                : 'flex flex-col justify-center items-center max-w-[400px] w-full mx-auto lg:mx-0 min-h-[700px] sm:scale-[0.6] md:scale-[0.7] lg:scale-[1]'
            }
          >
            {isLoading ? (
              isScheduler ? (
                <div className="mockup-window bg-white border border-base-300 w-full rounded-mg min-h-[700px] max-h-[700px]">
                  {/* <Image alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp" layout="fill" objectFit="cover" /> */}

                </div>
              ) : (
                <div className="mockup-phone">
                  <div className="mockup-phone-camera z-50" />
                  <div className="mockup-phone-display">
                    {/* <Image alt="wallpaper" src="https://img.daisyui.com/images/stock/453966.webp" layout="fill" objectFit="cover" /> */}
                  </div>
                </div>
              )
            ) : (
              <div
                className={
                  isScheduler
                    ? 'w-full h-full'
                    : 'transform origin-top scale-100 md:scale-[1] lg:scale-[1] transition-transform duration-300'
                }
              >
                <LivePreview
                  componentName={groupObj?.slug}
                  mergedProps={props}
                  data={data}
                  template={template}
                  hooks={hooks}
                  isScheduler={isScheduler}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}