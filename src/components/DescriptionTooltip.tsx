import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Info, ExternalLink } from "lucide-react";

interface DescriptionTooltipProps {
    anchorRef: React.RefObject<Element | null>;
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

function getMobiscrollDocUrl(title: string) {
    const safeTitle = title.replace(/\s+/g, "");
    return `https://mobiscroll.com/docs/react/eventcalendar/api#opt-${safeTitle}`;
}

export const DescriptionTooltip: React.FC<DescriptionTooltipProps> = ({
    anchorRef,
    open,
    onClose,
    title,
    description,
}) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});

    useLayoutEffect(() => {
        if (open && anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setStyle({
                position: "fixed",
                left: rect.right + 12,
                top: rect.top,
                zIndex: 1000,
            });
        }
    }, [open, anchorRef]);

    if (!open) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            className="bg-white rounded-lg border border-blue-200 shadow-2xl px-4 py-3 min-w-[240px] max-w-xs relative"
            style={style}
            onClick={e => e.stopPropagation()}
        >
            <div className="flex items-start gap-2 mb-1">
                <Info size={16} className="text-blue-500 mt-0.5" />
                <a
                    href={getMobiscrollDocUrl(title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    className="flex tems-center gap-1 text-sm font-semibold text-blue-800">{title}  <ExternalLink size={14} />
                    
                    </a>
                <button
                    className="btn btn-xs btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                    tabIndex={0}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
            <div className="text-xs text-gray-700 leading-relaxed mb-2">{description}</div>
          
        </div>,
        document.body
    );
};
