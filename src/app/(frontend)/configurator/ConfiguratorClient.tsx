'use client'

import React, { use, useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import GroupSection from './GroupSection'
import FrameworkSection from './FrameworkSection'
import PresetSection from './PresetSection'
import { Group, Component, Framework, Preset, Config } from './types'

import { LivePreview } from '@/components/LivePreview';
import { CodePreview } from '@/components/CodePreview';
import { ConfigurationsSelector } from '@/components/ConfigurationSelector';
import { filterInvalidProps, genCodeWithTopVars } from '@/utils/genPropsToString';

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

  const [frameworkObj, setFrameworkObj] = useState<Framework | null>(null);
  const [groupObj, setGroupObj] = useState<Group | null>(null);
  const [presetObj, setPresetObj] = useState<Preset | null>(null);
  const [currentConfig, setCurrentConfig] = useState<Config | null>(null);
  const [code, setCode] = useState<any>(null);


  const [props, setProps] = useState<Record<string, any>>({});
  const [data, setData] = useState<Record<string, any>>({});


  const selectedPreset = searchParams.get('preset') || null

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
    } else if (key === 'component') {
      newQuery.delete('framework')
      newQuery.delete('preset')
    }
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (selectedFramework) {
      const framework = frameworks.find(f => f.slug === selectedFramework);
      setFrameworkObj(framework || null);
      if (framework && frameworkObj && framework.template) {
        setCode({
          'App.tsx': frameworkObj.templates?.find(t => t.label === 'TSX')?.template || '',
          'App.jsx': frameworkObj.templates?.find(t => t.label === 'JSX')?.template || '',
        });

      } else {
        setCode(null);
      }
    } else {
      setFrameworkObj(null);
    }
  }, [selectedFramework, frameworks]);


  useEffect(() => {
    if (selectedGroup) {
      const group = groups.find(g => g.slug === selectedGroup);
      if (!group) {
        console.error('Group not found:', selectedGroup);
        return;
      }
      setGroupObj(group || null);
    } else {
      setGroupObj(null);
    }
  }, [selectedGroup, groups]);


  useEffect(() => {
    if (selectedPreset) {
      const preset = filteredPresets.find(p => p.slug === selectedPreset);
      const config = configs.find(c => c.preset?.slug === selectedPreset) || null;
      const filteredProps = filterInvalidProps(config?.config.props || {});

      setProps(filteredProps);
      setPresetObj(preset || null);
      setCurrentConfig(config);
    } else {
      setPresetObj(null);
      setCurrentConfig(null);
    }
  }, [selectedPreset, filteredPresets, configs]);

  useEffect(() => {
    if (frameworkObj && currentConfig) {
      const {
        topVars,
        templateInlineProps,
        liveViewInlineProps,
        extractedValues,
        extractedInlineValues
      } = genCodeWithTopVars(
        frameworkObj.slug,
        currentConfig.config.component || '',
        props,
        currentConfig.config.data,
        currentConfig.config.hooks,
        currentConfig.config.templates
      );
      let codeObj: any = {};

      const eventData = extractedValues.data ?? [];
      const view = extractedValues.view ?? [];
      const resources = extractedValues.resources ?? [];
      const invalid = extractedValues.invalid ?? [];
      const colors = extractedValues.colors ?? [];
      const template = extractedValues.templates ?? [];

      const inlineData = extractedInlineValues.data ?? [];
      const inlineResources = extractedInlineValues.resources ?? [];
      const inlineInvalid = extractedInlineValues.invalid ?? [];
      const inlineColors = extractedInlineValues.colors ?? [];
      const inlineHooks =
        Object.entries(extractedInlineValues.hooks || {})
          .map(([hook, varName]) => `${hook}={${varName}}`)
          .join(' ');
      const inlineTemplate =
        Object.entries(extractedInlineValues.templates || {})
          .map(([template, varName]) => `${template}={${varName}}`)
          .join(' ');


      console.log(JSON.stringify(inlineTemplate, null, 2));



      setData(currentConfig.config.data);

      if (frameworkObj.slug === 'angular') {
        const [tsTpl, htmlTpl] = frameworkObj.template.split('//TEMPLATE');
        codeObj = {
          'app.component.ts': tsTpl
            .replace(/\/\* Component \*\//g, currentConfig.config.component || ''),
          'app.component.html': htmlTpl
            .replace(/\/\* Component \*\//g, currentConfig.config.component?.toLowerCase() || '')
            .replace(/\/\* Component options \*\//g, templateInlineProps)

        };
      } else {
        codeObj = {
          'App.tsx': frameworkObj.templates[1].template
            .replace(/\/\* Component \*\//g, currentConfig.config.component || '')

            .replace(
              /\/\* view \*\//g,
              `const myView = ${JSON.stringify(view, null, 2)};`
            )
            .replace(
              /\/\* data \*\//g,
              `const myData = ${JSON.stringify(eventData, null, 2)};`
            )
            .replace(
              /\/\* resources \*\//g,
              `const myResources = ${JSON.stringify(resources, null, 2)};`
            )
            .replace(
              /\/\* invalids \*\//g,
              `const myInvalid = ${JSON.stringify(invalid, null, 2)};`
            )

            .replace(
              /\/\* colors \*\//g,
              `const myColors = ${JSON.stringify(colors, null, 2)};`
            )

            .replace(
              /\/\* templates \*\//g,
              `const myTemplate = ${JSON.stringify(template, null, 2)};`
            )


            .replace(
              /\/\* Component data \*\//g,
              inlineData ? `data={myData}` : ''
            )
            .replace(
              /\/\* Component resources \*\//g,
              inlineResources ? `resources={myResources}` : ''
            )
            .replace(
              /\/\* Component invalids \*\//g,
              inlineInvalid ? `invalids={myInvalid}` : ''
            )
            .replace(
              /\/\* Component colors \*\//g,
              inlineColors ? `colors={myColors}` : ''
            )
            .replace(
              /\/\* Component hooks \*\//g,
              inlineHooks ? inlineHooks : ''
            )

            .replace(
              /\/\* Component templates \*\//g,
              inlineTemplate ? inlineTemplate : ''
            )



            .replace(/\/\* Component options \*\//g, templateInlineProps)
        };

      }
      setCode(codeObj);
    }
  }, [frameworkObj, currentConfig, props]);


  const selectComponent = (groupSlug: string, componentId: string) => {
    const newQuery = new URLSearchParams(searchParams.toString())
    newQuery.set('group', groupSlug)
    newQuery.set('component', componentId)
    router.push(`${pathname}?${newQuery.toString()}`, { scroll: false })
  }

  return (
    <div className="w-full px-4 bg-white">
      <GroupSection
        groups={groups}
        components={components}
        selectedGroup={selectedGroup || undefined}
        selectedComponent={selectedComponent}
        updateSelection={updateSelection}
        selectComponent={selectComponent}
      />

      {selectedGroup && selectedComponent && (
        <FrameworkSection
          frameworks={frameworks}
          selectedFramework={selectedFramework}
          selectedComponent={selectedComponent}
          updateSelection={updateSelection}
        />
      )}
      {selectedGroup && selectedComponent && selectedFramework && (
        <PresetSection
          filteredPresets={filteredPresets}
          updateSelection={updateSelection}
          selectedPreset={selectedPreset}
        />
      )}


      {currentConfig && frameworkObj && groupObj && (
        <div className="mt-12 mx-auto flex flex-col xl:flex-row gap-6 items-start transition-all duration-500 ease-in-out">


          <div className="w-full lg:w-[20%] mg:w-[5%] xl:sticky xl:top-3 self-start">
            <ConfigurationsSelector
              configurations={currentConfig?.config.props ?? {}}
              onChange={setProps}
              selected={props}
            />
          </div>

          <div className="w-full xl:w-[80%] gap-8 flex flex-col lg:flex-row gap-1 transition-all duration-500 ease-in-out">
            <div className="w-full overflow-auto max-w-full transition-all duration-500 ease-in-out">
              <CodePreview code={code} language={
                ['javascript', 'angular', 'jquery', 'vue', 'react'].includes(frameworkObj.slug)
                  ? frameworkObj.slug as 'javascript' | 'angular' | 'jquery' | 'vue' | 'react'
                  : 'javascript'
              } />
            </div>

            <div className="flex flex-col  justify-center items-center  max-w-[400px] w-full mx-auto lg:mx-0 min-h-[700px]  sm:scale-[0.6] md:scale-[0.7] lg:scale-[1]">
              <div className="transform origin-top scale-100 md:scale-[1] lg:scale-[1] transition-transform duration-300">
                <LivePreview
                  componentName={groupObj.slug}
                  mergedProps={props}
                  data={data}
                />
              </div>
            </div>

          </div>
        </div>

      )}
    </div>
  )
}
