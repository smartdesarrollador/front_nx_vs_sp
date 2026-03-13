'use client';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsEditor({ value, onChange }: Props) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function addSkill(skill: string) {
    const trimmed = skill.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  }

  function removeSkill(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div
      className="flex flex-wrap gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 cursor-text min-h-[42px]"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((skill, i) => (
        <span
          key={i}
          className="flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/40 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300"
        >
          {skill}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeSkill(i);
            }}
            className="hover:text-blue-900 dark:hover:text-blue-100"
          >
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => inputValue.trim() && addSkill(inputValue)}
        placeholder={value.length === 0 ? 'Escribe y presiona Enter o coma…' : ''}
        className="flex-1 min-w-[140px] bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
