import React, { useState } from "react";

export interface DataItem {
    id: string | number;
    resource?: string | number;
    tooltip?: string;
    start?: string;
    end?: string;
    recurring?: { repeat?: string };
    type?: string;
    editable?: boolean;
}



export function DataList({ data = [] }: { data: DataItem[] }) {
    const [open, setOpen] = useState(true);

    if (!Array.isArray(data) || !data.length) return null;

    return (
        <div className=" bg-white  transition">
            <button
                type="button"
                className="flex items-center w-full px-3 py-4 gap-3 cursor-pointer hover:bg-gray-50 transition rounded-xl"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className="font-semibold text-base tracking-tight text-gray-700">
                    Data List
                    <span className="text-xs text-gray-400 ml-1">({data.length})</span>
                </span>
                <span className={`ml-auto transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
                    <svg width="20" height="20" fill="none" className="text-gray-400" stroke="currentColor" strokeWidth="2"><path d="M7 7l5 5-5 5" /></svg>
                </span>
            </button>
            
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="divide-y divide-gray-200">
                    
                    {data.map((item, i) => (
                        <div
                            key={item.id ?? i}
                            className="flex items-center gap-4 py-3 px-3"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm truncate text-gray-800">
                                        ID: {item.id}
                                    </span>

                                </div>
                                <div className="flex gap-4 flex-wrap text-xs text-gray-500">
                                    <div>
                                        <span className="font-semibold">Resource:</span> {item.resource}
                                    </div>
                                    {item.start && item.end && (
                                        <div>
                                            <span className="font-semibold">Time:</span> {item.start} - {item.end}
                                        </div>
                                    )}
                                    {item.recurring?.repeat && (
                                        <div>
                                            <span className="font-semibold">Repeats:</span> {item.recurring.repeat}
                                        </div>
                                    )}
                                    {item.tooltip && (
                                        <div>
                                            <span className="font-semibold">Info:</span> {item.tooltip}
                                        </div>
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
