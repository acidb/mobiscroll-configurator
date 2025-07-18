'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserTypescript from 'prettier/plugins/typescript';
import pluginEstree from 'prettier/plugins/estree';
import parserHtml from 'prettier/plugins/html';

type CodeSnippet = {
  label: 'TSX' | 'JSX' | 'jquery' | 'vue' | 'react' | 'component' | 'template';
  code: string;
};
interface CodePreviewProps {
  fullCode: CodeSnippet[];
}

const basePrettierOptions = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5' as const,
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid' as const,
  endOfLine: 'lf' as const,
  plugins: [parserBabel, parserTypescript, pluginEstree, parserHtml],
};

const getParser = (lang: CodeSnippet['label']) => {
  switch (lang) {
    case 'TSX':
      return 'typescript';
    case 'JSX':
    case 'react':
      return 'babel';
    case 'jquery':
      return 'babel';
    case 'vue':
      return 'html';
    case 'component':
      return 'html';
    case 'template':
      return 'html';
    default:
      return 'typescript';
  }
};

export function CodePreview({ fullCode }: CodePreviewProps) {
  const [formatted, setFormatted] = useState<
    { code: string; label: CodeSnippet['label']; filename: string }[]
  >([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!fullCode || !fullCode.length) return;
      const formattedArr = await Promise.all(
        fullCode.map(async (snippetObj, idx) => {
          let filename = '';
          if (snippetObj.label === 'TSX') filename = `App.tsx`;
          else if (snippetObj.label === 'JSX') filename = `App.jsx`;
          else filename = `App.${snippetObj.label.toLowerCase()}`;
          try {
            const formatted = await prettier.format(snippetObj.code, {
              ...basePrettierOptions,
              parser: getParser(snippetObj.label),
            });
            return { code: formatted, label: snippetObj.label, filename };
          } catch (error) {
            console.log(error);
            return { code: snippetObj.code, label: snippetObj.label, filename };
          }
        }),
      );
      if (!cancelled) setFormatted(formattedArr);
    })();
    return () => {
      cancelled = true;
    };
  }, [fullCode]);

  useEffect(() => {
    setTabIdx(0);
  }, [formatted.length]);

  if (!fullCode || !fullCode.length) return null;
  if (!formatted.length) return <p className="text-sm text-gray-500">Loading formatted code…</p>;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted[tabIdx].code);
      if (codeRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  const active = formatted[tabIdx];

  return (
    <div className="rounded-lg overflow-hidden border border-base-200">
      <div className="bg-[#e5eff9] text-gray-600 text-sm px-4 py-2 flex justify-between items-center relative">
        <div className="flex gap-1 font-mono text-xs">
          {formatted.map((s, i) => (
            <button
              key={s.filename}
              onClick={() => setTabIdx(i)}
              className={`px-3 py-1 rounded-t border-b-2 transition-all duration-200
                ${i === tabIdx ? 'border-blue-500 text-blue-700 bg-white shadow-sm' : 'border-transparent text-gray-500 bg-transparent'}
                hover:bg-blue-50`}
              style={{ minWidth: 64 }}
              tabIndex={0}
            >
              {s.filename}
            </button>
          ))}
        </div>
        <div className="relative ml-2">
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded bg-white text-blue-600 hover:bg-blue-100"
            title="Copy to clipboard"
          >
            📋 Copy
          </button>
          {copied && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 flex flex-col items-center animate-fade-in-out">
              <div className="w-2 h-2 bg-[#c2dffd] rotate-45 -mb-1"></div>
              <div className="bg-[#c2dffd] text-black text-xs rounded-md px-3 py-1 shadow-md">
                Copied!
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        ref={codeRef}
        className="bg-[#f9fafb] h-175 overflow-y-auto"
        style={{
          fontSize: '0.85rem',
          padding: 0,
          margin: 0,
          borderRadius: 0,
          boxShadow: 'none',
        }}
      >
        <SyntaxHighlighter
          language={'ts'}
          style={prism}
          wrapLines
          wrapLongLines
          customStyle={{
            background: 'transparent',
            fontSize: '0.85rem',
            padding: '1rem',
            margin: 0,
            borderRadius: 0,
            boxShadow: 'none',
          }}
        >
          {active.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
