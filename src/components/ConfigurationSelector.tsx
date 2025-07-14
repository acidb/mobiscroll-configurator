import React, { useState, useEffect } from 'react';
import { Configuration } from './types';
import { updateUrl } from '@/utils/updateUrl';
import { useScreenSize } from '@/utils/useScreenSize';


type SelectedConfig = Record<string, any>;

interface ConfigurationsSelectorProps {
    configurations: Configuration[];
    onChange: (selected: SelectedConfig) => void;
    selected: SelectedConfig;
}

export function ConfigurationsSelector({
    configurations,
    onChange,
    selected,
}: ConfigurationsSelectorProps) {

    const screenSize = useScreenSize();
    const [isOpen, setIsOpen] = useState(screenSize === 'desktop');
    const toggleOpen = () => setIsOpen(prev => !prev);


    useEffect(() => {
        if (screenSize === 'desktop') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [screenSize]);

    function updateValue(prop: string, value: any) {
        const newSelected = { ...selected, [prop]: value };
        onChange(newSelected);
        updateUrl(newSelected);

    }



    if (screenSize === 'mobile' || screenSize === 'tablet') {
        return (
            <>
                {!isOpen && (
                    <button
                        className="fixed right-4 bottom-4 md:left-4 md:top-4 md:right-auto md:bottom-auto z-50 bg-white text-gray-700 border rounded-md px-3 py-2 shadow hover:bg-gray-100"
                        onClick={toggleOpen}
                    >
                        ☰ Config
                    </button>


                )}
                {isOpen && (
                    <div className="fixed top-0 left-0 h-full w-[80%] max-w-sm z-40 bg-white shadow-lg p-6 overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">Configurations</h2>
                            <button
                                className="text-gray-600 text-lg"
                                onClick={toggleOpen}
                            >
                                ✕
                            </button>
                        </div>
                        {renderContent()}
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="w-full space-y-8">
            {renderContent()}
        </div>
    );

    function renderContent() {
        return configurations.map((conf) => (
            <div
                key={conf.id}
                className="xl:bg-white xl:border xl:border-gray-200 xl:rounded-2xl xl:p-5 lg:shadow-sm"
            >


                {conf.description && (
                    <p className="text-sm text-gray-500 mb-4">{conf.description}</p>
                )}

                <div className="space-y-5">
                    {Array.isArray(conf.config?.configurations) &&
                        conf.config.configurations.map((opt, idx) => {
                            const key = `${conf.id}-${opt.prop}`;
                            const Label = (
                                <label
                                    htmlFor={key}
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{opt.prop}</code>
                                </label>
                            );
                            const Description = opt.description && (
                                <p className="text-xs text-gray-500 mt-1">{opt.description}</p>
                            );

                            if (typeof opt.values === 'boolean') {
                                return (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="w-2/3">
                                            {Label}
                                            {Description}
                                        </div>
                                        <input
                                            type="checkbox"
                                            id={key}
                                            className="toggle toggle-sm border-gray-300"
                                            checked={!!selected[opt.prop]}
                                            onChange={(e) => updateValue(opt.prop, e.target.checked)}
                                        />
                                    </div>
                                );
                            }

                            if (Array.isArray(opt.values)) {
                                const values = opt.values as string[];
                                return (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between flex-wrap gap-2">
                                            {Label}
                                            <div className="flex flex-wrap gap-2">
                                                {values.map((val, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => updateValue(opt.prop, val)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium border transition ${selected[opt.prop] === val
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {val}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {Description}
                                    </div>
                                );
                            }

                            return null;
                        })}
                </div>
            </div>
        ));
    }
}
