'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeSnippets = {
  [filename: string]: string;
};

interface CodePreviewProps {
  code: CodeSnippets | null; 

  language: 'tsx' | 'javascript' | 'html' ;
}

export function CodePreview({ code, language }: CodePreviewProps) {
  if (!code) return null;

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div>
      {Object.entries(code).map(([filename, snippet]) => (
        <div key={filename} className="mb-6 rounded-lg overflow-hidden">

{/* TODOO The file name need to be adjusted because right now it only has tsx in it  */}
           <div className="bg-[#e5eff9] text-gray-600 text-sm px-4 py-2 flex justify-between items-center">
            <div className="font-mono text-xs flex gap-2 items-center">
              <span className="px-2 py-1 rounded bg-white text-blue-600">
                {filename === 'tsx' || filename === 'js' ? 'App.tsx' : `App.${filename}`}
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

          <SyntaxHighlighter
            language={filename === 'html' ? 'html' : language}
            style={prism}
            wrapLines
            wrapLongLines
            customStyle={{
              background: '#f9fafb',
              fontSize: '0.85rem',
              padding: '1rem',
              margin: 0,
              borderRadius: 0,
            }}
          >
            {typeof snippet === 'string' ? snippet : JSON.stringify(snippet, null, 2)}
          </SyntaxHighlighter>
        </div>
      ))}
    </div>
  );
}
