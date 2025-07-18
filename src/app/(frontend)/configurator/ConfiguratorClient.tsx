'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import FrameworkSection from './FrameworkSection'
import { Group, Component, Framework, Preset, Config } from './types'
import { LivePreview } from '@/components/LivePreview'
import { CodePreview } from '@/components/CodePreview'
import { ConfigurationsSelector } from '@/components/ConfigurationSelector'
import { filterInvalidProps, genCodeWithTopVars } from '@/utils/genPropsToString'
import { templateStrs } from '@/components/reactTemplates'
import { toVueEventName, hookStrs } from '@/components/reactHooks'

const Skeleton = ({ className = "" }) => (
  <div className={`skeleton h-32 w-32 ${className}`}></div>
)

export default function ConfiguratorClient({
  groups,
  components,
  frameworks,
  filteredPresets,
  selectedGroup,
  selectedComponent,
  selectedFramework,
  configs,
}: {
  groups: Group[]
  components: Component[]
  frameworks: Framework[]
  filteredPresets: Preset[]
  selectedGroup: string | null
  selectedComponent: string | null
  selectedFramework: string | null
  configs: Config[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [frameworkObj, setFrameworkObj] = useState<Framework | null>(null)
  const [groupObj, setGroupObj] = useState<Group | null>(null)
  const [presetObj, setPresetObj] = useState<Preset | null>(null)
  const [currentConfig, setCurrentConfig] = useState<Config | null>(null)
  const [code, setCode] = useState<any>(null)
  const [language, setLanguage] = useState<any>(null)
  const [props, setProps] = useState<Record<string, any>>({})
  const [data, setData] = useState<Record<string, any>>({})
  const [template, setTemplate] = useState<Record<string, any>>({})
  const [hooks, setHooks] = useState<Record<string, any>>({})

  const selectedPreset = searchParams.get('preset') || null
  const addonConfigTitle = searchParams.get('addonconfigtitle') || null
  const isLoading = !(currentConfig && frameworkObj && groupObj && code)

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
    const newQuery = new URLSearchParams(searchParams.toString())
    if (value) {
      newQuery.set(key, value)
    } else {
      newQuery.delete(key)
    }

    if (key === 'group') {
      newQuery.delete('component')
      newQuery.delete('framework')
      newQuery.delete('preset')
      newQuery.delete('addonconfigtitle')
    } else if (key === 'component') {
      newQuery.delete('framework')
      newQuery.delete('preset')
      newQuery.delete('addonconfigtitle')
    } else if (key === 'preset') {
      newQuery.delete('addonconfigtitle') // Clear addonconfigtitle when preset changes
    }
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (selectedFramework) {
      const framework = frameworks.find(f => f.slug === selectedFramework)
      setFrameworkObj(framework || null)
      if (framework && framework.templates) {
        setCode({
          'App.tsx': framework.templates.find(t => t.label === 'TSX')?.template || '',
          'App.jsx': framework.templates.find(t => t.label === 'JSX')?.template || '',
        })
      } else {
        setCode(null)
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
    if (selectedPreset) {
      const preset = filteredPresets.find(p => p.slug === selectedPreset)
      // Find the first non-addon config
      const nonAddonConfig = configs.find(c => c.preset?.slug === selectedPreset && c.config.type !== 'addon') || null
      // Find the selected addon config based on addonconfigtitle
      const selectedAddonConfig = addonConfigTitle
        ? configs.find(c => c.preset?.slug === selectedPreset && c.config.type === 'addon' && c.config.title.replace(/\s+/g, '-') === addonConfigTitle)
        : null

      // Merge non-addon and selected addon config
      let mergedConfig: Config | null = null
      if (nonAddonConfig) {
        mergedConfig = { ...nonAddonConfig }
        if (selectedAddonConfig) {
          mergedConfig.config = {
            ...nonAddonConfig.config,
            props: {
              ...nonAddonConfig.config.props,
              ...selectedAddonConfig.config.props,
            },
            data: {
              ...nonAddonConfig.config.data,
              ...selectedAddonConfig.config.data,
            },
            hooks: {
              ...nonAddonConfig.config.hooks,
              ...selectedAddonConfig.config.hooks,
            },
            templates: {
              ...nonAddonConfig.config.templates,
              ...selectedAddonConfig.config.templates,
            },
          }
        }
      } else if (selectedAddonConfig) {
        mergedConfig = { ...selectedAddonConfig }
      }

      const filteredProps = filterInvalidProps(mergedConfig?.config.props || {})
      setProps(filteredProps)
      setPresetObj(preset || null)
      setCurrentConfig(mergedConfig)

      // Clear addonconfigtitle if no non-addon config exists
      if (!nonAddonConfig && addonConfigTitle) {
        const newQuery = new URLSearchParams(searchParams.toString())
        newQuery.delete('addonconfigtitle')
        router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
      }
    } else {
      setPresetObj(null)
      setCurrentConfig(null)
    }
  }, [selectedPreset, addonConfigTitle, filteredPresets, configs, router, pathname, searchParams])

  useEffect(() => {
    if (frameworkObj && currentConfig) {
      const {
        topVars,
        templateInlineProps,
        liveViewInlineProps,
        extractedValues,
        extractedInlineValues,
        componentName: effectiveComponentName,
      } = genCodeWithTopVars(
        frameworkObj.slug,
        currentConfig.config.component || '',
        props,
        currentConfig.config.data,
      )

      function isFilled(val: any) {
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

      function toUnquotedObjectString(data: any, indentLevel = 2): string {
        if (!data) return '[]'
        const indent = ' '.repeat(indentLevel * 2)
        if (Array.isArray(data)) {
          if (data.length === 0) return '[]'
          return `[\n${data
            .map((item) =>
              `${indent}  {\n${Object.entries(item)
                .map(([key, value]) => `${indent}    ${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
                .join(',\n')}\n${indent}  }`
            )
            .join(',\n')}\n${indent}]`
        }
        return JSON.stringify(data, null, 2)
      }

      const componentTemplateProps = getComponentTemplateProps(currentConfig.config.templates)
      const componentHookProps = getComponentHookProps(currentConfig.config.hooks)

      function getTemplateStrBlock(templates: Record<string, string>, lang = 'tsx') {
        if (!templates) return ''
        return Object.values(templates)
          .map((fnName) => {
            console.log('[getTemplateStrBlock] Mapping fnName:', fnName);
            return templateStrs(lang as any)?.[fnName] || '';
          })
          .filter(Boolean)
          .join('\n\n')
      }


      function getHooksStrBlock(hooks: Record<string, string>, lang = 'tsx') {
        if (!hooks) return ''
        return Object.values(hooks)
          .map((fnName) => hookStrs(lang as any)?.[fnName] || '')
          .filter(Boolean)
          .join('\n\n')
      }

      setData(currentConfig.config.data)
      setTemplate(currentConfig.config.templates)
      setHooks(currentConfig.config.hooks)

      const hasData = isFilled(eventData)
      const hasResources = isFilled(resources)
      const hasInvalid = isFilled(invalid)
      const hasColors = isFilled(colors)

      const hasInlineData = hasData && isFilled(inlineData)
      const hasInlineResources = hasResources && isFilled(inlineResources)
      const hasInlineInvalid = hasInvalid && isFilled(inlineInvalid)
      const hasInlineColors = hasColors && isFilled(inlineColors)

      const codeObj = frameworkObj.templates.map((t) => ({
        label: t.label,
        code: t.template
          .replace(/\/\* Component \*\//g, effectiveComponentName || '')
          .replace(
            /\/\* imports \*\//g,
            frameworkObj.slug === 'vue' ? "import { ref } from 'vue';\n" : ''
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
          .replace(/\/\* templates \*\//g, '\n\n' + getTemplateStrBlock(currentConfig.config.templates, t.label))
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

      const finalCode = codeObj.map((obj) => obj.code)
      const finalLanguage = codeObj.map((obj) => obj.label)

      setLanguage(finalLanguage)
      setCode(codeObj)
    }
  }, [frameworkObj, currentConfig, props])

  const selectComponent = (groupSlug: string, componentId: string) => {
    const newQuery = new URLSearchParams(searchParams.toString())
    newQuery.set('group', groupSlug)
    newQuery.set('component', componentId)
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  const isScheduler =
    selectedComponent === 'scheduler' ||
    selectedComponent === 'timeline'

  const previewAreaClass = `w-full xl:w-[80%] gap-8 flex ${isScheduler ? 'flex-col-reverse ' : 'flex-col lg:flex-row'
    } gap-1 transition-all duration-500 ease-in-out`

  return (
    <div className="w-full h-full">
      <div className="flex flex-col xl:flex-row gap-6 items-start transition-all duration-500 ease-in-out">
        <div className="w-full lg:w-[20%] mg:w-[5%] xl:sticky xl:top-3 self-start">
          <ConfigurationsSelector
            configurations={currentConfig?.config.props ?? {}}
            onChange={setProps}
            selected={props}
            groups={groups}
            components={components}
            filteredPresets={filteredPresets}
            selectedGroup={selectedGroup}
            selectedComponent={selectedComponent}
            selectedPreset={selectedPreset}
            updateSelection={updateSelection}
            updateSelections={updateSelections}
            configs={configs}
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
                <div className="skeleton min-h-[250px] h-full w-full flex flex-col items-center justify-center animate-pulse">
                  <p className="text-gray-500 text-lg italic text-center">
                    Select configuration in the left side panel
                  </p>
                </div>
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
              <div className="skeleton h-full w-full"></div>
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