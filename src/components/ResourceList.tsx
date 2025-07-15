import { Users } from 'lucide-react';
import React, { useState } from "react";

export interface Resource {
    id: string | number;
    name?: string;
    img?: string;
    color?: string;
    cssClass?: string;
    description?: string;
    eventCreation?: boolean;
}

export function ResourceList({ resources = [] }: { resources: Resource[] }) {
    const [open, setOpen] = useState(false);

    if (!Array.isArray(resources) || !resources.length) return null;

    return (
        <div className="mb-2 rounded-2xl  transition">
            <button
                type="button"
                className="flex items-center w-full px-3 py-4 gap-3 cursor-pointer hover:bg-gray-50 transition rounded-xl"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className="font-semibold text-base tracking-tight text-gray-700">
                    Resources <span className="text-xs text-gray-400 ml-1">({resources.length})</span>
                </span>
                <span className={`ml-auto transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
                    <svg width="20" height="20" fill="none" className="text-gray-400" stroke="currentColor" strokeWidth="2"><path d="M7 7l5 5-5 5" /></svg>
                </span>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="divide-y divide-gray-200">
                    {resources.map((res, i) => (
                        <div
                            key={res.id ?? i}
                            className="flex items-center gap-4 py-3 px-3"
                        >
                            {res.img ? (
                                <img
                                    src={res.img}
                                    alt={res.name || `Resource ${res.id}`}
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 border flex items-center justify-center text-gray-500 text-lg font-semibold">
                                    {res.name ? res.name.charAt(0).toUpperCase() : <span role="img" aria-label="resource">🧑‍⚕️</span>}
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="font-semibold text-sm">
                                    {res.name ?? `Resource ${res.id}`}
                                </div>
                                {res.description && (
                                    <div className="text-xs text-gray-500">{res.description}</div>
                                )}
                                <div className="flex gap-2 mt-1 items-center flex-wrap">
                                    {res.cssClass && (
                                        <span className="bg-gray-200 text-xs rounded px-2 py-0.5">{res.cssClass}</span>
                                    )}
                                    {"eventCreation" in res && (
                                        <span className={`text-xs px-2 py-0.5 rounded ${res.eventCreation === false ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                            Event creation: {String(res.eventCreation)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
