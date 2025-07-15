'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserTypescript from 'prettier/plugins/typescript';
import pluginEstree from 'prettier/plugins/estree';
import parserHtml from 'prettier/plugins/html';

type CodeSnippets = {
  [filename: string]: string;
};

interface CodePreviewProps {
  code: CodeSnippets | null;
  language: 'javascript' | 'angular' | 'jquery' | 'vue' | 'react';
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

const getParser = (lang: CodePreviewProps['language']) => {
  switch (lang) {
    case 'javascript':
    case 'jquery':
    case 'react':
      return 'babel';
    case 'angular':
      return 'typescript';
    case 'vue':
      return 'html';
    default:
      return 'babel';
  }
};

const getFileExtension = (language: CodePreviewProps['language']) => {
  switch (language) {
    case 'javascript':
      return 'html';
    case 'angular':
      return 'ts';
    case 'jquery':
      return 'js';
    case 'vue':
      return 'vue';
    case 'react':
      return 'tsx';
    default:
      return 'txt';
  }
};


interface SnippetBlockProps {
  filename: string;
  snippet: string;
  language: CodePreviewProps['language'];
}

const SnippetBlock: React.FC<SnippetBlockProps> = ({
  snippet,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      if (codeRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  };

  return (
    <div className="mb-6 rounded-lg overflow-hidden border border-base-200">
      <div className="bg-[#e5eff9] text-gray-600 text-sm px-4 py-2 flex justify-between items-center relative">
        <div className="font-mono text-xs flex gap-2 items-center">
          <span className="px-2 py-1 rounded bg-white text-blue-600">
            {getFileExtension(language).toUpperCase()}
          </span>
        </div>

        <div className="relative">
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
          language={getFileExtension(language)}
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
          {typeof snippet === 'string'
            ? snippet
            : JSON.stringify(snippet, null, 2)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export function CodePreview({ code, language }: CodePreviewProps) {
  const [formattedSnippets, setFormattedSnippets] =
    useState<CodeSnippets | null>(null);

  if (!code) return null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const entries = await Promise.all(
        Object.entries(code).map(async ([filename, snippet]) => {
          try {
            const formatted = await prettier.format(snippet, {
              ...basePrettierOptions,
              parser: getParser(language),
            });
            return [filename, formatted] as [string, string];
          } catch {
            return [filename, snippet];
          }
        }),
      );

      if (!cancelled) setFormattedSnippets(Object.fromEntries(entries));
    })();

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (!formattedSnippets) {
    return <p className="text-sm text-gray-500">Loading formatted code…</p>;
  }

  return (
    <div>
      {Object.entries(formattedSnippets).map(([filename, snippet]) => (
        <SnippetBlock
          key={filename}
          filename={filename}
          snippet={snippet}
          language={language}
        />
      ))}
    </div>
  );
}

