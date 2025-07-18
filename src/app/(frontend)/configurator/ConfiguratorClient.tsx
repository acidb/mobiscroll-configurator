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
  selectedGroup: string | undefined
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
  const [viewProps, setViewProps] = useState<Record<string, any>>({});


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
      if (framework && framework.template) {
        setCode({ main: String(framework.template) });
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
      const { topVars, templateInlineProps, liveViewInlineProps } = genCodeWithTopVars(
        frameworkObj.slug,
        currentConfig.config.component || '',
        props
      );
      let codeObj: any = {};

      if (frameworkObj.slug === 'angular') {
        const [tsTpl, htmlTpl] = frameworkObj.template.split('//TEMPLATE');
        codeObj = {
          'app.component.ts': tsTpl
            .replace(/\/\* Component \*\//g, currentConfig.config.component || ''),
          'app.component.html': htmlTpl
            .replace(/\/\* Component \*\//g, currentConfig.config.component?.toLowerCase() || '')
            .replace(/\/\* Component options \*\//g, templateInlineProps),
        };

      } else {
        codeObj = {
          'App.tsx': frameworkObj.template
            .replace(/\/\* Component \*\//g, currentConfig.config.component || '')
            .replace(/\/\* variables \*\//g, topVars)
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
        selectedGroup={selectedGroup}
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


      {/* TODO This is not the final layout this design will be improved */}
      {currentConfig && frameworkObj && groupObj && (
        <div className="mt-12 mx-auto flex flex-col xl:flex-row gap-6 items-start transition-all duration-500 ease-in-out">


          <div className="w-full lg:w-[20%] mg:w-[5%] xl:sticky xl:top-3 self-start">
            <ConfigurationsSelector
              configurations={currentConfig?.config.props ?? {}}
              onChange={setProps}
              selected={props}
            />
          </div>

          <div className="w-full xl:w-[80%] flex flex-col lg:flex-row gap-1 transition-all duration-500 ease-in-out">
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
                  events={[]}
                />
              </div>
            </div>

          </div>
        </div>

      )}
    </div>
  )
}
