'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeSnippets = {
  [filename: string]: string;
};

interface CodePreviewProps {
  code: CodeSnippets | null;
  language: 'javascript' | 'angular' | 'jquery' | 'vue' | 'react';
}

export function CodePreview({ code, language }: CodePreviewProps) {
  if (!code) return null;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function getFileExtension(language: string) {
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
  }

  
  return (
    <div>
      {Object.entries(code).map(([filename, snippet]) => (
        <div
          key={filename}
          className="mb-6 rounded-lg overflow-hidden border border-base-200"
        >
          <div className="bg-[#e5eff9] text-gray-600 text-sm px-4 py-2 flex justify-between items-center">
            <div className="font-mono text-xs flex gap-2 items-center">
              <span className="px-2 py-1 rounded bg-white text-blue-600">
                {getFileExtension(language).toUpperCase()}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(snippet)}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
              title="Copy to clipboard"
            >
              📋 Copy
            </button>
          </div>

          <div
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
      ))}
    </div>
  );
}
