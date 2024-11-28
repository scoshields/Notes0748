import React, { useState } from 'react';
import { ScrollText } from 'lucide-react';
import { PROMPT_OPTIONS, DEFAULT_PROMPT_TYPE } from '../utils/constants';
import type { NoteFormData } from '../types';

interface NoteInputProps {
  onSubmit: (data: NoteFormData) => void;
  isProcessing: boolean;
}

export function NoteInput({ onSubmit, isProcessing }: NoteInputProps) {
  const [content, setContent] = useState('');
  const [promptType, setPromptType] = useState(DEFAULT_PROMPT_TYPE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit({ content, promptType });
      setContent('');
    }
  };

  const formatLabels: Record<string, string> = {
    standard: 'Standard Clinical Format',
    birp: 'BIRP Format',
    emdr: 'EMDR Session Notes',
    ifs: 'IFS Session Notes'
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <ScrollText className="w-6 h-6" />
        <h2>Clinical Session Notes</h2>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="promptType" className="block text-sm font-medium text-gray-700">
          Documentation Format
        </label>
        <select
          id="promptType"
          value={promptType}
          onChange={(e) => setPromptType(e.target.value as keyof typeof PROMPT_OPTIONS)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isProcessing}
        >
          {Object.entries(PROMPT_OPTIONS).map(([key]) => (
            <option key={key} value={key}>
              {formatLabels[key]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Session Notes
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-48 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono"
          placeholder="Enter your session notes here..."
          disabled={isProcessing}
        />
      </div>

      <button
        type="submit"
        disabled={isProcessing || !content.trim()}
        className="w-full px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing Notes...' : 'Process Clinical Notes'}
      </button>
    </form>
  );
}